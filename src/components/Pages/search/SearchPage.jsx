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

// search by filters -- DONE
// navigate to search page using query from home page -- DONE 
// work on btns for media type and apply release date -- DONE
// fix navigating to details page from home -- DONE
// apply ability filter by genre -- DONE
// check search btn on search page && remove search from home -- DONE
// improve functions and detailed page UI -- DONE
// apply font EVERYWHERE && better comments -- DONE
// check theme, functionalities, responsivness, take SH's -- DONE
// remove warnings, then push changes!!! 