import React from "react";
import { MdOutlineCloudOff } from "react-icons/md";
import { Link } from "react-router-dom";


export const ErrorPage = () => {
  return (
    <article className="w-full h-screen grid place-items-center bg-navbar">
      <main className="text-[#f5f5f5] flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold md:text-5xl">Opps, it's a dead end :(</h1>
        {<MdOutlineCloudOff className="my-3 text-9xl"/>}
        <Link to={'/'}>Back to Home Page.</Link>
      </main>
    </article>
  );
};