import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Home.css';
import MovieCard from "./MovieCard";
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import CustomIcons from "./Pagination";
import axios from "axios";


function Home() {
  var [movies ,setMovies] = useState([]);
  const [searchQuery,setSearchQuery] = useState("");
  const pagesize=4;
  const [currentpage,setcurrentpage] = useState(1);
  const token = localStorage.getItem('token');
  
  function fetchMovies(){
    axios.get('http://127.0.0.1:8000/movie/home',{
      headers: {
        'Authorization': `Token ${token}`
      }
    }).then(response=>{
      console.log(response.data)
      setMovies(response.data)
    }).catch(error => {
      console.error("Error fetching movies:",error);
    });
  }

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const startindex = (currentpage-1)*pagesize;
  const endindex=startindex + pagesize;
  const currentMovies = filteredMovies.slice(startindex,endindex);
  const totalpages = Math.ceil(filteredMovies.length/pagesize)

  const handlepage=(event,value)=>{
    setcurrentpage(value)
  };
  
  useEffect(()=>{
    fetchMovies()
  },[]);
  
  return (
    <div className="homepage">
      <Navbar />
     
      <section className="hero-section">
        <div className="overlay">
          <div className="container text-center text-light">
            <h1 className="display-4">Discover the Best Movies and Series</h1>
            <p className="lead">Unlimited entertainment, wherever you are.</p>
          </div>
        </div>
      </section>

      <section className="movie-list py-5">
        <div className="container">
        <div className="d-flex justify-content-between  mb-4">
            <h2 className="text-dark">Popular Movies</h2>
            <div className="search-bar-container">
              <SearchBar setSearchQuery={setSearchQuery}/>
            </div>
          </div>
          <div className="row">
            {currentMovies.map((movie,index) =>(
              <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
                <MovieCard id={movie.id} title={movie.title} thumbnail={movie.thumbnail} refresh={fetchMovies}/>
              </div>
            ))}
            </div>
            <div className="d-flex justify-content-center mt-4">
              <CustomIcons
                count={totalpages}
                page={currentpage}
                onChange={handlepage}
              />
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
