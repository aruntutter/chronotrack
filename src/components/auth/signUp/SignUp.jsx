import React, { useState } from "react";
import "./SignUp.css";
import GoogleSVG from "../../../assets/google-icon.svg";
import LineSVG from "../../../assets/line-vector.svg";
import EyeSVG from "../../../assets/eye-icon.svg";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signup-form-container">
      <h4 className="signup-form-title">Create your new account</h4>
      <p className="signup-form-text">
        Create an account to start looking for the food you like
      </p>
      <form className="signup-form">
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
        {/* Username Input */}
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            id="username"
            className="form-input"
            placeholder="Enter Username"
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
              className="form-input password-input"
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
        {/* Terms & Privacy Policy Checkbox */}
        <div className="form-term-policy">
          <input
            type="checkbox"
            id="terms"
            className="form-checkbox styled-checkbox"
          />
          <label htmlFor="terms" className="form-label-checkbox">
            I Agree to the{" "}
            <a href="#" className="form-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="form-link">
              Privacy Policy
            </a>
          </label>
        </div>
        {/* Register Button */}
        <button type="submit" className="signup-button">
          Register
        </button>
      </form>
      {/* Google Signup Section */}
      <div className="signup-with-google">
        <div className="line-container">
          {/* SVG Line */}
          <img src={LineSVG} alt="line" className="line-svg" />
          <span className="line-text">or signup with</span>
          {/* SVG Line */}
          <img src={LineSVG} alt="line" className="line-svg" />
        </div>
        {/* Google SignUp Button */}
        <button className="google-signup-button">
          <img src={GoogleSVG} alt="Google icon" className="google-icon" />
        </button>
      </div>
      {/* Sign In Link */}
      <p className="signin-link">
        Have an account?{" "}
        <a href="#" className="form-link">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUp;
