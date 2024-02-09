'use server'

import { uploadImage } from '_/lib/cloudinary'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const Schema = z.object({
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
  const schema = z.object({
    title: z.string().nonempty({ message: 'Title is required' }),
    content: z.string().nonempty({ message: 'Content is required' }),
    cover: z.string().optional(),
  })

  const result = schema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
    cover: formData.get('cover'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  try {
    const file = formData.get('cover') as File
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const url = await uploadImage(buffer, {
      tags: ['ideas'],
    })

    if (!url) {
      return {
        errors: {
          title: ['cover'],
        },
      }
    }
  } catch (error) {}

  revalidatePath('/')
  redirect('/')
}
