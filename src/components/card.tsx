import type { Ideas } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: Ideas
}
export default function Card({ data }: Props) {
  return (
    <div className='w-full h-fit rounded-xl relative p-2 bg-[#1F1F1F] hover:bg-[#242424] border border-transparent hover:border-blue-900'>
      <Image
        src={data.cover}
        alt={data.name}
        width={200}
        height={160}
        className='w-full h-40 rounded-md '
      />
      <div className='mt-2 px-2.5 pb-4'>
        <Link href={'/' + data.id} className='text-white'>
          {data.name}
        </Link>
        <div className='w-full h-10 overflow-hidden'>
          <p className='text-sm text-white/20'>{data.description}</p>
        </div>
      </div>
    </div>
  )
}
