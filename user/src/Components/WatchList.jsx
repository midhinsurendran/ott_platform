
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WatchList.css'; // Create this CSS file for styling
import MovieCard from './MovieCard'; // Assuming MovieCard is a shared component
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import CustomIcons from './Pagination';
import axios from 'axios';

const WatchList = () => {
  const [watchListMovies,setWatchListMovies] = useState([]);

  useEffect(()=>{
    const token= localStorage.getItem("token");

    axios.get("http://127.0.0.1:8000/movie/watchpage",{
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      setWatchListMovies(response.data);
    })
    .catch((error) => {
      console.error("Error fetching watch later movies:", error);
    });
  }, []);

  return (
    <div>
    <Navbar/>
    <div className="watchlist-page container">
    <div className="d-flex justify-content-between mt-4  mb-4">
            <h2 className="text-dark">Watch List</h2>
            <div className="search-bar-container">
              <SearchBar/>
            </div>
          </div>
      <div className="row">
        {watchListMovies.map((movie, index) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
            <MovieCard
                id={movie.movie.id}
                thumbnail={movie.movie.thumbnail}
                title={movie.movie.title}
                rating={movie.movie.rating}
                initialWatchLater={true}
            />
          </div>
        ))}
        <div className="d-flex justify-content-center mt-4 mb-4">
            <CustomIcons/>
        </div>
      </div>
    </div>
    </div>
  );
};

export default WatchList;
