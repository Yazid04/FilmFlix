import React from "react";
import { useId } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { SearchBar } from "./SearchBar";


export const Sidebar = () => {
  const genres = [
    {
      id: useId(),
      name: "Science fiction",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 2",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 3",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 4",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 5",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 6",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 7",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 8",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 9",
      icon: <AiOutlinePlus />,
    },
    {
      id: useId(),
      name: "Genre 10",
      icon: <AiOutlinePlus />,
    },
  ];
  return (
    <div className="hidden md:block text-PrimaryTextClr">
      <section className="flex justify-center items-center py-3">
        <div className="mr-4 bg-[#f5f5f5] px-3 py-1 rounded-2xl">
          <div className="text-[#000] font-bold">S</div>
        </div>
        <div className="">
          <h2>Yazid Mohammed Ali</h2>
          <p className="text-xs">yazidramadan04@gmail.com</p>
        </div>
      </section>
      <section className="flex flex-col justify-between text-center py-3 h-fit">
        <div className="relative text-[#000]">
          <SearchBar />
        </div>
        <div className="grid grid-cols-2 grid-rows-5 py-3 ml-1">
          {genres.map((genre) => {
            const { id, name, icon } = genre;
            return (
              <div key={id} className="mx-[5px]">
                <p className="bg-navbar text-[15px] w-full px-1 py-2 flex justify-between items-center cursor-pointer text-PrimaryTextClr rounded-xl mb-5">
                  {name}
                  {icon}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
