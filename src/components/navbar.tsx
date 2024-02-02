import { PlusIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export default function Navbar() {
  return (
    <div className='w-full h-16 absolute top-0 left-0 bg-[#1F1F1F]'>
      <div className='container mx-auto px-5 h-16 flex justify-between items-center'>
        <Link href='/' className='text-white'>
          <Logo />
        </Link>
        <Link
          href='/create'
          className='bg-blue-600 text-gray-900 pl-2 pr-4 py-1.5 rounded-lg flex gap-1 items-center text-sm'
        >
          <PlusIcon className='w-5 h-5 font-medium' />
          New Ideas
        </Link>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='32'
      height='32'
      fill='none'
      viewBox='0 0 120 120'
    >
      <path
        fill='#fff'
        fillRule='evenodd'
        d='M62.088 3.95a10.363 10.363 0 0 0-4.176 0c-1.592.327-3.015 1.124-4.146 1.757l-.309.173-38.344 21.302c-.106.059-.215.12-.327.18-1.198.66-2.704 1.49-3.86 2.745-1 1.085-1.756 2.37-2.22 3.771-.534 1.62-.528 3.34-.523 4.707v42.807c-.005 1.368-.011 3.087.524 4.707a10.365 10.365 0 0 0 2.22 3.772c1.155 1.255 2.661 2.084 3.859 2.744l.327.18 38.344 21.303.309.172c1.131.634 2.554 1.431 4.146 1.758a10.34 10.34 0 0 0 4.176 0c1.592-.327 3.015-1.124 4.146-1.758l.309-.172 38.344-21.302.142-.08.185-.101c1.197-.66 2.703-1.49 3.86-2.744 1-1.085 1.756-2.37 2.219-3.772.535-1.62.529-3.34.524-4.707l-.001-.373v-42.06l.001-.374c.005-1.367.011-3.086-.524-4.707a10.362 10.362 0 0 0-2.219-3.771c-1.157-1.255-2.663-2.085-3.86-2.744l-.004-.003c-.111-.06-.219-.12-.323-.178L66.543 5.88l-.309-.173c-1.131-.633-2.554-1.43-4.146-1.758ZM58.49 14.938c.785-.436 1.186-.657 1.485-.801l.025-.012.025.012c.299.144.7.365 1.485.8L95.965 34.08 60 54.062l-35.965-19.98L58.49 14.939ZM18.547 42.887l36.271 20.15V103L20.146 83.736c-.829-.46-1.252-.698-1.549-.887l-.025-.016-.002-.03c-.02-.35-.023-.836-.023-1.784V42.887Z'
        clipRule='evenodd'
      />
    </svg>
  )
}
