import React from "react";
import "./SpeedSlider.css";

const SpeedSlider = ({ speed, setSpeed }) => {
  return (
    <div className="speed-slider">
      <label htmlFor="slider">Speed: {speed}x</label>
      <input
        id="slider"
        type="range"
        min="1"
        max="10"
        value={speed}
        onChange={(e) => setSpeed(Number(e.target.value))}
      />
    </div>
  );
};

export default SpeedSlider;
