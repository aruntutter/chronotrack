import React from "react";
import "./ShareButton.css";

const ShareButton = ({ speed }) => {
  const generateShareLink = () => {
    const url = `${window.location.origin}/?speed=${speed}`;
    navigator.clipboard.writeText(url);
    alert("Share link copied to clipboard!");
  };

  return (
    <button className="share-button" onClick={generateShareLink}>
      Share
    </button>
  );
};

export default ShareButton;
