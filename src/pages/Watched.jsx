import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";
import MovieCard from "../components/MovieCard";

const Watched = () => {
  // Retrieve the array of watched movies from the context.
  const { watched } = useContext(GlobalContext);

  return (
    <div className="page-container">
      {/* Top section: Title and counter for watched movies.*/}
      <div className="page-header">
        <h2 className="page-title">Watched Movies</h2>
        <span className="movies-count">
          {watched.length} {watched.length === 1 ? "Movie" : "Movies"}
        </span>
      </div>

      {/* Results display: Show movies if the array contains items */}
      {watched.length > 0 ? (
        <div className="movies-grid">
          {watched.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} type="watched" />
          ))}
        </div>
      ) : (
        <p className="no-movies">
          No movies watched yet! Add some from your watchlist.
        </p>
      )}
    </div>
  );
};

export default Watched;
