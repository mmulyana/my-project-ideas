import Card from '_/components/card'

export default function Page() {
  return (
    <div className='pt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8'>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Card key={i} />
      ))}
    </div>
  )
}
