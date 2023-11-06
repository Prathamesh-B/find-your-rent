import React from 'react'
import ItemCard from "../components/ItemCard/ItemCard";

const userItems = () => {
    return (
        <>
        <div className="pt-8" />
            <p className="2xl:text-[30px] sm:text-[30px] text-[30px] font-semibold pt-10 px-7">
                My Items:
            </p>
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-10 px-7">
                <ItemCard />
                <ItemCard />
                <ItemCard />
                <ItemCard />
            </div>
        </>
    )
}

export default userItems