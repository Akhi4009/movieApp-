import {useState,useEffect} from 'react'

function useLocalStorageState (initialState,key) {
 const [value,setValue] =useState(function(){
    const storedValue = JSON.parse(localStorage.getItem(key));
     return storedValue || initialState;
 });

 useEffect(()=>{
    localStorage.setItem(key,JSON.stringify(value));
  },[value,key]);

  return [value,setValue];
}

export default useLocalStorageState