import { useState, useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const Add = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // 1. Adding a new state to determine whether the application is currently loading.
  const [isLoading, setIsLoading] = useState(false);
  // 2. Adding a state to store error messages coming from the server (e.g., movie not found).
  const [errorMessage, setErrorMessage] = useState("");

  const { addMovieToWatchlist, watchlist } = useContext(GlobalContext);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 2) {
      setIsLoading(true); // Activate the loading indicator immediately upon initiating the request.
      setErrorMessage(""); // Clear any previous error message

      fetch(`https://www.omdbapi.com/?s=${value}&apikey=1777169e`)
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false); // Stop the loading indicator as soon as the data arrives.

          if (data.Response === "True" && data.Search) {
            setResults(data.Search);
          } else {
            setResults([]);
            // If the server returns an error (such as "Movie not found"), we store it here.
            setErrorMessage(data.Error || "No results found");
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setIsLoading(false); // Stop the loading indicator even if a network error occurs
          setErrorMessage("Network error. Please try again.");
        });
    } else {
      setResults([]);
      setIsLoading(false);
      setErrorMessage("");
    }
  };

  return (
    <div className="add-page">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* 1. Loading state: Appears only when the network is waiting for the API response. */}
      {isLoading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Searching for movies...</p>
        </div>
      )}

      {/* 2. Error state: Appears if the server doesn't find the movie, or if the network connection is lost */}
      {!isLoading && errorMessage && (
        <div className="error-message-box">
          <p>{errorMessage}</p>
        </div>
      )}

      {/* 3. Results display state: Appears only when the loading is complete and there are movies to display */}
      {!isLoading && results.length > 0 && (
        <ul className="results-list">
          {results.map((movie) => {
            const storedMovie = watchlist.find(
              (o) => o.imdbID === movie.imdbID,
            );
            const watchlistDisabled = storedMovie ? true : false;

            return (
              <li key={movie.imdbID} className="result-card">
                <div className="poster-wrapper">
                  {movie.Poster !== "N/A" ? (
                    <img src={movie.Poster} alt={movie.Title} />
                  ) : (
                    <div className="filler-poster">No Image</div>
                  )}
                </div>
                <div className="movie-info">
                  <h3 className="movie-title">{movie.Title}</h3>
                  <span className="movie-year">{movie.Year}</span>
                  <button
                    className="add-watchlist-btn"
                    disabled={watchlistDisabled}
                    onClick={() => addMovieToWatchlist(movie)}
                  >
                    {watchlistDisabled ? "Added!" : "+ Add to Watchlist"}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Add;
