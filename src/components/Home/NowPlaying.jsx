import React, { useEffect } from "react";
import { useState } from "react";
import { useHomeContext } from "./HomeContext";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { ImArrowRight2 } from "react-icons/im";
import heroBg from "../assets/heroBg.jpg";

export const NowPlaying = () => {
  const API_KEY = "ae47695d0d81bdec0747a63eb0a9b7b6";
  const { nowPlaying, movieIds } = useHomeContext();
  const [index, setIndex] = useState(0);
  const [similarMovies, setSimilarMovies] = useState(null);

  useEffect(() => {
    const lastIndex = nowPlaying?.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, nowPlaying]);

  useEffect(() => {
    if (nowPlaying !== null) {
      const getRandomIndex = Math.floor(Math.random() * movieIds.length);
      getSimilarMovies(movieIds[getRandomIndex]);
    }
  }, [movieIds, nowPlaying]);

  //const ENDPOINT_SIMILAR = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
  const getSimilarMovies = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const {results} = await response.json();
    return setSimilarMovies(await results);
  };

  console.log(similarMovies);

  return (
    <>
      <main className="max-w-[85rem] mx-auto">
        <h1 className="bg-primary text-logoText text-3xl px-6 py-3 font-Montserrat md:text-PrimaryTextClr">
          Now Playing
        </h1>
        <section className="w-full text-center grid place-content-center h-[30rem] md:flex md:justify-center md:items-center md:gap-x-4 lg:justify-start lg:px-5">
          <div className="h-[30rem] w-80 relative mx-auto bg-bgWhite overflow-hidden md:mx-0 md-lg:w-[30rem] md-lg:h-[28rem]">
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
                <article
                  className={`${position} absolute transition-all duration-500 top-0 left-0 w-full h-full`}
                  key={id}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={`https://image.tmdb.org/t/p/w500/${
                      poster_path || ""
                    } `}
                    alt={title}
                  />
                  <div className="absolute cursor-pointer text-PrimaryTextClr bottom-0 left-2/4 -translate-x-2/4 w-full bg-navbar p-4 shadow-namesShadow">
                    <div className="flex justify-center items-center">
                      <h2 className="mr-5">{title}</h2>
                      <ImArrowRight2 />
                    </div>
                    <p className="text-xs text-start mt-3">
                      {overview.toString().slice(0, overview.length / 5)}...
                    </p>
                  </div>
                  <div
                    onClick={() => setIndex(index + 1)}
                    className="absolute top-[40%] w-8 h-8 right-0 cursor-pointer -translate-y-[40%]"
                  >
                    <BsArrowRightSquareFill className="w-full h-full" />
                  </div>
                  <div
                    onClick={() => setIndex(index - 1)}
                    className="absolute top-[40%] w-8 h-8 left-0 cursor-pointer -translate-y-[40%]"
                  >
                    <BsArrowLeftSquareFill className="w-full h-full" />
                  </div>
                </article>
              );
            })}
          </div>
          <div className="w-80 h-[29rem] shadow-customShadow rounded-md gap-y-2 overflow-hidden hidden text-PrimaryTextClr bg-primary bg-gradient-to-b from-SecondaryTextClr md:flex flex-col md:text-start md:justify-around md:h-[28rem] lg:grid lg:w-[50rem] lg:grid-cols-2 lg:grid-rows-2">
          {
          similarMovies?.slice(0, 4)?.map((movie) => {
            const {id, name, overview, title, poster_path} = movie
            return (

            <div key={id} className="w-full h-full flex">
              <div className="bg-[white] flex-[40%] h-full">
                <img
                  className="object-cover h-[inherit] w-full"
                  src={`https://image.tmdb.org/t/p/w400/${poster_path || ""} `}
                  alt={name ? name : title}
                />
              </div>
              <div className="flex-[60%] grid place-content-center pl-3 mx-auto">
                <h2 className="font-bold font-[cursive] pb-1">
                  {title? title : name}
                </h2>
                <p> {overview.toString().slice(0, overview.length / 5)}</p>
              </div>
              </div>
            )
          })}
                          
          </div>
        </section>
      </main>
    </>
  );
};



/*
<div className="w-full h-full flex">
              <div className="bg-[white] flex-[40%] h-full">
                <img
                  className="object-cover h-[inherit]"
                  src={heroBg}
                  alt="gsgs"
                />
              </div>
              <div className="flex-[60%] grid place-content-center pl-3 mx-auto">
                <h2 className="font-bold font-[cursive] pb-1">
                  The boogyman here Mr.producer bla bla bla
                </h2>
                <p>info here...</p>
              </div>
              </div>
*/

