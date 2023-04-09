import React from "react";
import { HomePage } from "./components/Pages/home/HomePage";
import { ErrorPage } from "./components/Pages/error/ErrorPage";
import { DetailedPage } from './components/Pages/detailed/DetailedPage'
import { SearchPage } from "./components/Pages/search/SearchPage";
import { Route, Routes } from "react-router-dom";
import { useGlobalContext } from "./components/context/context";


function AppWrapper() {
  const { theme } = useGlobalContext();
  return (
    <div
      style={{
        backgroundColor: theme === "light" ? "#F0FFF0" : "#1A171E",
      }}>
      <App />
    </div>
  );
}



function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<DetailedPage />} />
        <Route path="/Search" element={<SearchPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default AppWrapper;


// 'sm': FROM >= '640px'
// 'md': FROM >= '768px',
// 'lg': FROM >= '1024px',
// 'md-lg': FROM >= "900px",
// 'xl': FROM >= '1280px',
// '2xl' FROM >=: '1536px',
// REACT_APP_TMDB_API_KEY ='ae47695d0d81bdec0747a63eb0a9b7b6'