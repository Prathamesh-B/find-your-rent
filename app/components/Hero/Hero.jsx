"use client"

import './Hero.css'
import Image from "next/image";
import { Button } from '@mantine/core';

const Hero = () => {
	return (
        <div className="hero">
            <div className="flex-1 pt-28 padding-x">
                <h1 className="hero__title">
                    <p>Dont Wait!</p> <p>Just Rent!</p>
                </h1>
                
                <p className="hero__subtitle">
                    Renting made easy for college students within campus
                </p>

                {/* <CustomButton
                    title = "Explore Cars"
                    containerStyles = "bg-primary-blue text-white rounded-full mt-10"
                    handleClick = {handleScroll}
                /> */}
                <Button className='mt-10' variant="filled" color="rgba(238, 147, 34, 1)" size="md" radius="md">Explore</Button>
            </div>
            <div className="hero__image-container">
                <div className="hero__image">
                    <Image src="/hero.png" alt="hero" fill className="object-contain"/>
                </div>
                <div className="hero__image-overlay"/>
            </div>
        </div>
    )
};

export default Hero;