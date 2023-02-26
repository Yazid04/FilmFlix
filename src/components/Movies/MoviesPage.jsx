import React from "react";
import { Sidebar } from "../utils/Sidebar";
import { UpperNav } from "../utils/UpperNav";


export const MoviesPage = () => {
  return (
    <>
      <div className="hidden md:flex">
        <div className="flex-[65%]  bg-navbar h-screen text-PrimaryTextClr">
          <UpperNav />
          <h1 className="block">Movies</h1>
        </div>
        <div className="flex-[35%] bg-primary h-screen md:max-w-xs">
          <Sidebar />
        </div>
      </div>
    </>
  );
};
