import React, { useCallback, useEffect, useState } from "react";
import { useHomeContext } from "./HomeContext";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { ImArrowRight2 } from "react-icons/im";
import { Link } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import { useGlobalContext } from "../../context/context";
import { useSectionHeader } from "../../utils/useSectionHeader";

export const NowPlaying = () => {
  const { nowPlaying, movieIds, API_KEY } = useHomeContext();
  const {theme} = useGlobalContext();
  const [index, setIndex] = useState(0);
  const [similarMovies, setSimilarMovies] = useState(null);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  let cols = 4;
 

  const getSimilarMovies = useCallback(async (id) => {
    try{
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`);
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
        const { results } = await response.json();
        return setSimilarMovies(await results);
    } catch (error){
      console.error('Error fetching trending movies:', error);
    }
  },[API_KEY]);

  useEffect(() => {
    if (nowPlaying !== null) {
      const getRandomIndex = Math.floor(Math.random() * movieIds.length - 1);
      getSimilarMovies(movieIds[getRandomIndex]);
    }
  }, [movieIds, nowPlaying, getSimilarMovies]);

  useEffect(() => {
    const handleScreenSize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleScreenSize);
    return () => window.removeEventListener("resize", handleScreenSize);
  }, []);

  useEffect(() => {
    const lastIndex = nowPlaying?.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, nowPlaying]);

  if (screenSize <= 1024) {
    cols = 3;
  }

  return (
    <>
      <main className={`max-w-[85rem] mx-auto ${theme === 'dark' ? 'text-PrimaryTextClr bg-primary' : 'text-primaryTextLight bg-primaryLight'} h-[33rem] mb-20 px-5`}>
        <section className="w-[90%] mx-auto h-[30rem] text-start">
          {/*wrapper*/}
          <div className="grid place-content-center h-[35rem] md:flex md:justify-center md:items-center md:gap-x-4 lg:justify-start lg:px-5">
            {/* Now playing section*/}
            <div className="h-full w-80">
              {useSectionHeader('Now playing')}
              <div className="h-[31.7rem] relative shadow-4xl overflow-hidden mx-auto rounded-md md:mx-0">
                {nowPlaying?.map((item, personIdx) => {
                  const { title, poster_path, id, overview } = item;
                  let position = "nextSlide";
                  if (personIdx === index) {
                    position = "activeSlide";
                  }
                  if (
                    personIdx === index - 1 ||
                    (index === 0 && personIdx === item.length - 1)
                  ) {
                    position = "lastSlide";
                  }
                  return (
                    <React.Fragment key={id}>
                      <article
                        key={id}
                        className={`${position} absolute transition-all duration-500 top-0 left-0 w-full h-full ${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'}`}
                      >
                        <img
                          className="w-full h-full object-cover"
                          src={`https://image.tmdb.org/t/p/w500/${
                            poster_path || ""
                          } `}
                          alt={title}
                        />
                        <Link to={`details/${id}`}>
                          <div className={`absolute cursor-pointer bottom-0 left-2/4 -translate-x-2/4 w-full ${theme === 'dark' ? 'bg-navbar' : 'bg-primaryLight' } p-4 py-3 `}>
                            <div className="flex justify-center items-center">
                              <h2 className="mr-5 font-bold">{title}</h2>
                              <ImArrowRight2 />
                            </div>
                            <p className="text-sm text-start mt-3 leading-5 tracking-wide">
                              {overview.toString().slice(0, 100)}...
                            </p>
                          </div>
                        </Link>
                        <div
                          onClick={() => setIndex(index + 1)}
                          className="absolute top-[40%] w-8 h-8 right-0 text-PrimaryTextClr cursor-pointer -translate-y-[40%]"
                        >
                          <BsArrowRightSquareFill className="w-full h-full" />
                        </div>
                        <div
                          onClick={() => setIndex(index - 1)}
                          className="absolute top-[40%] w-8 h-8 left-0 text-PrimaryTextClr cursor-pointer -translate-y-[40%]"
                        >
                          <BsArrowLeftSquareFill className="w-full h-full" />
                        </div>
                      </article>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            {/* similar movies section*/}
            <div className={`h-full w-80 hidden md:block lg:w-[40rem] xl:w-[50rem] `}>
              {useSectionHeader('Similar Movies')}
              <div
                className={`h-[31.7rem] pb-5 w-80 gap-4 overflow-hidden md:grid md:grid-cols-1 md:grid-rows-3 lg:grid lg:w-[40rem] lg:grid-cols-2 lg:grid-rows-2 xl:w-[50rem]`}
              >
                {similarMovies?.slice(0, cols)?.map((movie) => {
                  const { id, name, overview, title, poster_path } = movie;
                  return (
                    <div
                      key={id}
                      className={`w-full flex flex-1 shadow-4xl overflow-hidden  ${theme === 'dark' ? 'bg-navbar text-PrimaryTextClr' : 'bg-primaryLight text-primaryTextLight'} rounded-lg`}
                    >
                      <div className="flex-[35%]">
                        <Link to={`details/${id}`}>
                          <img
                            className="object-cover h-full w-full"
                            src={`https://image.tmdb.org/t/p/w400/${
                              poster_path || ""
                            } `}
                            alt={name || title}
                          />
                        </Link>
                      </div>
                      <div className="flex-[65%] flex flex-col justify-between">
                        <div className="my-4">
                          <h3 className="font-bold text-md px-4 text-sm lg:text-base">
                            {title || name}
                          </h3>
                          <p className="px-4 py-1 text-xs leading-6 tracking-wide lg:text-sm">
                            {overview.toString().slice(0, 95)}...
                          </p>
                        </div>
                        <div className="my-4">
                          {cols === 4 && (
                            <Link to={`/details/${id}`}>
                              <div className="flex items-center px-4 text-xs w-40 h-7 lg:text-sm">
                                <p className="underline">Read More</p>
                                <div className="h-full grid place-content-center ml-2 text-md">
                                  <TiArrowRightThick />
                                </div>
                              </div>
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
