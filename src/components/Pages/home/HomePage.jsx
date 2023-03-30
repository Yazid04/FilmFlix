import React, { useEffect, useRef } from "react";
import { Navbar } from "../../shared/Navbar";
import { Trending } from "./Trending";
import { SearchBar } from "../../shared/SearchBar";
import { NowPlaying } from './NowPlaying'
import { HomeProvider } from "./HomeContext";
import { FanFavourites } from './FanFavourites'
import { UpComing } from "./UpComing"; 
import heroBg from '../../assets/heroBg.png';
import { Footer } from "./Footer";
import { useGlobalContext } from "../../context/context";
import '../../../index.css'

export const HomePage = () => {
  const bodyElm = document.querySelector("body");
  const {logoText, theme} = useGlobalContext();
  const headerRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      headerRef.current.classList.add('animate');
    }, 500);
  }, []);

  useEffect(() => {
    bodyElm.style.backgroundColor = theme === 'dark' ? '' : '#F0FFF0';
  }, [theme, bodyElm.style]);


  return (
    <>
      <HomeProvider>
        <Navbar />
        <div className={`w-full ${theme === 'dark' ? 'bg-primary' : 'bg-primaryLight'} pb-10 mt-20`}>
          <div
            className={`bg-primary w-full max-w-[85rem] mx-auto relative h-[75vh] md:h-[85vh]`}>
            <div className="block z-20 relative w-4/5 mx-auto pt-10 md-lg:hidden">
              <SearchBar />
            </div>
            <img
              className="absolute z-0 inset-0 h-full w-full object-cover object-bottom opacity-30"
              src={heroBg}
              alt="hero background"
              loading="lazy"
            />
            <div ref={headerRef} className="absolute text-reveal w-[22rem] mx-auto text-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-PrimaryTextClr font-Montserrat md:w-[45rem] md:max-w-6xl md:top-[35%] md:-translate-y-[35%]">
              <div className="relative w-full h-full">
                <h1 className="text-[2rem] mb-5 md:text-6xl md:mb-10">
                  Cinematic Treasures
                </h1>
                <h3 className="text-lg md:text-2xl">
                  Discover the Best in Film <br />
                  with{" "}
                  <span className="text-logoText font-extrabold">{logoText}</span>.
                </h3>
              </div>
            </div>
          </div>
        </div>
        <NowPlaying />
        <Trending />
        <FanFavourites />
        <UpComing />
        <Footer />        
      </HomeProvider>
    </>
  );
};
