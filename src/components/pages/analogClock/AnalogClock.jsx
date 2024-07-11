import React, { useEffect, useState } from "react";
import "./AnalogClock.css";

const AnalogClock = ({ speed }) => {
  const initialTime = new Date(new Date().getTime() - 120 * 60 * 1000);
  const [time, setTime] = useState(initialTime);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime.getTime() - 1000 * speed);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [speed]);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="analog-clock-container">
      {/* Clock */}
      <div className="clock">
        <div
          className="hour_hand"
          style={{
            transform: `rotateZ(${90 - (time.getHours() % 12) * 30}deg)`,
          }}
        />
        <div
          className="min_hand"
          style={{
            transform: `rotateZ(${90 - time.getMinutes() * 6}deg)`,
          }}
        />
        <div
          className="sec_hand"
          style={{
            transform: `rotateZ(${90 - time.getSeconds() * 6}deg)`,
          }}
        />
        <span className="twelve">12</span>
        <span className="one">1</span>
        <span className="two">2</span>
        <span className="three">3</span>
        <span className="four">4</span>
        <span className="five">5</span>
        <span className="six">6</span>
        <span className="seven">7</span>
        <span className="eight">8</span>
        <span className="nine">9</span>
        <span className="ten">10</span>
        <span className="eleven">11</span>
      </div>
      {/* Current Time */}
      <div className="current-time">
        <p>User Entered Timing</p>
        {formatTime(currentTime)}
      </div>
    </div>
  );
};

export default AnalogClock;
