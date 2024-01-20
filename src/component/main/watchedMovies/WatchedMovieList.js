import WatchedMovie from "./WatchedMovie"

function WatchedMovieList({watched}){
    return(
    <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie movie={movie} key={movie.imdbId}/>
    ))}
  </ul>
  )
  }

  export default WatchedMovieList;
