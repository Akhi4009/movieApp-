import React, { useEffect, useState } from 'react'
import StarRating from "../../../StarRating";
import Loader from "../../helper/Loader";
import ErrorMessage from "../../helper/ErrorMessage";
import useKey from '../../customhook/useKey';
const key ='fa150a4c'

const MovieDetails = ({selectedId,onCloseMovie,onAddWatched,watched}) => {

  const [movie,setMovie] = useState({});
  const [userRating,setUserRating] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState('');

  const isWatched = watched.map(movie=>movie.imdbId).includes(selectedId)
  const watchedMovieRating = watched.find(movie=>movie.imdbId===selectedId)?.userRating;
 
  useKey('Escape',onCloseMovie);
  

  const { 
    Title:title, Year:year,
    Poster:poster,
    Plot:plot, Released:released,
    Actors:actors, Director:director, Runtime:runtime, imdbRating,
    Gener:gener
  } = 
  movie;


  function handleAdd(){
    const newMovie = {
      imdbId:selectedId,
      title,
      year,
      poster,
      imdbRating:Number(imdbRating),
      runtime:Number(runtime.split(' ').at(0)),
      userRating
    }
    onAddWatched(newMovie);
    onCloseMovie();
  }

  useEffect(()=>{
    async function getMovieDetails(selectedId){
      try{
        setIsLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
        if(!res.ok){
          throw new Error("Something went wrong with fetching movies");
        }
        const data = await res.json();
        setMovie(data);
      }catch(err){
        console.log(err)
        setError(err.message);
       } finally{
        setIsLoading(false);
       }
    }
    getMovieDetails(selectedId)
  },[selectedId])

  useEffect(()=>{
    if(!title) return;
    document.title = `Movie | ${title}`;

    return ()=>{
      document.title = 'Movie App'
    }
  },[title])

  return (
    <>
    
    {isLoading && <Loader/>}
   
    {!isLoading && !error && 
  <div className='details'>
    <header>
    <button className='btn-back' onClick={onCloseMovie}>
    &larr;
    </button>
    <img src={poster} alt={title} />
    <div className='.details-overView'>
    <h2>{title}</h2>
    <p>{released} &bull;</p>
    <p>{gener}</p>
    <p><span>⭐</span>{imdbRating}</p>
    </div>
    </header>
    <section>
    <div className='rating'>
   {!isWatched ? 
    <>
    <StarRating 
    maxRating={10}
     size={24} 
    onSetRating={setUserRating}/>

    {userRating > 0 && <button className='btn-add' 
     onClick={handleAdd}>
     + Add to List
     </button>}
    </>
     : <p>You rated this movie {watchedMovieRating}⭐</p>
   }
    </div>
    <p><em>{plot}</em></p>
    <p>Staring {actors}</p>
    <p>Directed by {director}</p>
    </section>
   </div> 
  }
  { error && <ErrorMessage message={error}/>}
    </>
  )
}

export default MovieDetails