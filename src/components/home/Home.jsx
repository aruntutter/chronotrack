import React, { useState } from "react";
import "./Home.css";
import Bg1SVG from "../../assets/bg1.svg";
import Bg2SVG from "../../assets/bg2.svg";
import Bg3SVG from "../../assets/bg3.svg";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      navigate("/signin");
    }
  };

  const handleSkipClick = () => {
    navigate("/signin");
  };

  const getBackgroundImage = () => {
    switch (step) {
      case 1:
        return Bg1SVG;
      case 2:
        return Bg2SVG;
      case 3:
        return Bg3SVG;
      default:
        return Bg1SVG;
    }
  };

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${getBackgroundImage()})` }}
    >
      <div className="content-box">
        <h1>We Serve Incomparable Delicacies</h1>
        <p>
          All the best restaurants with their top menu waiting for you, they
          can't wait for your order!!
        </p>
        <div className="indicator">
          <div className={`rectangle ${step === 1 ? "highlight" : ""}`}></div>
          <div className={`rectangle ${step === 2 ? "highlight" : ""}`}></div>
          <div className={`rectangle ${step === 3 ? "highlight" : ""}`}></div>
        </div>
        <div className="buttons">
          {step < 3 ? (
            <>
              <button className="skip-btn" onClick={handleSkipClick}>
                Skip
              </button>
              <button className="next-arrow" onClick={handleNextClick}>
                &rarr;
              </button>
            </>
          ) : (
            <button className="right-arrow" onClick={handleNextClick}>
              <div className="circle-loading"></div>
              &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
