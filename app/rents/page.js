import React from 'react'
import ItemCard from '../components/ItemCard/ResponseItemCard'

const page = () => {
  return (
    <div className="pt-8 padding-x">
        <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10">
            My Rents:
        </p>
        {/* <ItemCard /> */}
        <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-4">
            <div className="col-md-4">
                <ItemCard/>
            </div>
        </div>
    </div>
  )
}

export default page