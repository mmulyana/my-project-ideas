'use server'

import { deleteImage, uploadImage } from '_/lib/cloudinary'
import { db } from '_/lib/db'
import { extractErrorAction } from '_/utils/error'
import { extractUrl } from '_/utils/extract-url'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/octet-stream',
]

const updateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  cover: z
    .any()
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.'
    ),
})

export interface FormState {
  errors: {
    title?: string[]
    content?: string[]
    _form?: string[]
  }
}

export async function updateIdea(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = updateSchema.safeParse({
    id: formData.get('id'),
    name: formData.get('name'),
    description: formData.get('description'),
    cover: formData.get('cover'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    } as FormState
  }

  try {
    type Payload = {
      name: string
      description?: string
      cover?: string
    }
    let payload: Payload = {
      name: result.data.name,
      description: result.data.description,
    }

    let url = ''

    const file = result.data.cover as File

    if (file.type !== 'application/octet-stream') {
      const id = extractUrl(url)
      if (!!id) await deleteImage(id)

      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const uploaded = await uploadImage(buffer, {
        tags: ['ideas'],
      })

      if (!uploaded) {
        return {
          errors: {
            title: ['cover'],
            content: ['upload failed'],
          },
        }
      }

      url = uploaded
    }

    if (url != '') {
      payload.cover = url
    }

    await db.ideas.update({
      data: payload,
      where: {
        id: parseInt(result.data.id),
      },
    })
  } catch (error) {
    console.log(error)
    extractErrorAction(error)
  }

  revalidatePath('/')
  redirect('/')
}
