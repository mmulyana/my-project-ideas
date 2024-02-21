'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteIdea } from './action'

type Props = {
  isOpen: boolean
  id: string
  url: string
}
export default function Modal({ isOpen, id, url }: Props) {
  const router = useRouter()
  const backToHome = () => router.push('/')

  if (!isOpen) return null
  return (
    <div className='fixed top-0 left-0 h-full w-full'>
      <div
        className='absolute top-0 left-0 bg-black/40 w-full h-full'
        onClick={backToHome}
      ></div>
      <div className='max-w-full w-[440px] h-fit bg-white py-4 px-3 rounded-lg z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <form action={deleteIdea}>
          <input name='id' defaultValue={id} hidden/>
          <input name='url' defaultValue={url} hidden/>
          <p className='text-lg text-gray-600 font-medium max-w-[240px] text-center mx-auto'>
            Are you sure want delete this idea
          </p>
          <div className='mt-4 grid grid-cols-2 gap-2'>
            <Link
              href={'/' + id}
              className='border border-gray-100 hover:bg-gray-200 rounded py-1.5 text-sm text-gray-500 flex justify-center'
            >
              Cancel
            </Link>
            <button
              className='py-1.5 text-sm text-white bg-red-700 border border-red-700 rounded hover:bg-red-800'
              type='submit'
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
