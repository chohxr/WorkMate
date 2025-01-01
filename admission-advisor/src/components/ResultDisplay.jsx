// src/components/ResultDisplay.jsx
import React from "react";

const ResultDisplay = ({ result }) => {
  return (
    <div className="result-display">
      <h2>추천 입시 전략</h2>
      {result ? <p>{result}</p> : <p>입시 전략을 추천 중입니다...</p>}
    </div>
  );
};

export default ResultDisplay;
