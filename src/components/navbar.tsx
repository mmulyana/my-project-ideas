import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='w-full h-16 absolute top-0 left-0 bg-[#29293a]'>
      <div className='container mx-auto px-5 h-16 flex justify-between items-center'>
        <Link href='/' className='text-white'>
          My Project Ideas
        </Link>
        <Link
          href='/new'
          className='bg-blue-500 text-gray-900 pl-2 pr-4 py-1.5 rounded-lg flex gap-1 items-center text-sm'
        >
          <PlusIcon className='w-5 h-5 font-medium' />
          New Ideas
        </Link>
      </div>
    </div>
  )
}
