import React from "react";
import { MoviesPage } from "./components/Movies/MoviesPage";
import { HomePage } from "./components/Home/HomePage";
import { DiscussionPage } from "./components/Discuss/DiscussionPage";
import { ShowsPage } from "./components/Shows/ShowsPage";
import { ErrorPage } from "./components/Error/ErrorPage";
import { Route, Routes } from "react-router-dom";

// const API_KEY = 'ae47695d0d81bdec0747a63eb0a9b7b6';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/Shows" element={<ShowsPage />} />
        <Route path="/Movies" element={<MoviesPage />} />
        <Route path="/Discuss" element={<DiscussionPage />} />
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
