import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './ChangePassword.css'; 
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword,setCurrentPassword] = useState("");
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event){
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      setErrorMessage("New password and confirm password do not match.");
      return;
    }

    const token = localStorage.getItem("token");

    axios.post("http://127.0.0.1:8000/api/changepassword",{
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccessMessage(response.data.message);
        setErrorMessage(""); 
      })
      .catch((error) => {
        if (error.response) {
          setErrorMessage(error.response.data.error);
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        setSuccessMessage(""); 
      });
  };

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
        <h3 className="mb-4 text-white">Change Your Password</h3>
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
              <label htmlFor="currentPassword" className="form-label text-white">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="newPassword" className="form-label text-white">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3 text-start">
              <label htmlFor="confirmPassword" className="form-label text-white">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-gold w-100 mb-3">
              Change Password
            </button>
        </form>
          <p className="text-muted">
            Return to{" "}
            <a
              href="/Home"
              className="text-decoration-none"
              style={{ color: "#ffd700" }} 
            >
              Home
            </a>
          </p>
      </div>
    </div>
  );
};

export default ChangePassword;
