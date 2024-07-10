import React, { useState } from "react";
import "./SignIn.css";
import GoogleSVG from "../../../assets/google-icon.svg";
import LineSVG from "../../../assets/line-vector.svg";
import EyeSVG from "../../../assets/eye-icon.svg";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signin-form-container">
      <h4 className="signin-form-title">Login to your account.</h4>
      <p className="signin-form-text">Please sign in to your account</p>
      <form className="signin-form">
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter Email"
          />
        </div>
        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input"
              placeholder="Enter Password"
            />
            <img
              src={EyeSVG}
              alt="Toggle Password"
              className="toggle-password-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
        </div>
        {/* Forgot Password Link */}
        <div className="form-group">
          <a href="#" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
        {/* Sign In Button */}
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      {/* Google SignIn Section */}
      <div className="signin-with-google">
        <div className="line-container">
          {/* SVG Line */}
          <img src={LineSVG} alt="line" className="line-svg" />
          <span className="line-text">or sign in with</span>
          {/* SVG Line */}
          <img src={LineSVG} alt="line" className="line-svg" />
        </div>
        {/* Google SignIn Button */}
        <button className="google-signin-button">
          <img src={GoogleSVG} alt="Google icon" className="google-icon" />
        </button>
      </div>
      {/* Register Link */}
      <p className="register-link">
        Don't have an account?{" "}
        <a href="#" className="form-link" onClick={handleSignupClick}>
          Register
        </a>
      </p>
    </div>
  );
};

export default SignIn;
