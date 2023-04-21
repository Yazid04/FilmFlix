import React from 'react'
import { useSearchMovieContext } from "./searchPageContext";
import { Loading } from "../../shared/Loading";
import { Link } from 'react-router-dom';
import { Footer } from '../../shared/Footer';

export const SearchPageResults = (props) => {
  const {genre, theme} = props;
const { isLoading, filteredResponse } = useSearchMovieContext(); 

if (isLoading) {
    return <Loading />
}


  return (
  <>
    <main className={`w-[85%] mt-10 mx-auto h-min font-sourceSansPro overflow-hidden flex flex-col gap-3 flex-wrap md:grid md:grid-cols-2 2xl:grid-cols-3`}>
    {filteredResponse.length === 0 ?
        <div className={`${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'} h-64 flex-grow grid place-content-center`}>
          <h1 className="text-xl">Your query doesn't match any results</h1>
        </div>
        :
        filteredResponse.map((movie) => {
     const {poster_path, backdrop_path, id, name, title, overview, media_type, release_date, first_air_date } = movie;
     const POSTER_SIZE = "w500/";
    return (
     <div key={id} className={`w-full h-60 ${theme === 'dark' ? 'bg-navbar' : 'bg-cardsBg'} flex rounded-md overflow-hidden `}>
        <div className="flex-[35%]">
       <Link to={`/details/${media_type || genre}/${id}`}>
           <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/${POSTER_SIZE}/${
               poster_path || backdrop_path || ''
             }`}
             alt={name || title} />
       </Link> 
        </div>
        <div className="flex-[65%] p-3 flex flex-col justify-start">
         <div className='mb-5'>
           <h3 className="pb-1 mb-3">{name || title}</h3>
           <div className='flex gap-x-3 h-min items-center'>
           <div className={`grid place-content-center ${theme === 'dark' ? 'bg-cardsBg' : 'bg-primary' } px-3 py-1 w-14 h-full rounded-sm transition-all`}>
            {media_type || genre}
           </div>
          <div className='text-[grey]'>{ first_air_date || release_date /*genre === 'tv' ? release_date.toString().substring(0, 4) : first_air_date.toString().substring(0, 4)*/ }
          </div>
          </div>
         </div>
         <div className='mb-3'>
           <p className='text-sm'>{overview?.toString().slice(0, 120)}...</p>
         </div>
        </div>
     </div>
    )
     })}
   </main>
   <Footer />
  </>  
  )}
