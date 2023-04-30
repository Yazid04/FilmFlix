import React from "react";
import { useHomeContext } from "./HomeContext";
import { useHorizontalCardList } from "../../utils/useHorizontalCardList";
import { useSectionHeader } from "../../utils/useSectionHeader";
import { useGlobalContext } from "../../context/context";

export const Trending = () => {
  const { trending, handleToggle, toggle } = useHomeContext();
  const {theme} = useGlobalContext();
  return (
    <>
    <main className="max-w-[80rem] mx-auto my-10">
      <div className="py-5 px-5 mx-auto">
        <div className="flex items-center justify-center max-w-xl mx-auto md:mx-0 md:justify-start">
          {useSectionHeader('Trending')}
          <div className={`flex relative justify-between rounded-3xl w-4/5 overflow-hidden font-bold ${theme === 'dark' ? 'bg-bgWhite text-SecondaryTextClr' : 'bg-primary text-PrimaryTextClr '} max-w-xs`}>
            <div
              type="button"
              onClick={handleToggle}
              className="grid place-content-center w-full cursor-pointer px-3 py-1"
            >
              Today
            </div>
            <div
              type="button"
              onClick={handleToggle}
              className="grid place-content-center cursor-pointer text-center w-full px-3 py-1"
            >
              This Week
            </div>
            <div
              className={`text-sm absolute grid place-content-center ${theme === 'dark' ? 'text-PrimaryTextClr' : 'bg-[#4caf50] text-primaryTextLight'} top-0 
              ${
                toggle.toggleWeekly ? "left-2/4 right-0" : "left-0 right-2/4"
              } bottom-0 rounded-3xl transition-all duration-300 ${theme === 'dark' ? 'bg-[red]' : 'bg-primaryLight' }`}>
              {toggle.toggleToday ? "Today" : "This Week"}
            </div>
          </div>
        </div>
      </div>
      <div className={`border-SecondaryTextClr h-min ${theme === 'dark' ? 'bg-primary' : 'bg-primaryLight'} overflow-hidden px-5 mx-auto flex`}>
        {useHorizontalCardList(trending, true)}
      </div>
    </main>
    </>
  );
};
