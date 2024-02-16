'use server'

import { uploadImage } from '_/lib/cloudinary'
import { db } from '_/lib/db'
import { extractErrorAction } from '_/utils/error'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const createSchema = z.object({
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

export async function createIdea(
  formState: FormState,
  formData: FormData
): Promise<FormState> {
  const result = createSchema.safeParse({
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
    const file = formData.get('cover') as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const url = await uploadImage(buffer, {
      tags: ['ideas'],
    })
    console.log(url)

    if (!url) {
      return {
        errors: {
          title: ['cover'],
          content: ['upload failed'],
        },
      }
    }

    await db.ideas.create({
      data: {
        name: result.data.name,
        description: result.data.description,
        cover: url,
      },
    })
  } catch (error) {
    console.log(error)
    extractErrorAction(error)
  }

  revalidatePath('/')
  redirect('/')
}
