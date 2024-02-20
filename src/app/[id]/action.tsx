'use server'

import { deleteImage } from '_/lib/cloudinary'
import { db } from '_/lib/db'
import { extractUrl } from '_/utils/extract-url'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function deleteIdea(formData: FormData) {
  if (!formData.get('id') || !formData.get('url')) return

  let url = extractUrl(formData.get('url') as string)
  if (!url) return
  try {
    await deleteImage(url)
    await db.ideas.delete({
      where: {
        id: parseInt(formData.get('id') as string),
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/')
  redirect('/')
}
