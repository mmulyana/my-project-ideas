import { db } from '_/lib/db'
import Link from 'next/link'
import Modal from './modal'
import Image from 'next/image'

type Props = {
  params: {
    id: string
  }
  searchParams: {
    open?: string
    url?: string
  }
}
export default async function Page({ params, searchParams }: Props) {
  const idea = await db.ideas.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  return (
    <>
      <div className='pt-5 pb-10'>
        <div className='max-w-sm flex flex-col gap-4 mx-auto'>
          <Image
            src={idea?.cover ?? ''}
            alt='preview'
            width={800}
            height={800}
            className='w-full h-64 object-cover object-top rounded-lg'
          />
          <div>
            <p className='mb-2 text-sm font-medium text-white/50'>Name</p>
            <p className='text-lg text-white font-medium'>{idea?.name}</p>
          </div>
          <div>
            <p className='mb-2 text-sm font-medium text-white/50'>
              Description
            </p>
            <p className='text-lg text-white font-medium'>
              {idea?.description}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Link
              href={`/${params.id}?open&id=${params.id}&url=${idea?.cover}`}
              className='py-2.5 w-full text-red-400 rounded-lg bg-red-950 hover:bg-red-900 text-sm text-center'
            >
              Delete
            </Link>
            <Link
              href={`/${params.id}/edit`}
              className='py-2.5 w-full text-white rounded-lg bg-blue-500 hover:bg-blue-700 text-sm text-center'
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
      <Modal
        isOpen={searchParams.open === ''}
        id={params.id}
        url={searchParams.url ?? ''}
      />
    </>
  )
}
