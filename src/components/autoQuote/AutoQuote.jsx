import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AutoQuote.css";
const AutoQuote = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await axios.get("https://api.quotable.io/random");

        if (response.data && response.data.content) {
          setQuote(response.data.content);
        }
      } catch (error) {
        console.error("Error fetching quote:", error);
      }
    };

    fetchQuote();

    const interval = setInterval(fetchQuote, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="auto-quote-container">
      <div className="quote">{quote}</div>
    </div>
  );
};

export default AutoQuote;
