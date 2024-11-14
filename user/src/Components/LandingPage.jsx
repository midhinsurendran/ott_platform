import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="overlay">
        <div className="container text-center">
          <h1 className="display-4 text-light">Welcome to Our OTT Platform</h1>
          <p className="lead text-light">
            Enjoy the best movies and series, all in one place.
          </p>
          <div className="button-group mt-4">
            <a href="/signup" className="btn btn-gold mx-2">
              Sign Up
            </a>
            <a href="/login" className="btn btn-light mx-2">
              Log In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
