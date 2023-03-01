import React, { useEffect } from "react";
import { useState } from "react";
import { useHomeContext } from "./HomeContext";
import { BsArrowRightSquareFill, BsArrowLeftSquareFill } from "react-icons/bs";
import { ImArrowRight2 } from "react-icons/im";


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

  const getSimilarMovies = async (id) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    const { results } = await response.json();
    return setSimilarMovies(await results);
  };

  let cols = 3;
  return (
    <>
      <main className="max-w-[85rem] mx-auto text-PrimaryTextClr my-3 h-[33rem]">
        <section className="w-[90%] mx-auto h-[30rem] text-start">
        {/*Now playing header*/}
        <div className="flex mb-3">
            <div className="border-l-4 border-l-logoText bg-bgRed rounded-full w-[0.1x] h-10"></div>
            <h1 className="text-3xl ml-2 font-bold md:text-PrimaryTextClr">
              Now Playing
            </h1>
        </div>

        {/*wrapper*/}
        <div className="grid place-content-center h-[inherit] md:flex md:justify-center md:items-center md:gap-x-4 lg:justify-start lg:px-5">
          {/*Now playing section*/}
          <div className="h-[inherit] w-80 relative mx-auto overflow-hidden shadow-3xl md:mx-0">
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
                  <article key={id}
                    className={`${position} absolute transition-all duration-500 top-0 left-0 w-full h-full`}>
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
                </React.Fragment>
                );
              })}
          </div>
       
          {/*Similar movies*/}
          <div className="h-full -mt-[6.5rem]">
            {/*Similar Movies header*/}
          <div className="flex mb-3">
            <div className="border-l-4 border-l-logoText bg-bgRed rounded-full w-[0.1x] h-10"></div>
            <h1 className="text-3xl ml-2 font-bold md:text-PrimaryTextClr">
              Similar Movies
            </h1>
          </div>
          {/*Similar Movies section*/}
            <div className={`w-80 h-full rounded-md gap-y-2 overflow-hidden hidden text-PrimaryTextClr bg-primary bg-gradient-to-b from-SecondaryTextClr md:flex md:text-start md:justify-start md:flex-col lg:grid lg:w-[40rem] lg:grid-cols-2 lg:grid-rows-2 xl:${cols = 4} xl:w-[50rem]`}>
              {similarMovies?.slice(0, cols)?.map((movie) => {
                const { id, name, overview, title, poster_path } = movie;
                return (
                  <div key={id} className="w-full flex-1 flex gap-3 shadow-customShadow text-PrimaryTextClr">
                    <div className="flex-[35%]">
                      <img
                        className="object-cover h-full w-full"
                        src={`https://image.tmdb.org/t/p/w400/${
                          poster_path || ""
                        } `}
                        alt={name || title}
                      />
                    </div>
                    <div className="flex-[65%]">
                      <h1 className="font-bold text-xl px-2 py-2">
                        {title || name}
                      </h1>
                      <p className="px-2 py-2 text-sm">
                        {overview.toString().slice(0, 100)}...
                      </p>
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
