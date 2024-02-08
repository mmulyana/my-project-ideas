import { db } from '_/lib/db'
import Form from './form'
import { Suspense } from 'react'
import type { Ideas } from '@prisma/client'

type Props = {
  params: {
    id: string
  }
}
export default async function Page({ params }: Props) {
  const data = await db.ideas.findUnique({
    where: {
      id: parseInt(params.id),
    },
  })

  return <Form data={data as Ideas} />
}
