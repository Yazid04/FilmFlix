import React, { useRef, useId, useState } from "react";
import { useSearchMovieContext } from "./searchPageContext";
import { Navbar } from "../../shared/Navbar";
import { Error } from '../../shared/Error';
import { IoOptionsOutline } from "react-icons/io5"; 
import { useGlobalContext } from "../../context/context";
import { SearchPageResults } from "./SearchPageResults";


export const SearchPageContent = () => { 
const { error } = useSearchMovieContext(); 
const {theme} = useGlobalContext(); 
 const inputRef = useRef();
 const [isFilterOpen, setIsFilterOpen] = useState(false);
 const [inputValue, setInputValue] = useState('');
 const { setUserFilters, userFilters, genreList, setGenreList } = useSearchMovieContext(); 
 const [mediaType, setMediaType] = useState([
{
  id: useId(),
  name: 'Any',
  mediaTypeQuery: 'multi',
  clicked: true,
},
{
  id: useId(),
  name: 'Tv Shows',
  mediaTypeQuery: 'tv',
  clicked: false,
},
{
  id: useId(),
  name: 'Movies',
  mediaTypeQuery: 'movie',
  clicked: false,
}
 ]);


 if(error){
  return <Error/>
}

const handleUserQuery = () => {
    const userInput = inputRef.current.value;
    setInputValue(userInput);
    setUserFilters((oldState) => {
      return {...oldState, query: userInput};
    });
}

function toggleOpenfilterOptions(){
  setIsFilterOpen(!isFilterOpen);
}

function handleChoosenGenre(id) {
  setGenreList((oldGenres) => {
    const updatedGenres = oldGenres.map((genre) => {
      // Use object destructuring to create a copy of genre object
      const updatedGenre = { ...genre };
      if (updatedGenre.clicked) {
        updatedGenre.clicked = false;
      }
      return updatedGenre;
    });

    // Find the genre in the updatedGenres array with matching id (that user clicked)
    const newClickedGenreIndex = updatedGenres.findIndex((genre) => genre.id === id);

    // If genre is found, update the clicked property to true
    if (newClickedGenreIndex !== -1) {
      // Use spread operator to update userFilters with new genreID
      setUserFilters((oldGenre) => {
        return { ...oldGenre, genreID: updatedGenres[newClickedGenreIndex].id }
      });

      // Update clicked property of new clicked genre
      updatedGenres[newClickedGenreIndex].clicked = true;
    }

    // Return the updated updatedGenres array
    return updatedGenres;
  });
}

function handleChoosenMediaType(id) {
  setMediaType((oldMediaTypes) => {
    const updatedMediaTypes = oldMediaTypes.map((mediaType) => {
      // Use object destructuring to create a copy of mediaType object
      const updatedMediaType = { ...mediaType };
      if (updatedMediaType.clicked) {
        updatedMediaType.clicked = false;
      }
      return updatedMediaType;
    });

    // Find the mediaType in the updatedMediaTypes array with matching id (that user clicked)
    const newClickedMediaTypeIndex = updatedMediaTypes.findIndex((mediaType) => mediaType.id === id);

    // If mediaType is found, update the clicked property to true
    if (newClickedMediaTypeIndex !== -1) {
      // Use spread operator to update userFilters with new mediaTypeQuery
      setUserFilters((oldFilters) => {
        return { ...oldFilters, mediaType: updatedMediaTypes[newClickedMediaTypeIndex].mediaTypeQuery }
      });

      // Update clicked property of new clicked mediaType
      updatedMediaTypes[newClickedMediaTypeIndex].clicked = true;
    }

    // Return the updated updatedMediaTypes array
    return updatedMediaTypes;
  });
}

function handleUserFilters(){
  setUserFilters(oldState => {
     return {...oldState, query:inputRef.current.value }
   });
}

const themeAndClickedMediaType = {
   genre: userFilters.mediaType,
   theme: theme,
}

  return (
    <>
    <Navbar />
    <div className="max-w-[85rem] mx-auto">
    { /* Navbar */ }
     
      <div className="text-[white] pt-32 w-full mx-auto h-min">
     
        {/* search, filtering options and functionality */}
        <section className="w-[85%] mx-auto font-sourceSansPro">
        <div className="flex">
        <div className="relative w-full">
        <input
          className={`w-full px-3 py-2  ${theme === 'dark' ? 'focus:shadow-3xl text-[#000]' : 'focus:shadow-4xl bg-cardsBg text-PrimaryTextClr'} outline-none rounded-xs focus:shadow-2xl`}
          type="text"
          value={inputValue}
          ref={inputRef}
          onChange={() => handleUserQuery()}
          placeholder="Search for a show/movie" />
        <button onClick={() => handleUserFilters()} className="absolute top-0 -right-2 cursor-pointer rounded-md h-10 w-20 bg-navbar text-PrimaryTextClr">
          Search
        </button>
        </div>
        <div className="h-10 text-lg grid place-content-center cursor-pointer bg-navbar w-14 rounded-md ml-3"
               onClick={() => toggleOpenfilterOptions()} >
            <IoOptionsOutline className="text-xl" />
        </div>
        </div>
        <div className={`w-full block ${isFilterOpen ? `h-min ease-in` : 'h-0 ease-out'} transition-all bg-primaryLight text-primaryTextLight my-3`}>

        {isFilterOpen && <div className={`h-[inherit] pb-5 ${theme === 'dark' ? 'bg-navbar text-PrimaryTextClr' : 'bg-cardsBg text-primaryTextLight' } transition-all ease-in-out`}>

          <div className="pt-3 px-3 font-bold"><h2>Genres : </h2></div>
          <div className="w-full flex gap-3 flex-wrap p-2 text-PrimaryTextClr">
            {
              genreList.map(({name, clicked, id}) => {
                return (
                  <button key={id}
                   onClick={() => {
                    handleChoosenGenre(id);
                  }}
                   className={`p-2 ${clicked ? 'bg-[red]' : 'bg-primary'} rounded-md`}>{name}</button>                    
                )
             })
            }
          </div>
          <div className="pt-3 px-3 font-bold"><h2>Type : </h2></div>
          <div className="w-full flex gap-3 flex-wrap p-2 text-PrimaryTextClr">
             {mediaType.map(({id, name, clicked}) => {
              return (
                <button key={id} onClick={() => handleChoosenMediaType(id)} className={`p-2 ${clicked ? 'bg-[red]' :  'bg-primary'} rounded-md`}>{name}</button>
              )
             })}
          </div>

          </div>}

        </div>
        </section>
     
        {/* render search results*/}
        <SearchPageResults {...themeAndClickedMediaType}/>
        
      </div>
    </div>
   </>
  );
};
