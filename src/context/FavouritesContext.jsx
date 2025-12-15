/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from 'react';

const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
  // Lazy Initialization to prevent the "set state in effect" error
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem('estate-favs');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Could not load favourites:", error);
      return [];
    }
  });

  // Save to local storage whenever favourites change
  useEffect(() => {
    localStorage.setItem('estate-favs', JSON.stringify(favourites));
  }, [favourites]);

  const addFavourite = (property) => {
    if (!favourites.some(fav => fav.id === property.id)) {
      setFavourites([...favourites, property]);
    }
  };

  const removeFavourite = (id) => {
    setFavourites(favourites.filter(fav => fav.id !== id));
  };

  const clearFavourites = () => {
    setFavourites([]);
  };

  return (
    <FavouritesContext.Provider value={{ favourites, addFavourite, removeFavourite, clearFavourites }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);