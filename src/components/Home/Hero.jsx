import React from "react";
import { SearchBar } from "../utils/SearchBar";

export const Hero = () => {
  return (
    <>
      <div className="block z-20 relative w-4/5 mx-auto pt-10 md-lg:hidden">
        <SearchBar />
      </div>
    </>
  );
};


