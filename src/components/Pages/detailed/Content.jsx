import React from "react";
import { useMovieDetailsContext } from "./detailsPageContext";
import { Navbar } from "../../shared/Navbar";
import { MdStarRate } from "react-icons/md";
import { Link } from "react-router-dom";
import {BsArrowRight} from 'react-icons/bs'
import { Footer } from '../../shared/Footer'
import GetVotes from "../../utils/GetVotes";

export const Content = ({theme}) => {
 
const { movieDetails, isLoading, hasError, trailerData, movieCredits } = useMovieDetailsContext();
  const POSTER_SIZE = 'w500/';
  if (isLoading) {
    return (
      <div className="text-PrimaryTextClr animate-pulse w-44 h-44 grid place-content-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }
  if (hasError) {
    return (
      <div className="text-PrimaryTextClr w-44 h-44 grid place-content-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-2xl">something weng wrong :(</h1>
        <Link to={'/'}> 
         <div className="flex gap-3">
          <div className="text-logoText text-xl">Back to home page</div>
           <BsArrowRight className="transition-all hover:ml-3" />
          </div>
        </Link>
      </div>
    );
  }
 
 function getDirectorName(){
   const directors = movieCredits?.crew?.filter((director) => director.known_for_department === 'Directing');
   const mainDirector = directors?.reduce((acc, obj) => {
        return obj.popularity > acc.popularity ? obj : acc;
   }, { popularity: 0 });
   return mainDirector.name
 };

 function getCastANDReleaseYear(movieCredits, movieDetails) {
  const cast = movieCredits?.cast?.filter(c => c.known_for_department === 'Acting')?.slice(0, 9);
  const mostFamousCast = cast?.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
  const stringWithoutHyphens = movieDetails?.release_date.replace(/-/g, '');
  const releaseYear = stringWithoutHyphens.substring(0, 4);
  
  return { mostFamousCast, releaseYear };
}

const {mostFamousCast, releaseYear} = getCastANDReleaseYear(movieCredits, movieDetails);
const voteAverage = movieDetails?.vote_average;
 
  return (
    <>
      <Navbar />
      <section className="text-PrimaryTextClr w-[85%] max-w-2xl pt-24 mx-auto flex flex-col md:max-w-3xl lg:block lg:max-w-6xl xl:max-w-[85rem]">
        {/* Trailer */}
        <div className="w-full h-96 bg-cardsBg lg:flex">
          <div className="w-64 h-full hidden lg:block">
            <img className='w-full h-[inherit] object-cover' 
                 src={`https://image.tmdb.org/t/p/${POSTER_SIZE}/${
                  movieDetails?.backdrop_path || movieDetails?.poster_path
                  }`} alt={movieDetails?.original_title || movieDetails?.title} />
          </div>
          <iframe 
           title = {`${movieDetails?.original_title || movieDetails?.title}`}
           width= '100%'
           height= '384'
           src= {`https://www.youtube.com/embed/${trailerData[0]?.key}`}
           frameBorder= '0'
           allowFullScreen 
        /> 
        </div>

        {/* movie detail */}
        <div className={`w-full h-min py-7 ${theme === 'light' ? 'bg-cardsBg' : 'bg-navbar'}`}>
          <div className={`px-7`}>
            <h1 className="text-xl font-NotoSans mb-5">
              {movieDetails?.original_title || movieDetails?.title}
            </h1>
            <div className="flex gap-2 items-center font-bold mb-5">
              <MdStarRate className="text-[yellow] text-2xl" />
              <p>{GetVotes(voteAverage)}</p>
              <div className="font-light ml-2 text-[#aaaaaa]">{`( ${releaseYear} )`}</div>
            </div>
            <div className="flex justify-start flex-wrap mb-5">
              {movieDetails?.genres.map(genre => {
                const {id, name} = genre; 
             return (
               <button key={id} className="bg-[#3b3b3b] rounded-md transition-all hover:bg-[#292929] p-2 mr-2 mb-3">{name}</button>
             )
           })}
            </div>
          </div>
          <div className="bg-[#3b3b3b] w-full px-7 py-4">
            <h2 className="font-bold mb-3 text-2xl">Overview</h2>
            <p>
             {movieDetails?.overview}
            </p>
          </div>
          <div className="px-7 py-4">
            <div>
              <span className="font-bold">Director:</span> { getDirectorName() }
            </div>
            <div className="my-3 font-bold">Cast: </div>
            <div className="flex gap-5 w-full h-min overflow-y-hidden overflow-x-auto">
              {mostFamousCast?.map(c => {
                return (
              <div key={c.id} className="min-w-[80px] w-36 h-28 grid place-content-center overflow-hidden bg-[white] text-SecondaryTextClr rounded-full">
                  <img className="w-full h-full object-cover" 
                       src={`https://image.tmdb.org/t/p/${POSTER_SIZE}/${
                        c?.profile_path}`} alt={c.name} />
              </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};


