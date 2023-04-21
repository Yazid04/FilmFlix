import React, {useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, } from "react-icons/io5";
import { Sidebar } from "./Sidebar";
import { FaSun, FaMoon, FaArrowRight } from "react-icons/fa";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const bodyElm = document.querySelector("body");
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const { logoText, theme, isDarkMode, isSpinning, handleModeToggle } = useGlobalContext();

  return (
    <>
      <div className={`fixed top-0 w-full z-30 shadow-customShadow font-sourceSansPro`}>
        <section
          className={`${theme === 'dark' ? 'bg-navbar text-logoText' : 'bg-primaryLight text-primaryTextLight'} font-sourceSansPro relative flex justify-between md-lg:justify-between py-5 px-7 max-w-[85rem] mx-auto`}
        >
          {/*background overlay*/}
          <div
            className={`absolute inset-0 z-40 w-full h-screen bg-transparent ${
              isSideBarOpen ? "block" : "hidden"
            } `}
          ></div>

          {/*sideBar*/}
          <main
            className={`sidebar-container w-[20rem] ${theme === 'dark' ? 'bg-primary' : 'bg-primaryLight'} absolute top-0 left-0 h-screen z-40 lg:-translate-x-0 lg:w-full lg:h-min  
${
  isSideBarOpen
    ? `${bodyElm.classList.add(
        "stop-body-scroll"
      )} stop-scroll transition-all duration-500 translate-x-0 lg:top-0`
    : `${bodyElm.classList.remove(
        "stop-body-scroll"
      )} transition-all duration-500 -translate-x-[20rem] lg:-top-36`
} `}
          >
            <aside className={`${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'} relative`}>
              <div className="w-full bg-[#000] flex justify-end lg:justify-start px-2">
                <div
                  className={`cursor-pointer h-20 text-2xl w-min py-[22px] px-4 text-PrimaryTextClr`}
                  onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                >
                  <IoClose />
                </div>
              </div>
              <Sidebar />
            </aside>
          </main>

          {/*logo*/}
          <main className={`flex items-center`}>
            <div
              className={`text-2xl mr-5 cursor-pointer ${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'} font-bold`}
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            >
              <RxHamburgerMenu />
            </div>
            <Link to={`/`}> 
            <h1
              className={`text-xl font-bold bg-red ${theme === 'dark' ? 'text-logoText' : 'text-primaryTextLight'} px-2 rounded 
              ${isSideBarOpen ? "z-0" : "z-20"}`}
              >
              {logoText}
            </h1>
            </Link>
            <div className={`gap-8 ml-10 font-bold ${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'} hidden md:flex`}>
              <Link to={`/search`}>
              <p>TV Shows</p>
              </Link>
              <Link to={`/search`}>
              <p>Movies</p>
              </Link>
              <Link to={`/search`}>
               <p>Search</p>
              </Link>
            </div>
            <div className="flex items-center text-PrimaryTextClr md:hidden">
              <Link to={`/search`} className={`ml-5 font-bold flex gap-2 items-center cursor-pointer ${theme === 'dark' ? 'text-PrimaryTextClr' : 'text-primaryTextLight'}`}>
               <p>Search</p>
              <FaArrowRight />
              </Link>
            </div>
          </main>

          {/*change theme option*/}
          <div className="flex font-bold items-center">
            <button
              onClick={(e) => handleModeToggle(e)}
              className={`${isDarkMode ? 'dark' : 'light'} inline-flex rounded-md text-2xl shadow-sm px-4 py-2 text-white
              ${isSpinning ? "animate-spin" : ""}`}
            >
              {isDarkMode ? <FaMoon /> : <FaSun />}
            </button>
          </div>
        </section>
      </div>
    </>
  );
};

