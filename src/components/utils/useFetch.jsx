import React, { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if(!response.ok){
          setError(true);
          setIsLoading(false);
          throw new Error('Network response was not ok');
        }
        const { results } = await response.json();
        setData(await results);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        console.log('error occured while fetching, using catch (try/catch) : ' + error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
