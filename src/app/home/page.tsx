import Card from '_/components/card'
import { db } from '_/lib/db'

export const dynamic = 'force-dynamic'
export const revalidate = 5
export default async function Page() {
  const ideas = await db.ideas.findMany({
    orderBy: {
      id: 'desc',
    },
  })
  return (
    <div className='pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
      {ideas.map((idea) => (
        <Card key={idea.id} data={idea} />
      ))}
    </div>
  )
}
