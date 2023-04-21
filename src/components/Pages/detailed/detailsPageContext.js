import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";


const DetailsPageContext = createContext();
const MovieDetailPageProvider = ({ children }) => {
  const [movieDetails, setMovieDetails] = useState([]);
  const [trailerData, setTrailerData] = useState([]);
  const [movieCredits, setMovieCredits] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { id, media_type } = useParams();
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  
  
  const videoEndpoint =        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`   
  const movieDetailEndpoint =  `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`;
  const movieCreditsEndpoint = `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`


  const fetchMovieData = useCallback(async () => {
    try {
      setIsLoading(true);
  
      const [trailerResponse, detailResponse, creditsResponse] = await Promise.all([
        fetch(videoEndpoint),
        fetch(movieDetailEndpoint),
        fetch(movieCreditsEndpoint)
      ]);
  
      if (!trailerResponse.ok || !detailResponse.ok || !creditsResponse.ok) {
        setHasError(true);
        throw new Error('Network response was not ok');
      }
  
      const [trailerData, detailData, creditsData] = await Promise.all([
        trailerResponse.json(),
        detailResponse.json(),
        creditsResponse.json()
      ]);
  
      setTrailerData(trailerData.results.filter((trailer) => trailer.type === 'Trailer'));
      setMovieDetails(detailData);
      setMovieCredits(creditsData);
    } catch (error) {
      console.error('Error fetching movie details: ', error);
    } finally {
      setIsLoading(false);
    }
  },[videoEndpoint, movieDetailEndpoint, movieCreditsEndpoint]);
  
  useEffect(() => {
    fetchMovieData();
  }, [fetchMovieData])
 
  return ( 
     <DetailsPageContext.Provider 
       value={{
        movieDetails,
        isLoading,
        hasError, 
        trailerData,
        movieCredits,
    }}
     >
      {children}
   </DetailsPageContext.Provider>
  )
};


const useMovieDetailsContext = () => {
  return useContext(DetailsPageContext);
};

export { useMovieDetailsContext, MovieDetailPageProvider };
