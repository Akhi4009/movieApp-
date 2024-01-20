import WatchedMovie from "./WatchedMovie"

function WatchedMovieList({watched,onDeleteWatched}){
    return(
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie 
      movie={movie}
      onDeleteWatched={onDeleteWatched}
      key={movie.imdbId}
      />
    ))}
  </ul>
  )
  }

  export default WatchedMovieList;
