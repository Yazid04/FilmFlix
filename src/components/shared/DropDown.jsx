import React, { useCallback, useId } from "react";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { useGlobalContext } from "../context/context";

export const DropDown = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [genre, setGenre] = useState("All");
  const [genres, setGenres] = useState(null);
 const {theme} = useGlobalContext();
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY

  const getGenres = useCallback(async () => {
    try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      if(!response.ok){
        throw new Error('Network response was not ok');
      }
      const { genres } = await response.json();
      return setGenres(genres);
    }
    catch(error){
      console.error('Error fetching trending movies:', error);
    }
  },[API_KEY])

 
  const handleGenres = (id) => {
    const selectedGenre = genres.filter((genre) => {
      return genre.id === id;
    });
    if (selectedGenre.length > 0) {
      setGenre(selectedGenre.map((n) => n.name));
    } else if (selectedGenre.length === 0) {
      setGenre("All");
    }
    setIsOpenDropDown(false);
  }

  useEffect(() => {
    getGenres();
  }, [getGenres]);

  return (
    <div className={`relative py-2 px-2 bg-primary text-PrimaryTextClr rounded-sm mr-[0.10rem] font-bold border-r-SecondaryTextClr justify-between items-center hidden md:flex`}>
      {genre}
      <span
        className="cursor-pointer text-xl"
        onClick={() => setIsOpenDropDown(!isOpenDropDown)}>
        {!isOpenDropDown ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </span>
      {isOpenDropDown && (
        <div className={`absolute top-[1.3rem] translate-y-[1.3rem] left-0 translate-x-0  bg-primary w-40 h-64 overflow-y-auto`}>
         <ul>
            <li
              className={`py-2 mt-1 mx-1 rounded-md cursor-pointer hover:transition-all duration-75  ${theme === 'light' ? 'text-PrimaryTextClr hover:text-[green]' : ''} hover:bg-hoverbg hover:text-PrimaryTextClr`}
              onClick={() => handleGenres(useId)}        
            >
              <button className="px-1">All</button>
            </li>
            {genres.map((genre) => {
              const { name, id } = genre;
              return (
                <li
                  className={`${theme === 'light' ? 'text-PrimaryTextClr hover:text-[green]' : ''}  hover:bg-hoverbg hover:text-PrimaryTextClr py-2 mx-1 rounded-md cursor-pointer hover:transition-all duration-[50ms]`} 
                  key={id}
                  onClick={() => handleGenres(id)}
                >
                  <button className="px-1">{name}</button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
