import React from 'react'
import {useParams} from 'react-router-dom'
//https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US

export const DetailedPage = () => {
    const {id} = useParams();
  return (
    <div className='text-PrimaryTextClr'>DetailedPage for: {id}</div>
  )
}
