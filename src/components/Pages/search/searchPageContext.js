import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import useFetch from "../../utils/useFetch";

const searchContext = createContext();
const SearchPageProvider = ({ children }) => {
  const GENRE_ID_FOR_GENRE_TYPE_ANY = 99999999;
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const [genreList, setGenreList] = useState([]);
  const [userFilters, setUserFilters] = useState({
    query: "",
    genreID: "",
    mediaType: "multi",
  });

  const { data, isLoading, error } = useFetch(
    `https://api.themoviedb.org/3/search/${
      userFilters.mediaType
    }?api_key=${API_KEY}&language=en-US&query=${
      userFilters.query.length === 0 ? "I" : userFilters.query
    }&page=1&include_adult=false`
  );

  
  // modify the response (add property of clicked with value a of false, and add a new object to the beginning and set name to 'Any' )
  const modifyResponse = useCallback(async () => {
    const getGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const { genres } = await response.json();
        return genres;
      } catch (error) {
        console.error("Error fetching genres for dropdown:", error);
      }
    };
  
    const response = await getGenres();
    // Add a new object at the beginning of the genresList array
    const updatedGenres = [
      { id: GENRE_ID_FOR_GENRE_TYPE_ANY, name: "Any", clicked: true },
      ...response,
    ];

    const updatedGenresWithClickedFalseByDefult = updatedGenres.map(
      (genre, index) => {
        if (index === 0) {
          return genre; // Keep the first object unchanged
        }
        return { ...genre, clicked: false }; // Set clicked to false for rest of the objects
      }
    );
    setGenreList(updatedGenresWithClickedFalseByDefult);
  
  }, [API_KEY])


  useEffect(() => {
    modifyResponse();
  }, [modifyResponse]);

  let filteredResponse;

  // check if user clicked the "Any" button
  if (parseInt(userFilters.genreID) === GENRE_ID_FOR_GENRE_TYPE_ANY) {
    filteredResponse = data;
  }
  // render the data raw when the component mounts
  else if (userFilters.genreID.length === 0) {
    filteredResponse = data;
  }
  // filter by the genre ID that the user clicked on
  else {
    filteredResponse = data.filter(
      (movie) => movie.genre_ids?.[0] === userFilters.genreID
    );
  }

  return (
    <searchContext.Provider
      value={{
        genreList,
        setGenreList,
        data,
        filteredResponse,
        isLoading,
        error,
        userFilters,
        setUserFilters,
      }}
    >
      {children}
    </searchContext.Provider>
  );
};

const useSearchMovieContext = () => {
  return useContext(searchContext);
};

export { useSearchMovieContext, SearchPageProvider };
