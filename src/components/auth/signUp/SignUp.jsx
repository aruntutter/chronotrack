import React, { useContext, useState } from "react";
import "./SignUp.css";
import GoogleSVG from "../../../assets/google-icon.svg";
import LineSVG from "../../../assets/line-vector.svg";
import EyeSVG from "../../../assets/eye-icon.svg";
import { useNavigate } from "react-router-dom";
import myContext from "../../../context/myContext";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, fireDB, googleProvider } from "../../../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import Loader from "../../loader/Loader";

const SignUp = () => {
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const navigate = useNavigate();

  // User Signup State
  const [userSignup, setUserSignup] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // User SignUp Function
  const userSignupFunction = async (e) => {
    e.preventDefault();
    // validation
    if (
      userSignup.name === "" ||
      userSignup.email === "" ||
      userSignup.password === ""
    ) {
      return console.log("All fields are required");
    }

    setLoading(true);
    try {
      const users = await createUserWithEmailAndPassword(
        auth,
        userSignup.email,
        userSignup.password
      );

      // create user object
      const user = {
        name: userSignup.name,
        email: users.user.email,
        uid: users.user.uid,
        role: userSignup.role,
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Refrence
      const userRefrence = collection(fireDB, "user");

      // Add User Detail
      await addDoc(userRefrence, user);

      setUserSignup({
        name: "",
        email: "",
        password: "",
      });

      alert("Signup successful");

      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.log("Error signing in with Email& Password", error);
      setLoading(false);
    }
  };

  // Google SignUp
  const googleSignupFunction = async () => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // create user object
      const userData = {
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        role: "user",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };

      // create user Reference
      const userReference = collection(fireDB, "user");

      // Add User Detail
      await addDoc(userReference, userData);

      alert("Signup successful");

      setLoading(false);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setLoading(false);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleSigninClick = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-form-container">
      {loading && <Loader />}
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
            value={userSignup.email}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                email: e.target.value,
              });
            }}
            required
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
            value={userSignup.name}
            onChange={(e) => {
              setUserSignup({
                ...userSignup,
                name: e.target.value,
              });
            }}
            required
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
              value={userSignup.password}
              onChange={(e) => {
                setUserSignup({
                  ...userSignup,
                  password: e.target.value,
                });
              }}
              required
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
            required
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
        <button
          type="submit"
          className="signup-button"
          onClick={userSignupFunction}
        >
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
        <button className="google-signup-button" onClick={googleSignupFunction}>
          <img src={GoogleSVG} alt="Google icon" className="google-icon" />
        </button>
      </div>
      {/* Sign In Link */}
      <p className="signin-link">
        Have an account?{" "}
        <a href="#" className="form-link" onClick={handleSigninClick}>
          Sign In
        </a>
      </p>
    </div>
  );
};

export default SignUp;
