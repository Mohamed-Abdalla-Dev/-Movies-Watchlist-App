import { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const MovieCard = ({ movie, type }) => {
  // Retrieve all available control functions from the context.
  const {
    removeMovieFromWatchlist,
    addMovieToWatched,
    moveToWatchlist,
    removeFromWatched,
  } = useContext(GlobalContext);

  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} className="movie-poster" />

      <div className="card-overlay">
        <div className="controls-container">
          {/*Control for the default Watchlist page*/}
          {type !== "watched" && (
            <>
              <button
                className="ctrl-btn watch-btn"
                title="Mark as Watched"
                onClick={() => addMovieToWatched(movie)}
              >
                👁
              </button>
              <button
                className="ctrl-btn delete-btn"
                title="Remove from Watchlist"
                onClick={() => removeMovieFromWatchlist(movie.imdbID)}
              >
                ✕
              </button>
            </>
          )}

          {/*Control for the Watched page only*/}
          {type === "watched" && (
            <>
              <button
                className="ctrl-btn watch-btn"
                title="Move back to Watchlist"
                onClick={() => moveToWatchlist(movie)}
              >
                👁‍🗨
              </button>
              <button
                className="ctrl-btn delete-btn"
                title="Remove from Watched"
                onClick={() => removeFromWatched(movie.imdbID)}
              >
                ✕
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
