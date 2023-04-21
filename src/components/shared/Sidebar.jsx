import React, { useId } from "react";
import { MdLocalMovies } from "react-icons/md";
import { IoTvSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { CgCommunity } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { BiHelpCircle, BiLogOutCircle } from "react-icons/bi";
import { useGlobalContext } from "../context/context";
import { Link } from "react-router-dom";

export const Sidebar = () => {
const {theme} = useGlobalContext();

  const navLinks = [
  
    {
      id: useId(),
      title: "Home",
      navLink: '/',
      icon: <AiFillHome />,
    },
    {
      id: useId(),
      title: "Movies",
      navLink: '/search',
      icon: <MdLocalMovies />,
    },
    {
      id: useId(),
      title: "Tv Shows",
      navLink: '/search',
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
    <nav>
    <ul
      className={`block font-sourceSansPro lg:flex lg:justify-center lg:items-center lg:mx-auto lg:px-0`}
    >
      {navLinks.map((link) => {
        const { id, icon, title, navLink } = link;
        return (
          <li
            key={id}
            className={`flex w-full justify-start px-5 py-4 items-center`}>
            {icon}
            <Link to={`${navLink}`}>
            <button
              href="#"
              className={`border-none bg-[none] ml-5 relative py-1 after:h-[3px] after:w-0 after:absolute after:bg-[#f5f5f5] after:left-0 after:bottom-0 hover:after:w-full after:transition-all after:duration-300 after:rounded hover:after:bg-[black] ${theme === 'dark' ? 'hover:after:bg-bgWhite' : 'hover:after:bg-navbar'} `}
            >
              {title}
            </button>
            </Link>
          </li>
        );
      })}
    </ul>
  </nav>
  );
};
