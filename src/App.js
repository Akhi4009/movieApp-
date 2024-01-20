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


const key ='fa150a4c'

export default function App() {
  
  const [query,setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState('');
  const [selectedId,setSelectedId] = useState(null);

  const handleSelectedMovie =(id)=>{
    setSelectedId((selectedId)=>(id === selectedId ? null : id));
  }

  const handleClosedMovie =()=>{
    setSelectedId(null);
  }

  function handleAddWatched(movie){
    setWatched(watched=>[...watched,movie])
  }

  function handleDeleteWatched(id){
    setWatched((watched)=>watched.filter(movie=>movie.imdbId!==id));
  }
  useEffect(()=>{
    async function fetchMovies(){
      setIsLoading(true);
      setError('');
      try{
        const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${key}`)
        if(!res.ok){
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();
        if(data.Responce === 'False') throw new Error("Movie not found")
        
       setMovies(data.Search);
      }catch(err){
        console.log(err)
        setError(err.message);
      }finally{
        setIsLoading(false);
      }
    }
    if(query.length < 3){
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies()
  },[query])
  // console.log(watched);
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




  





