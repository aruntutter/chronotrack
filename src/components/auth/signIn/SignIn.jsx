import React, { useContext, useState } from "react";
import "./SignIn.css";
import GoogleSVG from "../../../assets/google-icon.svg";
import LineSVG from "../../../assets/line-vector.svg";
import EyeSVG from "../../../assets/eye-icon.svg";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB, googleProvider } from "../../../firebase/FirebaseConfig";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Loader from "../../loader/Loader";

const SignIn = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  // User Signup State
  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  // User SignIn function
  const userSignInFunction = async (e) => {
    e.preventDefault();

    // validation
    if (userSignIn.email === "" || userSignIn.password === "") {
      console.log("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const users = await signInWithEmailAndPassword(
        auth,
        userSignIn.email,
        userSignIn.password
      );

      console.log(users);
      try {
        const q = query(
          collection(fireDB, "user"),
          where("uid", "==", users?.user?.uid)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let user;
          QuerySnapshot.forEach((doc) => (user = doc.data()));
          localStorage.setItem("users", JSON.stringify(user));
          setUserSignIn({
            email: "",
            password: "",
          });
          alert("Login Successful");
          setLoading(false);
          navigate("/posthome");
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
      // end
    } catch (error) {
      console.log(error);
      setLoading(false);
    }

    // end
  };

  // Google SignIn function
  const googleSignInFunction = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Fetch user data from Firestore
      const q = query(collection(fireDB, "user"), where("uid", "==", user.uid));
      onSnapshot(q, (QuerySnapshot) => {
        let userData;
        QuerySnapshot.forEach((doc) => (userData = doc.data()));
        localStorage.setItem("users", JSON.stringify(userData));
        alert("Login Successful");
        setLoading(false);
        navigate("/posthome");
      });
    } catch (error) {
      console.error(error);
      alert("Error signing in with Google. Please try again.");
      setLoading(false);
    }
  };

  // Password hide/show
  const [showPassword, setShowPassword] = useState(false);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="signin-form-container">
      {loading && <Loader />}
      <h4 className="signin-form-title">Login to your account.</h4>
      <p className="signin-form-text">Please sign in to your account</p>
      <form className="signin-form">
        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            required
            type="email"
            id="email"
            className="form-input"
            placeholder="Enter Email"
            value={userSignIn.email}
            onChange={(e) => {
              setUserSignIn({
                ...userSignIn,
                email: e.target.value,
              });
            }}
          />
        </div>
        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="password-input-container">
            <input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              className="form-input"
              placeholder="Enter Password"
              value={userSignIn.password}
              onChange={(e) => {
                setUserSignIn({
                  ...userSignIn,
                  password: e.target.value,
                });
              }}
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
        <button
          type="submit"
          className="signin-button"
          onClick={userSignInFunction}
        >
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
        <button className="google-signin-button" onClick={googleSignInFunction}>
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
