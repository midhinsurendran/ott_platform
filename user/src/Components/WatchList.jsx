import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WatchList.css';
import MovieCard from './MovieCard';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import CustomIcons from './Pagination';
import axios from 'axios';

const WatchList = () => {
  const [watchListMovies,setWatchListMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pagesize = 4;
  const [currentpage,setcurrentpage]= useState(1);

  const fetchWatchListMovies=()=>{
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
  };

  const filteredWatchList = watchListMovies.filter((movie) =>
    movie.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startindex = (currentpage - 1) * pagesize;
  const endindex = startindex + pagesize;
  const currentMovies = filteredWatchList.slice(startindex, endindex);
  const totalpages = Math.ceil(filteredWatchList.length / pagesize); 

  const handlepage = (event, value) => {
    setcurrentpage(value);
  };

  useEffect(() => {
    fetchWatchListMovies();
  }, []);

  return (
    <div>
    <Navbar/>
    <div className="watchlist-page container">
    <div className="d-flex justify-content-between mt-4  mb-4">
            <h2 className="text-dark">Watch List</h2>
            <div className="search-bar-container">
              <SearchBar setSearchQuery={setSearchQuery}/>
            </div>
          </div>
      <div className="row">
        {currentMovies.map((movie, index) => (
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
            <CustomIcons
              count={totalpages}
              page={currentpage}
              onChange={handlepage}
            />
        </div>
      </div>
    </div>
    </div>
  );
};

export default WatchList;
