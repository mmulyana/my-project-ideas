import { db } from '_/lib/db'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}
export default async function Page({ params }: Props) {
  const idea = await db.ideas.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })
  return (
    <div className='pt-5'>
      <div className='max-w-sm flex flex-col gap-4 mx-auto'>
        <img
          src={idea?.cover}
          alt='preview'
          className='w-full h-64 object-cover object-top rounded-lg'
        />
        <div>
          <p className='mb-2 text-sm font-medium text-white/50'>Name</p>
          <p className='text-lg text-white font-medium'>{idea?.name}</p>
        </div>
        <div>
          <p className='mb-2 text-sm font-medium text-white/50'>Description</p>
          <p className='text-lg text-white font-medium'>{idea?.description}</p>
        </div>
        <div className='grid grid-cols-2 gap-2'>
          <Link
            href={`/${params.id}/edit`}
            className='py-2.5 w-full text-white rounded-lg bg-blue-600 hover:bg-blue-700'
          >
            Edit
          </Link>
          <Link
            href={`/${params.id}/edit`}
            className='py-2.5 w-full text-red-400 rounded-lg bg-red-900 hover:bg-red-800'
          >
            Delete
          </Link>
        </div>
      </div>
    </div>
  )
}
