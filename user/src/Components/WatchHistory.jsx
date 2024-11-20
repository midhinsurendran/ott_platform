import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './WatchHistory.css'; 
import MovieCard from './MovieCard'; 
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import CustomIcons from './Pagination';
import axios from 'axios';

const WatchHistory = () => {
  const [watchHistory,setWatchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const pagesize=4;
  const [currentpage,setcurrentpage] = useState(1);

  function fetchWatchHistory() {
    axios.get("http://127.0.0.1:8000/movie/viewhistory",{
      headers: { Authorization: `Token ${localStorage.getItem('token')}` },
    })
    .then((response) => {
      setWatchHistory(response.data);
    })
    .catch((error) => {
      console.error("Error fetching watch history:", error);
    });
  }

  const filteredHistory = watchHistory.filter((movie) =>
    movie.movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startindex = (currentpage - 1) * pagesize;
  const endindex = startindex + pagesize;
  const currentMovies = filteredHistory.slice(startindex, endindex); 
  const totalpages = Math.ceil(filteredHistory.length / pagesize);

  const handlepage=(event,value)=>{
    setcurrentpage(value)
  };

  useEffect(()=>{
    fetchWatchHistory();
  }, []);
 
  return (
    <div>
    <Navbar/>
    <div className="watchhistory-page container">
    <div className="d-flex justify-content-between mt-4  mb-4">
            <h2 className="text-dark">Watch History</h2>
            <div className="search-bar-container">
              <SearchBar setSearchQuery={setSearchQuery}/>
            </div>
          </div>
      <div className="row">
        {currentMovies.map((movie, index) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={index}>
            <MovieCard
              id={movie.movie.id} 
              title={movie.movie.title} 
              thumbnail={movie.movie.thumbnail}
              date_time={movie.date_time}
              refresh={fetchWatchHistory}
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

export default WatchHistory;
