import React,{useEffect, useState} from "react";
import MovieCard from "./components/MovieCard";
import Header from "./components/Header";
import SearchIcon from "./search.svg"
import "./App.css";

const url = "http://www.omdbapi.com/?apikey=6a03578&title=marvel";

const App = ()=>{
    const [searchValue,setSearchValue] = useState('');
    const [movies,setMovies] = useState([]);

    async function searchMovies(title){
        const response = await fetch(`${url}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    }

    useEffect(()=>{
        searchMovies('Avengers');
    },[]);

    return (<>
        <div className="app">
            <Header />
            <div className="search">
                <input placeholder="Search for movies" value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
                <img src={SearchIcon} alt="Search" onClick={()=>{searchMovies(searchValue)}} />
            </div>
            {movies?.length>0 ? movies.map( movie => <MovieCard 
                title={movie.Title}
                year={movie.Year}    
                type={movie.Type}
                poster={movie.Poster} /> ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )}
        </div>
    </>);
}

export default App;