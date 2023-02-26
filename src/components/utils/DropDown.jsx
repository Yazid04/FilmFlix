import React, { useId } from "react";
import { useState, useEffect } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

export const DropDown = () => {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false);
  const [genre, setGenre] = useState("All");
  const [genres, setGenres] = useState(null);
  const API_KEY = "ae47695d0d81bdec0747a63eb0a9b7b6";

  const getGenres = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    const { genres } = await response.json();
    return setGenres(genres);
  };

  function handleGenres(id) {
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
  }, []);

  return (
    <div className="relative bg-[white] py-2 px-2 rounded-sm mr-[0.10rem] font-bold border-r-SecondaryTextClr justify-between items-center hidden md:flex">
      {genre}
      <span
        className="cursor-pointer text-xl"
        onClick={() => setIsOpenDropDown(!isOpenDropDown)}
      >
        {!isOpenDropDown ? <IoMdArrowDropdown /> : <IoMdArrowDropup />}
      </span>
      {isOpenDropDown && (
        <div className="absolute top-[1.3rem] translate-y-[1.3rem] left-0 translate-x-0 bg-[white] w-40 h-64 overflow-y-auto">
         <ul>
            <li
              className="p-2 cursor-pointer hover:transition-all duration-75 hover:bg-hoverbg hover:text-PrimaryTextClr"
              onClick={() => handleGenres(useId)}        
            >
              <a href="#">All</a>
            </li>
            {genres.map((genre) => {
              const { name, id } = genre;
              return (
                <li
                  className="p-2 cursor-pointer hover:transition-all duration-75 hover:bg-hoverbg hover:text-PrimaryTextClr"
                  key={id}
                  onClick={() => handleGenres(id)}
                >
                  <a href="#">{name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
