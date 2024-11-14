import React, { useState } from "react";
import "./MovieCard.css"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const MovieCard = ({ id,thumbnail, title, rating, initialWatchLater }) => {
  const navigate = useNavigate();
  
  const [isInWatchLater,setIsInWatchLater] = useState(initialWatchLater || false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get(`http://127.0.0.1:8000/movie/${id}/checkwatchlater`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      setIsInWatchLater(response.data.is_in_watchlist); 
    })
    .catch((error) => {
      console.error("Error fetching watch later status:", error);
    });
  }, [id]);

  const handleClick = () => {

    const token = localStorage.getItem("token");
    
    axios.post(`http://127.0.0.1:8000/movie/${id}/moviehistory`, {}, {
      headers: { Authorization: `Token ${token}` },
    })
    .then((response) => {
      console.log('Movie added to watch history:', response.data);
    })
    .catch((error) => {
      console.error("Error adding movie to watch history:", error);
    });

    navigate(`/viewpage/${id}`);
  };

  const handleWatchLater = (event) =>{
    event.stopPropagation();

    const token = localStorage.getItem("token");

    if(isInWatchLater){
      axios.delete(`http://127.0.0.1:8000/movie/${id}/watchremove`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setIsInWatchLater(false);
        alert("Movie removed from Watch Later.");
      })
      .catch((error) => {
        console.error("Error removing movie from Watch Later:", error);
      });
    }
    else{
      axios.post(`http://127.0.0.1:8000/movie/${id}/watchlater`, {}, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((response) => {
        setIsInWatchLater(true);
        alert("Movie added to Watch Later.");
      })
      .catch((error) => {
        console.error("Error adding movie to Watch Later:", error);
      });
    }
  };

  return (
    <div className="movie-card" onClick={handleClick} style={{ cursor: "pointer" }}>
      <img src={thumbnail} alt={title} className="movie-card__image" />
      <div className="movie-card__details">
        <span className="movie-card__title">{title}</span>
        <span className="movie-card__rating">Rating: {rating}</span>
      </div>
      <button className="movie-card__button" onClick={handleWatchLater}>{isInWatchLater ? '-' : '+'}</button>
    </div>
  );
};

export default MovieCard;
