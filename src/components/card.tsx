import type { Ideas } from '@prisma/client'
import Link from 'next/link'

export default function Card() {
  return (
    <div className='w-full h-fit rounded-md relative p-2 bg-[#1F1F1F]'>
      <div className='w-full h-40 rounded-md bg-[#141414]'></div>
      <div className='mt-2 px-2.5 pb-4'>
        <Link href='#' className='text-white'>
          Title
        </Link>
        <div className='w-full h-10 overflow-hidden'>
          <p className='text-sm text-white/20'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
            vero reiciendis, fugit placeat suscipit illum optio quod numquam
            ipsam! Iusto rem facilis alias explicabo quaerat tempora. Libero
            consectetur hic veniam.
          </p>
        </div>
        <div className='flex gap-2 flex-wrap mt-2'>
          <span className='text-sm px-3 py-0.5 rounded-md border border-blue-500/20 bg-blue-950 text-blue-400'>
            Web
          </span>
        </div>
      </div>
    </div>
  )
}
