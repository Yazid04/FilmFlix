import React from "react";
import { useMovieDetailsContext } from "./detailsPageContext";
import { Navbar } from "../../shared/Navbar";
import { MdStarRate } from "react-icons/md";
import { Footer } from '../../shared/Footer'
import GetVotes from "../../utils/GetVotes";
import { Loading } from "../../shared/Loading";
import { Error } from "../../shared/Error";


export const Content = (props) => {
const {mediaType, theme} = props;
const { movieDetails, isLoading, hasError, trailerData, movieCredits } = useMovieDetailsContext();
  const POSTER_SIZE = 'w500/';
  if (isLoading) {
    return <Loading />
  }
  if (hasError) {
    return (
      <Error />
    );
  }
 
 function getDirectorName(){
   const directors = movieCredits?.crew?.filter((director) => director.known_for_department === 'Directing');
   const mainDirector = directors?.reduce((acc, obj) => {
        return obj.popularity > acc.popularity ? obj : acc;
   }, { popularity: 0 });
   return mainDirector?.name || mainDirector.original_name;
 };

 function getCastANDReleaseYear(movieCredits, movieDetails) {
  const cast = movieCredits?.cast?.filter(c => c.known_for_department === 'Acting')?.slice(0, 9);
  const mostFamousCast = cast?.sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity));
  const stringWithoutHyphens = movieDetails?.release_date?.replace(/-/g, '');
  const stringWithoutHyphensForTv = movieDetails?.first_air_date?.replace(/-/g, '');

  const releaseMovieYear = stringWithoutHyphens?.substring(0, 4);
  const releaseTvYear = stringWithoutHyphensForTv?.substring(0, 4);
  return { mostFamousCast, releaseMovieYear, releaseTvYear };
}

const {mostFamousCast, releaseMovieYear, releaseTvYear} = getCastANDReleaseYear(movieCredits, movieDetails);
const voteAverage = movieDetails?.vote_average;

  return (
    <>
      <Navbar />
      <section className="text-PrimaryTextClr font-sourceSansPro w-[85%] max-w-2xl pt-24 mx-auto flex flex-col md:max-w-3xl lg:block lg:max-w-6xl xl:max-w-[85rem]">
        {/* Trailer */}
        <div className="w-full h-96 bg-cardsBg lg:flex">
          <div className="w-80 h-full hidden lg:block">
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
            <h1 className="text-xl font-sourceSansPro mb-5">
              {movieDetails?.original_title || movieDetails?.title || movieDetails.name}
            </h1>
            <div className="flex gap-2 items-center font-bold mb-5">
              <MdStarRate className="text-[yellow] text-2xl" />
              <p>{GetVotes(voteAverage)}</p>
              <div className="font-light ml-2 text-[#aaaaaa]">{`( ${mediaType === 'tv' ? releaseTvYear : releaseMovieYear} )`}</div>
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
              <span className="font-bold">Director:</span> {getDirectorName()}
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
