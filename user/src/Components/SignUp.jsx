import React,{ useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import './Signup.css';
import { useNavigate } from "react-router-dom";

function Signup() {
  var [username,setUsername] = useState('');
  var [email,setEmail] = useState('');
  var [password,setPassword] = useState('');
  var [passwordConf,setPasswordConf] = useState('');
  var [message,setMessage] = useState('');
  const navigate = useNavigate();
  function signupUser(event){
    event.preventDefault()
    var user = {
      username:username,
      email:email,
      password1:password,
      password2:passwordConf
    }
    axios.post('http://127.0.0.1:8000/api/signup',user).then(response=>{
      setMessage('Signed Up');
      navigate('/login');
    }).catch(error=>{
      if(error.response.data){
        setMessage(Object.values(error.response.data).join(' '));
      }
      else{
        setMessage('Failed to connect to api');
      }
    })
  }

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url('https://images4.alphacoders.com/134/1349340.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
    
      <div className="signup-card text-center">
        <h3 className="mb-4 text-white">Create Your Account</h3>
        <form>
        {message?<div className="alert alert-danger">{message}</div>:''}
          <div className="mb-3 text-start">
            <label htmlFor="username" className="form-label text-white">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-white">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password1" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password1"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password2" className="form-label text-white">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password2"
              value={passwordConf}
              onChange={(event) => setPasswordConf(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-gold w-100 mb-3" onClick={signupUser}>
            Sign Up
          </button>
          
        </form>
        <p className="text-muted">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-decoration-none"
            style={{ color: "#ffd700" }} 
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
