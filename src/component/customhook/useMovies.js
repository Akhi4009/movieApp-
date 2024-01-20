import React,{useState,useEffect} from 'react'

const key ='fa150a4c'

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState('');

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
    // handleClosedMovie()
    fetchMovies()
  },[query]);

  return {movies,error,isLoading};
}

export default useMovies