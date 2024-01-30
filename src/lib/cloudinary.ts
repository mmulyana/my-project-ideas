import { v2 as cloudinary } from 'cloudinary'

export const configs = {
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

cloudinary.config(configs)

export async function uploadImage(
  buffer: object,
  {
    tags,
    preset = 'ideas',
  }: {
    tags?: string[]
    preset?: string
  }
) {
  let url = null
  await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: tags,
          upload_preset: preset,
        },
        function (error: any, result: any) {
          if (error) {
            reject(error)
            return
          }
          url = result.secure_url
          resolve(result)
        }
      )
      .end(buffer)
  })
  return url
}

export async function deleteImage(publicId: string) {
  try {
    const result = await cloudinary.api.delete_resources([publicId])
    return result
  } catch (error) {
    console.log('cloudinary error', error)
  }
}