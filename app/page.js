import Hero from './components/Hero/Hero'
import ItemCard from './components/ItemCard/ItemCard'
export default function Home() {
  return (
    <main className='overflow-hidden'>
      <Hero />
      <div className='grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-10 px-7'>
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
        <ItemCard />
      </div>
      <div className='flex-center mt-8'>
        <button className="mt-4 px-4 py-2 leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr rounded hover:bg-oragne-secondary-fyr focus:outline-none">Show More</button>
      </div>
    </main>
  )
}