import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import { Link } from "react-router-dom";



function App() {
  const [movieList, setMovieList] = useState(null)
  const [searchItems, setSearchItems] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=41ee980e4b5f05f6693fda00eb7c4fd4&page=1';
  // const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
  const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=${process.env}&query=";
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYWIyNmFkODQ2YWE3ZDcxY2Y0YmVmZDdiODQ3MzBhYyIsIm5iZiI6MTcyNzk3MjUzNC41NDQ0NDYsInN1YiI6IjYzOTNjMDIxNmU5MzhhMDBiOGVkY2M0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j39HXX2tLpcIpfC6ePvsgccHxpPGcXn1YtgNd3Mx04U',
    }
  };  
  
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(APILINK, options);
      const data = await response.json();
      console.log(data.results);
      setMovieList(data.results);
    };
    getMovies().catch(console.error);
  }, []);

  const search = (searchValue) => {
    setSearchItems(searchValue);
  }

  useEffect(() => {
    const getSearchResults = async () => {
      const response = await fetch(SEARCHAPI + searchItems, options);
      const data = await response.json();
      setSearchResults(data.results);
    };
    getSearchResults().catch(console.error());
  }, [searchItems])

  return (
    <>
      <div className="topnav">
        <div className='logo' style={{align:'center'}}><a className="active" href="App.js">Movie Takes</a></div>
        <div className='search-bar'><input
        type="text"
        placeholder="Search..."
        onChange={(inputString) => search(inputString.target.value)}
      /></div>
    </div>

      <div className="section">
        {
          searchItems.length > 0 ? 
              Object.entries(searchResults).map(([movie]) => (
                <Card
                  key={searchResults[movie].id}
                  title={`${searchResults[movie].title}`}
                  img={`https://image.tmdb.org/t/p/w1280${searchResults[movie].poster_path}`}
                  id={searchResults[movie].id}/>
              )) :
        movieList && 
          Object.entries(movieList).map(([movie]) => (
            <Card
              key={movieList[movie].id}
              title={`${movieList[movie].title}`}
              img={`https://image.tmdb.org/t/p/w1280${movieList[movie].poster_path}`}
              id={movieList[movie].id}/>
          ))  
        }
    </div>
      </>
  )
}

export default App
