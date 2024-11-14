import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './ForgotPassword.css'; // Ensure you create a corresponding CSS file

const ForgotPasswordEmail = () => {
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
      <div className="forgot-password-card text-center">
        <h3 className="mb-4 text-white">Forgot Password</h3>
        <form>
          <div className="mb-3 text-start">
            <label htmlFor="email" className="form-label text-white">
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
             
              required
            />
          </div>
          <button type="submit" className="btn btn-gold w-100 mb-3">
            Send Reset Link
          </button>
        </form>
        <p className="text-muted">
          Remembered your password?{" "}
          <a
            href="/login"
            className="text-decoration-none"
            style={{ color: "#ffd700" }} // Gold color for link
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;
