import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();
const AppProvider = ({ children }) => {  
  const logoText = 'FilmFlix';
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [theme, setTheme] = useState('dark')
 

  const handleModeToggle = (e) => {
    setIsSpinning(true);
    setIsDarkMode(!isDarkMode);
    const theme = e.currentTarget.classList[0];
    setTheme(theme);
    setTimeout(() => setIsSpinning(false), 350);
  };

  return (
    <AppContext.Provider
      value={{
        logoText,
        API_KEY,
        setTheme,
        handleModeToggle,
        isDarkMode,
        isSpinning,
        theme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { useGlobalContext, AppProvider };
