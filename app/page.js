import Hero from './components/Hero/Hero'
import ItemCards from './components/ItemCard/ItemCard'
import { Button } from '@mantine/core';
export default function Home() {
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-10 px-7'>
        <ItemCards />
        <ItemCards />
        <ItemCards />
        <ItemCards />
        <ItemCards />
      </div>
      <div className='flex-center mt-8'>
        <Button variant="filled" size="md" color="rgba(238, 147, 34, 1)">Show More</Button>
      </div>
    </main>
  )
}