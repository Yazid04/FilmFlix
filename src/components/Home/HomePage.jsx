import React from "react";
import { Navbar } from "../Navbar/Navbar";
import { Hero } from "./Hero";
import { Trending } from "./Trending";
import {NowPlaying} from './NowPlaying'
import { HomeProvider } from "./HomeContext";
import heroBg from '../assets/heroBg.jpg'


export const HomePage = () => {
  return (
    <>
      <HomeProvider>
        <Navbar />
        <div className="w-full bg-primary pb-10">
          <div
            className={`bg-primary w-full max-w-[85rem] mx-auto relative h-[75vh] md:h-[85vh]`}
          >
            <Hero />
            <img
              className="absolute z-0 inset-0 h-full w-full object-cover object-bottom opacity-30"
              src={heroBg}
              alt="hero background"
            />
            <div className="absolute w-[22rem] mx-auto top-[50%] text-center left-2/4 -translate-x-2/4 -translate-y-[50%] text-PrimaryTextClr font-Montserrat md:w-[45rem] md:max-w-6xl md:top-[35%] md:-translate-y-[35%]">
              <div className="relative w-full h-full">
                <h1 className="text-[2rem] mb-5 md:text-6xl md:mb-10">
                  Cinematic Treasures
                </h1>
                <h3 className="text-lg md:text-2xl">
                  Discover the Best in Film <br />
                  with{" "}
                  <span className="text-logoText font-extrabold">Filmer</span>.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <NowPlaying />
        <Trending />
        <h2>Tv_on_Air</h2>
        <h2>Coming soon to theaters</h2>
      </HomeProvider>
    </>
  );
};
