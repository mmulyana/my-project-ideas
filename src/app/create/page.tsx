'use client'

import { useRef, useState } from 'react'
import { FormState, createIdea } from './action'
import { useFormState, useFormStatus } from 'react-dom'

export default function Page() {
  const inputPhotoRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [formState, action] = useFormState<FormState>(createIdea as any, {
    errors: {},
  })

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
      <form className='max-w-sm flex flex-col gap-4 mx-auto' action={action}>
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
            name='name'
            autoFocus
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
            name='description'
            className='block p-2.5 w-full text-sm rounded-lg border border-transparent bg-[#2b2b2b] placeholder-gray-400 text-white focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500'
          ></textarea>
        </div>
        <Submit />

        {formState.errors.title && (
          <div className='text-red-500 text-sm'>
            *{formState.errors.title?.join(', ')}
          </div>
        )}
      </form>
    </div>
  )
}

function Submit() {
  const status = useFormStatus()
  return (
    <button
      disabled={status.pending}
      type='submit'
      className='py-2.5 w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700 mt-1.5'
    >
      {status.pending ? (
        <>
          <div role='status'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
          Loading
        </>
      ) : (
        'Save'
      )}
    </button>
  )
}
