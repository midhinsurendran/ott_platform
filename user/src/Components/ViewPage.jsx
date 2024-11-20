import React, { useEffect, useState } from "react";
import './ViewPage.css';
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { Description } from "@mui/icons-material";
import axios from "axios";

function ViewPage() {
  var {id} = useParams();
  var [page,setPage] = useState({
    title:'',
    description:'',
    thumbnail:'',
    video:'',
  })
  useEffect(()=>{
    const token = localStorage.getItem('token');
    axios.get(`http://127.0.0.1:8000/movie/${id}/viewpage`,{
      headers: {
        Authorization: `Token ${token}`, 
      },
    }).then(response=>{
      setPage(response.data)

      axios.post(`http://127.0.0.1:8000/movie/${id}/moviehistory`, {}, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => {
        console.log("Video URL:", response.data.video); // Debugging
        setPage(response.data);
        console.log("Movie added to watch history");
      })
      .catch(error => {
        console.error("Error adding movie to watch history:", error);
      });
    })
    .catch(error => {
      console.error("Error fetching movie details:", error);
    });
  },[id]);

  return (
    <div>
        <Navbar/>
    <div className="container-fluid mt-5">
     
      <div className="text-center mb-4">
        <h2>{page.title}</h2>
      </div>
    
      <div className="mb-4 d-flex justify-content-center">
        {page.video ? (
        <video width="88%" height="40%" controls>
          <source src={page.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        ) : (
          <p>Loading video....</p>
        )}
      </div>

    <div className="container" id="desc">
      <div className="row">
        
        <div className="col-md-4">
          <img src={page.thumbnail} alt="Thumbnail" className="img-fluid" style={{
                  width: "250px",      
                  height: "350px",     
                  objectFit: "cover",  
                  borderRadius: "8px", 
                  display: "block",    
                }} />
        </div>

        
        <div className="col-md-8">
          <div className="description mb-4">
            <h4>Description</h4>
            <p>{page.description}</p>
          </div>

          <div className="rating mb-4">
            <h4>Rating: 4.5 / 5</h4>
          </div>

          <button className="btn btn-primary">Rate Now</button>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default ViewPage;
