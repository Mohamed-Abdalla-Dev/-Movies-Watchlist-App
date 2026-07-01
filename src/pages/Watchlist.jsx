import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";

const Watchlist = () => {
  // Retrieve the array of movies in the watchlist from the context
  const { watchlist } = useContext(GlobalContext);

  return (
    <div className="page-container">
      <div className="page-header">
        <h2 className="page-title">My Watchlist</h2>
        {/* The actual counter reads from the length of the dynamic array.*/}
        <span className="movies-count">
          {watchlist.length} {watchlist.length === 1 ? "Movie" : "Movies"}
        </span>
      </div>

      {watchlist.length > 0 ? (
        <div className="movies-grid">
          {watchlist.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      ) : (
        <p className="no-movies">
          No movies in your list! Go search and add some.
        </p>
      )}
    </div>
  );
};

export default Watchlist;
