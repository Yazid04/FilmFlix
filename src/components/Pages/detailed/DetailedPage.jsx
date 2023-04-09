import React from "react";
import { MovieDetailPageProvider } from "./detailsPageContext";
import {Content} from './Content'
import { useGlobalContext } from "../../context/context";

export const DetailedPage = () => {

  const {theme} = useGlobalContext();

  return (
    <>
      <MovieDetailPageProvider>
        <Content theme={theme} />
      </MovieDetailPageProvider>
    </>
  );
};

