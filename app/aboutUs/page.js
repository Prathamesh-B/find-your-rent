import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <>
            <div className="pt-8" />
            <div className=" items-center justify-center text-center">
                <p className="2xl:text-[40px] sm:text-[40px] text-[40px] font-semibold pt-12 px-7">
                    About Us
                </p>
                <div className="flex items-center justify-center pt-5 px-7">
                    <Image
                        src="/Slogan.svg"
                        alt="Logo"
                        width={400}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <div className="pt-10 px-10">
                    <p className="pb-5 text-[20px]">
                        Do you desired something but cant afford it to purchase it?
                    </p>
                    <p className="pb-5 text-[20px]">
                        Then this is a perfect time for you to rent you dream goods without investing loads and loads of money!
                    </p>
                    <p className="pb-5 text-[20px]">
                        So, what are you waiting for? Rent you desired goods and live the life you were always dreaming about! You can lent your items to someone and earn some money.
                    </p>
                    <div className="flex items-center justify-center text-center">
                        <p className=" pb-5 text-[20px] font-semibold">For more queries </p>
                        <Link href="/" ><div className="pb-5 text-[20px] text-orange-400 font-semibold mx-2 hover:underline">click here</div></Link>
                    </div>
                </div>
                <div className=" items-center justify-center text-center">
                    <p className="2xl:text-[40px] sm:text-[40px] text-[40px] font-semibold pt-10 px-7">
                        Our Team
                    </p>
                    <p className="2xl:text-[20px] sm:text-[20px] text-[20px] font-semibold px-7">
                        (Us and You)
                    </p>
                </div>
            </div>
            <div className=" grid 2xl:grid-cols-2 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 w-auto gap-15 pt-10 px-10">
                <div>
                    <Image
                        src="/avatar.svg"
                        alt="Prathamesh"
                        width={200}
                        height={200}
                        className="block ml-auto mr-auto"
                    />
                    <p className="text-center 2xl:text-[20px] sm:text-[20px] text-[20px] font-semibold">Prathamesh Bhalekar</p>
                </div>
                <div>
                    <Image
                        src="/avatar (1).svg"
                        alt="Riya"
                        width={200}
                        height={200}
                        className="block ml-auto mr-auto"
                    />
                    <p className="text-center 2xl:text-[20px] sm:text-[20px] text-[20px] font-semibold">Riya Torgal</p>
                </div>
            </div>
        </>
    )
}

export default page