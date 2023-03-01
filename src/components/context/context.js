import React, { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US;

const AppProvider = ({ children }) => {
  const alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  const getRandomAlphabets = Math.round(Math.random() * alphabets.length - 1);
  const [query, setQuery] = useState(`${alphabets[getRandomAlphabets]}`);
  const [list, setList] = useState([]);

  const API_KEY = "ae47695d0d81bdec0747a63eb0a9b7b6";
  const getMovies = async () => {
    try {
      if(query.length < 1) return;
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=after&page=2
        &include_adult=true`
      );
      const data = await res.json();
      const {results} = data;
      setList(await results);
    } catch (error) {
    }
  }

  useEffect(() => {
    getMovies();
  }, [query])


  return (
    <AppContext.Provider
      value={{
        setQuery,
        list,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
