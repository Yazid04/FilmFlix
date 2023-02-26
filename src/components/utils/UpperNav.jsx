import React from 'react'
import { Link } from "react-router-dom";
import { IoMdNotifications } from "react-icons/io";
import { RiWirelessChargingFill } from "react-icons/ri";


export const UpperNav = () => {
  return (
    <section className="hidden md:flex p-3 shadow-customShadow">
      <main className="flex flex-1">
        <div className="mr-7">
          <Link to={"/"}>Home</Link>
        </div>
        <div className="mr-7 cursor-pointer">
          <Link to={"/Movies"}>Movies</Link>
        </div>
        <div className="cursor-pointer">
          <Link to={"/shows"}>Tv Shows</Link>
        </div>
      </main>
      <main className="flex flex-1 justify-end items-center">
        <div className="ml-7">
          <IoMdNotifications />
        </div>
        <div className="ml-7">
          <RiWirelessChargingFill />
        </div>
      </main>
    </section>
  )
}
