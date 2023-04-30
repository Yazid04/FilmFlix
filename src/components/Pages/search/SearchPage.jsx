import React from 'react';
import { SearchPageProvider } from './searchPageContext';  
import { SearchPageContent } from './SearchPageContent';


export const SearchPage = () => {
  return (
    <SearchPageProvider>
      <SearchPageContent />
    </SearchPageProvider>
  );
};