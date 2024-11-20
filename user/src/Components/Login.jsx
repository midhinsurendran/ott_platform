import React,{ useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './Login.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  var [email,setEmail] = useState('');
  var [password,setPassword] = useState('');
  var [message,setMessage] = useState('');
  const navigate =useNavigate()

  function attemptLogin(event){
    event.preventDefault();
    axios.post('http://127.0.0.1:8000/api/login',{
      email:email,
      password:password
    }).then(response=>{
     const token = response.data.token;
      console.log(token)
      console.log(response)
      localStorage.setItem('token',token)
      setMessage('')
      setIsAuthenticated(true);
     navigate('/home')
    }).catch(error=>{
      if(error.response.data){
        setMessage(Object.values(error.response.data).join(' '))
      }else if(error.response.data.message){
        setMessage(error.response.data.message)
      }else{
        setMessage('Failed to login user.Please contact admin')
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
      <div className="login-card text-center">
        <h3 className="mb-4">Welcome Back</h3>
        {message?<div className="alert alert-danger">{message}</div>:''}
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-white">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email} 
              onChange={(event)=>setEmail(event.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label htmlFor="password" className="form-label text-white">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}  
              onChange={(event)=>setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-gold w-100 mb-3" onClick={attemptLogin}>
            Log In
          </button>
          
        </form>
        <p className="text-muted">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-decoration-none"
            style={{ color: "#ffd700" }} 
          >
            Sign up
          </a>
        </p>
        <p className="text-muted">
          <a
            href="/forgotpasswordemail"
            className="text-decoration-none"
            style={{ color: "#ffd700" }} 
          >
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
