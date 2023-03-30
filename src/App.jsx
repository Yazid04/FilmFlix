import React from "react";
import { HomePage } from "./components/Pages/home/HomePage";
import { ErrorPage } from "./components/Pages/error/ErrorPage";
import { DetailedPage } from './components/Pages/detailed/DetailedPage'
import { SearchPage } from "./components/Pages/search/SearchPage";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<DetailedPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;


// 'sm': FROM >= '640px'
// 'md': FROM >= '768px',
// 'lg': FROM >= '1024px',
// 'md-lg': FROM >= "900px",
// 'xl': FROM >= '1280px',
// '2xl' FROM >=: '1536px',

