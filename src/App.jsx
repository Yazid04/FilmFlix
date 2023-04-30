import React from "react";
import { Route, Routes } from "react-router-dom";
import { DetailedPage } from './components/Pages/detailed/DetailedPage'
import { SearchPage } from "./components/Pages/search/SearchPage";
import { useGlobalContext } from "./components/context/context";
import { ErrorPage } from "./components/Pages/error/ErrorPage";
import { HomePage } from "./components/Pages/home/HomePage";

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
        <Route path="/details/:media_type/:id" element={<DetailedPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default AppWrapper;