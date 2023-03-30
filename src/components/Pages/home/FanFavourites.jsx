import React from "react";
import { useHorizontalCardList } from "../../utils/useHorizontalCardList";
import { useHomeContext } from "./HomeContext";
import useFetch from "../../utils/useFetch";
import { useSectionHeader } from "../../utils/useSectionHeader"; 

export const FanFavourites = () => {  
  const { API_KEY } = useHomeContext();
  const { data } = useFetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);

  return (
    <main className="max-w-[80rem] mx-auto my-10 px-5">
      {useSectionHeader('Fan Favourites')}
      {useHorizontalCardList(data, true)}
    </main>
  );
};