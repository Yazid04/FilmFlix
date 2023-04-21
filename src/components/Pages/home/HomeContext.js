import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
const HomeContext = createContext();

const HomeProvider = ({ children }) => {
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const [loading, setLoading] = useState(true);
  const [trending, setTrending] = useState(null);
  const [nowPlaying, setNowPlaying] = useState(null);
  const [movieIds, setMovieIds] = useState(null);
  const [toggle, setToggle] = useState({
    toggleToday: false,
    toggleWeekly: true,
  });
  

  function handleToggle(e) {
    const text = e.target.textContent;
    if (text === "Today") {
      setToggle((prev) => {
        return { ...prev, toggleToday: true, toggleWeekly: false };
      });
    } else if (text === "This Week") {
      setToggle((prev) => {
        return { ...prev, toggleWeekly: true, toggleToday: false };
      });
    }
  }

  const ENDPOINT_TRENDING = `https://api.themoviedb.org/3/trending/all/${
    toggle.toggleToday ? "day" : "week"}?api_key=${API_KEY}`;
  const getTrendingMovies = useCallback(async () => {
      try {
        setLoading(true);
        const response = await fetch(ENDPOINT_TRENDING);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setTrending(results);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      } finally {
        setLoading(false);
      }
  }, [ENDPOINT_TRENDING]);


  const ENDPOINT_NOWPLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`;
  const getNowPlayingMovies = useCallback(async () => {
    try{
      const response = await fetch(ENDPOINT_NOWPLAYING);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { results } = await response.json();
      setMovieIds(results?.map(movie => movie.id));
      return setNowPlaying(await results);
    }
    catch(error){
      console.error('Error fetching Now playing movies:', error);
    }
  }, [ENDPOINT_NOWPLAYING]);



  useEffect(() => {
    getNowPlayingMovies();
  }, [getNowPlayingMovies]);
  

  useEffect(() => {
    getTrendingMovies();
  }, [getTrendingMovies]);


  useEffect(() => {
    getTrendingMovies();
  }, [toggle, getTrendingMovies]);


  return (
    <HomeContext.Provider
      value={{
        trending,
        loading,
        handleToggle,
        toggle,
        nowPlaying,
        movieIds,
        API_KEY,
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

const useHomeContext = () => {
  return useContext(HomeContext);
};

export { useHomeContext, HomeProvider };
