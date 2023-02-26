import React, { useState } from "react";
import { useId } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { MdLocalMovies } from "react-icons/md";
import { IoTvSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { CgCommunity } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { BiHelpCircle, BiLogOutCircle } from "react-icons/bi";
import { SearchBar } from "../utils/SearchBar";

export const Navbar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const bodyElm = document.querySelector('body');

  const navLinks = [
    {
      id: useId(),
      title: "Home",
      icon: <AiFillHome />,
    },
    {
      id: useId(),
      title: "Movies",
      icon: <MdLocalMovies />,
    },
    {
      id: useId(),
      title: "Tv Shows",
      icon: <IoTvSharp />,
    },
    {
      id: useId(),
      title: "Community",
      icon: <CgCommunity />,
    },
    {
      id: useId(),
      title: "Settings",
      icon: <CiSettings />,
    },
    {
      id: useId(),
      title: "Help",
      icon: <BiHelpCircle />,
    },
    {
      id: useId(),
      title: "logout",
      icon: <BiLogOutCircle />,
    },
  ];


  return (
    <>
      {/*all nav elements & SideNavBar*/}
      <div className="w-full bg-navbar">
        <section
          className={`relative flex justify-between md-lg:justify-between py-5 px-7 text-logoText bg-navbar max-w-[85rem] mx-auto`}
        >
          {/*invisible background*/}
          <div
            className={`absolute inset-0 z-40 w-full bg-transparent ${
              isSideBarOpen ? "block" : "hidden"
            } `}
          ></div>

          {/*sideBar*/}
          <main 
            className={`sidebar-container absolute w-[20rem] bg-primary top-0 left-0 h-screen z-40 md-lg:w-full md-lg:h-min  
        ${
          isSideBarOpen
            ? `${bodyElm.classList.add("stop-body-scroll")} stop-scroll transition-all duration-500 translate-x-0 md-lg:translate-y-0 `
            : `${bodyElm.classList.remove("stop-body-scroll")} transition-all duration-500 -translate-x-full md-lg:-translate-y-full`
        } `}
          >
            <aside className="text-PrimaryTextClr relative">
              <div className="w-full bg-[#000] flex justify-end">
                <div
                  className={`cursor-pointer text-2xl w-min py-[22px] px-4`}
                  onClick={() => setIsSideBarOpen(!isSideBarOpen)}
                >
                  <IoClose />
                </div>
              </div>
              <nav>
                <ul
                  className={`block md-lg:flex md-lg:justify-center md-lg:items-center md-lg:mx-auto md-lg:px-10`}
                >
                  {navLinks.map((link) => {
                    const { id, icon, title } = link;
                    return (
                      <li
                        key={id}
                        className={`flex w-full justify-start px-5 py-4 items-center`}
                      >
                        {icon}
                        <button
                          href="#"
                          className="border-none bg-[none] ml-5 relative py-1 after:h-[3px] after:w-0 after:absolute after:bg-[#f5f5f5] after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300  after:rounded"
                        >
                          {title}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </aside>
          </main>

          {/*logo*/}
          <main className={`flex items-center`}>
            <div
              className={`text-2xl mr-5 cursor-pointer`}
              onClick={() => setIsSideBarOpen(!isSideBarOpen)}
            >
              <RxHamburgerMenu />
            </div>
            <h1
              className={`text-xl font-bold bg-red text-PrimaryTextClr px-2 rounded 
          ${isSideBarOpen ? "z-0" : "z-20"}`}
            >
              Filmer
            </h1>
          </main>

          {/*search input (conditionally rendered) for larger screens*/}
          <section className={`hidden w-2/4 z-10 md-lg:block`}>
            <SearchBar />
          </section>

          {/*signing options*/}
          <main className={`flex font-bold items-center`}>
            <li className="list-none">
              <button className="border-none bg-[none]" href="#">Sign in </button>
            </li>
            <li className="list-none ml-5">
              <a href="#">Sign out</a>
            </li>
          </main>
        </section>
      </div>
    </>
  );
};
