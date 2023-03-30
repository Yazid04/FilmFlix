import React, {useState, useEffect}  from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/context";

export const useHorizontalCardList = (list, toRate) => {
  const POSTER_SIZE = "w500/";
  const [isLoading, setIsLoading] = useState(true);
  const {theme} = useGlobalContext();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  function calculatePopularity(vote_average) {
    const toStr = vote_average.toString().replace(/\./g, "");
    if (toStr[0] === 0) return "NR";
    if (toStr.length === 1) return `${toStr[0]}0%`;
    if (toStr.length === 2) return Math.round(`${toStr[0]}${toStr[1]}`) + "%";
    return Math.round(`${toStr[0]}${toStr[1]}.${toStr[2]}`) + "%";
  }
  
  return (
    <>
    <PerfectScrollbar className="h-min overflow-hidden mx-auto flex pb-6">
      {list?.map((card) => {
        const {
          title,
          poster_path,
          name,
          vote_average,
          id,
          first_air_date,
          release_date,
        } = card;
        if(isLoading){
          return (
          <div
            className={`min-w-[12rem] grid place-content-center h-[27rem] mx-2 bg-navbar rounded-md`}
            key={id}>
            <div className="w-[8rem] h-[20rem] bg-bgWhite rounded-md animate-pulse grid place-content-center font-bold">...</div>
            </div>
          )
        }
        if(!isLoading){  
        return (
          <div
            className={`min-w-[12rem] h-[27rem] mx-2 ${theme === 'dark' ? 'bg-navbar' : 'bg-cardsBg shadow-4xl'} rounded-md hover:transition-all hover:shadow-3x`}
            key={id}>
            {/*Movie image && rating */}
            <Link to={`/movie/${id}`}>
              <div className="block relative h-[17rem] w-full">
                <img
                  src={`https://image.tmdb.org/t/p/${POSTER_SIZE}/${
                    poster_path || ""
                  }`}
                  alt={name || title}
                  className="h-full w-full object-cover rounded-md"
                />
                {toRate && (
                  <div className={`absolute -bottom-4 left-3 h-8 w-8 rounded-3xl grid place-content-center text-primaryTextLight ${theme === 'dark' ? 'bg-bgWhite' : 'bg-primaryLight '} text-xs font-extrabold`}>
                    {calculatePopularity(vote_average)}
                  </div>
                )}
              </div>
            </Link>
            {/*Movie details */}
            <div className={`mt-6 ml-3 h-[6rem] flex flex-col justify-between text-PrimaryTextClr`}>
              <h3 className='text-sm font-bold pr-2'>
                {title || name}
              </h3>
              <p className="text-xs opacity-80">
                {release_date || first_air_date}
              </p>
              <Link to={`/movie/${id}`}>
                <div className="flex items-center gap-x-3">
                  <p className="underline">Read More </p>
                  <BsBoxArrowUpRight />
                </div>
              </Link>
            </div>
          </div>
        );
      } 
     return list;
     })}
    </PerfectScrollbar>
  </>
  );
};

