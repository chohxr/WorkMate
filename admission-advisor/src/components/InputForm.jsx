// src/components/InputForm.jsx
import React, { useState } from "react";

const InputForm = ({ onSubmit }) => {
  const [grade, setGrade] = useState("");
  const [goalUniversity, setGoalUniversity] = useState("");
  const [major, setMajor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // 입력 데이터 전달
    onSubmit({ grade, goalUniversity, major });
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <h2>진학 상담 정보를 입력하세요</h2>
      <div>
        <label>성적: </label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="예: 3.5"
          required
        />
      </div>
      <div>
        <label>목표 대학: </label>
        <input
          type="text"
          value={goalUniversity}
          onChange={(e) => setGoalUniversity(e.target.value)}
          placeholder="예: 서울대학교"
          required
        />
      </div>
      <div>
        <label>학과: </label>
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
          placeholder="예: 컴퓨터공학과"
          required
        />
      </div>
      <button type="submit">추천 받기</button>
    </form>
  );
};

export default InputForm;
