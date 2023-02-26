import React from "react";
import { useHomeContext } from "./HomeContext";

export const Trending = () => {
  const { trending, loading, handleToggle, toggle } = useHomeContext();
  function calculatePopularity(vote_average) {
      const toStr = vote_average.toString().replace(/\./g, "");
      if (toStr[0] == 0 || toStr.length < 2) return "NR";
      if(toStr.length === 2) return Math.round(`${toStr[0]}${toStr[1]}`) + '%';
      return Math.round(`${toStr[0]}${toStr[1]}.${toStr[2]}`)+'%';
  }

  return (
    <>
      <div className="py-8 px-5 bg-primary font-Montserrat mx-auto">
        <div className="flex items-center justify-center max-w-xl mx-auto md:mx-0 md:justify-start">
          <h1 className="font-bold text-3xl mr-2 text-PrimaryTextClr">
            Trending
          </h1>
          <div className="flex relative justify-between rounded-3xl w-4/5 overflow-hidden bg-bgWhite font-bold text-logoText max-w-xs">
            <div
              type="button"
              onClick={handleToggle}
              className="grid place-content-center w-full cursor-pointer px-3 py-1"
            >
              Today
            </div>
            <div
              type="button"
              onClick={handleToggle}
              className="grid place-content-center cursor-pointer text-center w-full px-3 py-1"
            >
              This Week
            </div>
            <div
              className={` text-sm absolute grid place-content-center text-PrimaryTextClr top-0 
              ${
                toggle.toggleWeekly ? "left-2/4 right-0" : "left-0 right-2/4"
              } bottom-0 rounded-3xl transition-all duration-300 bg-[red]`}
            >
              {toggle.toggleToday ? "Today" : "This Week"}
            </div>
          </div>
        </div>
      </div>

      <div className="border-SecondaryTextClr h-min bg-primary overflow-y-hidden px-5 mx-auto flex overflow-x-auto">
        {trending?.map((card) => {
          const {
            title,
            poster_path,
            name,
            vote_average,
            id,
            first_air_date,
            release_date,
          } = card;
          const posterSize = "w500/";
          return (
            <div
              key={id}
              className="min-w-[11rem] h-[22rem] text-center mr-3 rounded-md"
            >
              <div className="relative w-full h-[17rem]">
                <img
                  className="w-full h-full object-cover rounded-sm"
                  src={`https://image.tmdb.org/t/p/${posterSize}/${
                    poster_path || ""
                  } `}
                  alt={name ? name : title}
                />
                <div className="absolute -bottom-4 w-10 h-10 left-[7%] text-[.9rem]">
                <div className="relative w-full h-full bg-bgWhite grid place-content-center rounded-3xl text-logoText font-bold">
                  {calculatePopularity(vote_average)}
                 {/*div className="absolute bg-[red]">d</div>*/}
                </div>
                </div>
              </div>
              <div className="p-4 text-start bg-[transparent] text-PrimaryTextClr">
                <p className="text-sm tracking-wider font-bold">
                  {title ? title : name}:{" "}
                </p>
                <p className="text-xs opacity-80">
                  {first_air_date ? first_air_date : release_date}
                </p>
              </div>
              {/*loading animation while fetching*/}
              {loading && (
                <div className="w-full h-full flex flex-col gap-y-10">
                  <div className="flex-[70%] bg-[#b3b3b3] animate-pulse rounded-md m-2 grid place-content-center text-2xl">
                    ...
                  </div>
                  <div className="flex-[30%] bg-[#d3d2d2] animate-pulse rounded-md m-2 grid place-content-center text-2xl">
                    ...
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

/*
const { list } = useGlobalContext();
{list.map((item) => {
        const { title, poster_path } = item;
        const posterSize = `w500/`
        return (
          <>
          <div className="w-full h-full" key={Math.random() * 10000}>
            <img src={`https://image.tmdb.org/t/p/${posterSize}/${poster_path || ''} `} alt='ckckck'/>
          </div>
          </>
        );
      })}*/
