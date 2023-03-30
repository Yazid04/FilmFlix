import React from "react";
import { useGlobalContext } from "../context/context";

export const useSectionHeader = (headerText) => {
  const { theme } = useGlobalContext();

  return (
    <div className="flex my-4">
      <div className={`border-l-4 ${theme === "dark" ? "border-logoText" : "border-l-primaryTextLight"
        } rounded-full w-[0.1x] h-10 mr-2`}></div>
      <h1 className={`font-bold text-3xl mr-2 ${theme === "dark" ? "text-PrimaryTextClr" : "text-primaryTextLight"
        } `}>
        {headerText}
      </h1>
    </div>
  );
};
