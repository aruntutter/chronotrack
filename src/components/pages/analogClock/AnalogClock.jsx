import React, { useEffect, useState } from "react";
import "./AnalogClock.css";

const AnalogClock = ({ speed }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const endTime = new Date(time.getTime() - 120 * 60 * 1000); // 120 minutes earlier
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newTime = new Date(prevTime.getTime() - 1000 * speed);
        if (newTime <= endTime) {
          clearInterval(interval);
          return endTime;
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [speed]);

  return (
    <div className="clock">
      <div
        className="hour_hand"
        style={{
          transform: `rotateZ(${(time.getHours() % 12) * -30 - 90}deg)`,
        }}
      />
      <div
        className="min_hand"
        style={{
          transform: `rotateZ(${time.getMinutes() * -6 - 90}deg)`,
        }}
      />
      <div
        className="sec_hand"
        style={{
          transform: `rotateZ(${time.getSeconds() * -6 - 90}deg)`,
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
  );
};

export default AnalogClock;
