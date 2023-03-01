import React from "react";
import { useHomeContext } from "./HomeContext";

export const TvPopular = () => {
  return <h1>TvPopular</h1>  
};

/*
const { tvPopular } = useHomeContext();
  console.log(tvPopular);
  return (
    <div className="border-SecondaryTextClr h-min bg-primary overflow-y-hidden px-5 mx-auto flex overflow-x-auto mt-10">
        {tvPopular?.map((card) => {
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
              className="min-w-[20rem] h-[30rem] text-center mr-3 rounded-md shadow-customShadow"
            >
              <div className="relative w-full h-[85%]">
                <img
                  className="w-full h-full object-cover rounded-sm"
                  src={`https://image.tmdb.org/t/p/${posterSize}/${
                    poster_path || ""
                  } `}
                  alt={name ? name : title}
                />
                <div className="absolute -bottom-4 w-10 h-10 left-[7%] text-[.9rem]">
                <div className="relative w-full h-full bg-bgWhite grid place-content-center rounded-3xl text-logoText font-bold">
                  {/*calculatePopularity(vote_average)}
                 {/*div className="absolute bg-[red]">d</div>}
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
             </div>
           );
         })}
       </div>
   );
   */