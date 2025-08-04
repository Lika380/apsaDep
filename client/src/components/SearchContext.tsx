import React, { createContext, useContext, useState, ReactNode } from "react";

type SearchContextType = {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchActive: boolean;
  clearSearch: () => void;
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const isSearchActive = searchQuery.trim().length > 0;

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isSearchActive,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) throw new Error("useSearch must be used within SearchProvider");
  return context;
};
