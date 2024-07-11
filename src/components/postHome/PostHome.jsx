import React from "react";
import "./PostHome.css";
import Bg4SVG from "../../assets/bg4.svg";
import IllustrationSuccess from "../../assets/illustration-success.svg";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/FirebaseConfig";

const PostHome = () => {
  const navigate = useNavigate();

  const handleGoToTracking = () => {
    navigate("/tracking");
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("users");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <div className="post-home" style={{ backgroundImage: `url(${Bg4SVG})` }}>
      <div className="content-box-post-home">
        <img
          src={IllustrationSuccess}
          alt="Success Illustration"
          className="illustration"
        />
        <h1>Login Successful</h1>
        <button className="tracking-btn" onClick={handleGoToTracking}>
          Go to Tracking Screen
        </button>
        <a href="#" className="logout-link" onClick={handleLogout}>
          Logout
        </a>
      </div>
    </div>
  );
};

export default PostHome;
