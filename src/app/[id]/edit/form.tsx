'use client'

import { useRef, useState } from 'react'
import type { Ideas } from '@prisma/client'

type Props = {
  data: Ideas
}
export default function Form({ data }: Props) {
  const inputPhotoRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>(data.cover)

  async function handleUpload() {
    const uploadedFile = inputPhotoRef.current?.files?.[0]
    if (uploadedFile) {
      const cachedURL = URL.createObjectURL(uploadedFile)
      setImagePreview(cachedURL)
    } else {
      console.error('No file selected')
    }
  }

  return (
    <div className='pt-5 pb-10'>
      <form className='max-w-sm flex flex-col gap-4 mx-auto'>
        <div className='w-full'>
          <label
            htmlFor='dropzone-file'
            className='block mb-2 text-sm font-medium text-white'
          >
            Cover
          </label>
          {imagePreview !== '' ? (
            <label
              htmlFor='dropzone-file'
              className='w-full h-64 rounded-lg overflow-hidden block'
            >
              <img
                src={imagePreview}
                alt='preview'
                className='w-full h-64 object-cover object-top'
              />
            </label>
          ) : (
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-[#2b2b2b] border-[#4b4b4b] hover:border-gray-500 hover:bg-[#2b2b2b]'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <svg
                  className='w-8 h-8 mb-4 text-gray-500 dark:text-gray-400'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 20 16'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                  />
                </svg>
                <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
                  <span className='font-semibold'>Click to upload</span> or drag
                  and drop
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400'>
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </label>
          )}
          <input
            id='dropzone-file'
            type='file'
            name='cover'
            ref={inputPhotoRef}
            onChange={handleUpload}
            className='hidden'
          />
        </div>
        <div className='w-full'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-white'
          >
            Name
          </label>
          <input
            type='text'
            id='name'
            autoFocus
            defaultValue={data.name}
            className='border text-sm rounded-lg block w-full p-2.5 bg-[#2b2b2b] border-transparent placeholder-gray-400 text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500'
          />
        </div>
        <div className='w-full'>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-medium text-white'
          >
            Description
          </label>
          <textarea
            id='description'
            rows={4}
            className='block p-2.5 w-full text-sm rounded-lg border border-transparent bg-[#2b2b2b] placeholder-gray-400 text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500'
          >
            {data.description}
          </textarea>
        </div>
        <button
          type='submit'
          className='py-2.5 w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 mt-1.5'
        >
          Update
        </button>
      </form>
    </div>
  )
}
