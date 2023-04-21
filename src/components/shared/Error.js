import React from "react";
import { Link } from "react-router-dom";
import {BsArrowRight} from 'react-icons/bs'
import { useGlobalContext } from "../context/context";

export const Error = () => {
  const {theme} = useGlobalContext();
    return (
      <div className={`text-PrimaryTextClr font-sourceSansPro ${theme === 'dark' ? 'bg-primary' : 'bg-primaryLight'} text-center w-min h-44 grid place-content-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}>
      <h1 className={`text-2xl w-64 ${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'} md:w-[30rem] md:text-4xl`}>Something weng wrong {':('}</h1>
      <Link to={'/'}> 
       <div className="flex gap-3 h-10 mt-5 items-center justify-center transition-all hover:gap-x-7">
        <div className="text-logoText grid place-content-center text-md h-[inherit] md:text-xl">
          <p className="w-full h-full">Back to home page</p>
        </div>
        <div className={`grid text-logoText place-content-center mt-1 text-xl`}>
         <BsArrowRight className={`transition-all h-full w-full ${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-logoText'}`} />
        </div>
       </div>
      </Link>
    </div>
  );
}