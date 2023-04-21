import React from "react";
import { MovieDetailPageProvider } from "./detailsPageContext";
import {Content} from './Content'
import { useGlobalContext } from "../../context/context";
import { useParams } from "react-router-dom";

export const DetailedPage = () => {
  const {media_type} = useParams();
  const {theme} = useGlobalContext();
  
  const themesAndMediaType = {
    mediaType: media_type,
    theme: theme,
  };


  return (
    <>
      <MovieDetailPageProvider>
        <Content {...themesAndMediaType} />
      </MovieDetailPageProvider>
    </>
  );
};
