import React, { useState } from "react";
import AnalogClock from "../pages/analogClock/AnalogClock";
import SpeedSlider from "../pages/speedSlider/SpeedSlider";
import ShareButton from "../pages/shareButton/ShareButton";
import "./TrackingScreen.css";

const TrackingScreen = () => {
  const [speed, setSpeed] = useState(1);

  return (
    <div className="tracking-screen">
      <AnalogClock speed={speed} />
      <SpeedSlider speed={speed} setSpeed={setSpeed} />
      <ShareButton speed={speed} />
    </div>
  );
};

export default TrackingScreen;
