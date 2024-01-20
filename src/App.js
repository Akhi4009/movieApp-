import { useState,useEffect } from "react";

import Navbar from "./component/navbar/Navbar";
import Search from "./component/navbar/Search";
import NumResults from "./component/navbar/NumResult";

import Main from "./component/main/Main";
import Box from "./component/main/Box";
import MovieList from "./component/main/movies/MovieList";
import WatchedSumary from "./component/main/watchedMovies/WatchedSummary";
import WatchedMovieList from "./component/main/watchedMovies/WatchedMovieList";

import Loader from "./component/helper/Loader";
import ErrorMessage from "./component/helper/ErrorMessage";
import MovieDetails from "./component/main/movies/MovieDetails";
import useMovies from "./component/customhook/useMovies";
import useLocalStorageState from "./component/customhook/useLocalStorageState";




export default function App() {
  
  const [query,setQuery] = useState('');
  const [selectedId,setSelectedId] = useState(null);
  const {movies,error,isLoading} = useMovies(query);
  const [watched,setWatched] = useLocalStorageState([],'watched');
 

  function handleSelectedMovie (id){
    setSelectedId((selectedId)=>(id === selectedId ? null : id));
  }

 function handleClosedMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched=>[...watched,movie])
  }

  function handleDeleteWatched(id){
    setWatched((watched)=>watched.filter(movie=>movie.imdbId!==id));
  }

 return (
    <>
    <Navbar> 
    <Search query={query} setQuery={setQuery}/>
    <NumResults movies={movies}/>
    </Navbar>
   <Main>
   <Box >
   {isLoading && <Loader/>}
  {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />} 
  { error && <ErrorMessage message={error}/>}
   </Box>
   <Box>
   <>
   {
    selectedId ? <MovieDetails 
    selectedId={selectedId}
     onCloseMovie={handleClosedMovie}
     onAddWatched={handleAddWatched}
     watched={watched}
     />
   : <>
  <WatchedSumary watched={watched}/>
  <WatchedMovieList
   watched={watched}
   onDeleteWatched={handleDeleteWatched}
   />
  </>

   }
   </>
   </Box>
   </Main>
   
      
    </>
  );
}




  





