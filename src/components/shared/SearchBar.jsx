import React, { useRef } from "react";
import { useGlobalContext } from "../context/context";
import { AiOutlineSearch } from "react-icons/ai";
import { DropDown } from "./DropDown";

export const SearchBar = () => {
  const { setQuery, theme } = useGlobalContext();
  const searchValue = useRef("");

  function searchMovie() {
    setQuery(searchValue.current.value);
  }

  return (
    <>
      <div className={`relative flex justify-center items-center max-w-4xl mx-auto`}>
      <DropDown />
        <input
          className={`w-full px-3 py-2  ${theme === 'dark' ? 'focus:shadow-3xl text-[#000]' : 'focus:shadow-4xl bg-cardsBg text-PrimaryTextClr'} outline-none rounded-sm focus:shadow-2xl`}
          type="text"
          placeholder="Search for a show/movie"
          ref={searchValue}
          onChange={searchMovie}
        />
        <div className={`${theme === 'light' && 'text-PrimaryTextClr'} absolute cursor-text top-2/4 -translate-y-2/4 right-[1%] -translate-x-[1%] text-2xl`}>
          <AiOutlineSearch />
        </div>
      </div>
    </>
  );
};
