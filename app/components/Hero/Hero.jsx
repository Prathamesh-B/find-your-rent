"use client";

import "./Hero.css";
import Image from "next/image";

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
        <button className="mt-4 p-3 rounded-lg leading-5 font-bold text-white transition-colors duration-200 transform bg-orange-fyr hover:bg-oragne-secondary-fyr focus:outline-none">Explore</button>
      </div>
      <div className="hero__image-container">
        <div className="hero__image">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
