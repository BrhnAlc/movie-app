
import axios from 'axios';
import React, { createContext, useState } from 'react';
 
 export const MovieContext = createContext();

 const API_KEY = process.env.REACT_APP_TMDB_KEY;
const FEATURED_API = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;


const MovieContextProvider = ({children}) => {
 
    const [movie, setMovie] = useState([])
    
    const getMovie = (API)=>{
        axios
        .get(API)
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));
    }

  return (
    <MovieContext.Provider value={null}>{children}</MovieContext.Provider>
  )
}

export default MovieContextProvider