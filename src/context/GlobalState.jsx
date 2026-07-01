/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useEffect } from "react";

// 1. Creating the Context
export const GlobalContext = createContext();

// 2. Creating the Provider that will wrap the entire application
export const GlobalProvider = ({ children }) => {
  // A smart function to read data stored in the browser when the application is launched for the first time.
  // If it doesn't find any stored data, it starts with an empty array []
  const getInitialWatchlist = () => {
    const localData = localStorage.getItem("watchlist");
    return localData ? JSON.parse(localData) : [];
  };

  const getInitialWatched = () => {
    const localData = localStorage.getItem("watched");
    return localData ? JSON.parse(localData) : [];
  };

  // Setting the initial state based on data retrieved from Local Storage.
  const [watchlist, setWatchlist] = useState(getInitialWatchlist);
  const [watched, setWatched] = useState(getInitialWatched);

  // Updating the Local Storage automatically whenever the watchlist array changes.
  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  // Updating the Local Storage automatically whenever the watched array changes.
  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);

  // A function to add a movie to the watchlist.
  const addMovieToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  // A function to remove a movie from the watchlist.
  const removeMovieFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== id));
  };

  // A function to add a movie to the watched list.
  const addMovieToWatched = (movie) => {
    removeMovieFromWatchlist(movie.imdbID);
    if (!watched.some((m) => m.imdbID === movie.imdbID)) {
      setWatched([...watched, movie]);
    }
  };

  // A function to move a movie from the watched list back to the watchlist.
  const moveToWatchlist = (movie) => {
    setWatched(watched.filter((m) => m.imdbID !== movie.imdbID));
    addMovieToWatchlist(movie);
  };

  // A function to remove a movie from the watched list.
  const removeFromWatched = (id) => {
    setWatched(watched.filter((movie) => movie.imdbID !== id));
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist,
        watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
