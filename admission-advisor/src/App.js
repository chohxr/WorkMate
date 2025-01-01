// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [userInput, setUserInput] = useState({
    grade: "",
    goalUniversity: "",
    major: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // 입력 핸들링
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  // GPT API 호출
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 메시지 형식 정의
    const messages = [
      { role: "system", content: "You are an educational counselor." },
      {
        role: "user",
        content: `성적: ${userInput.grade}, 목표 대학: ${userInput.goalUniversity}, 학과: ${userInput.major}. 위 조건에 맞는 진학 전략과 입시 준비 방법을 추천해 주세요.`,
      },
    ];

    try {
      // 서버로 요청 보내기
      const response = await axios.post("http://localhost:3003/api/chat", {
        messages: messages,
      });

      // 응답 결과 처리
      setResult(response.data.choices[0].message.content.trim());
    } catch (error) {
      console.error("Error response:", error);
      setResult("추천을 생성하는 동안 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>AI 진학 상담 챗봇</h1>
      <form onSubmit={handleSubmit} className="input-form">
        <div>
          <label>성적: </label>
          <input
            type="text"
            name="grade"
            value={userInput.grade}
            onChange={handleChange}
            placeholder="예: 3.5"
            required
          />
        </div>
        <div>
          <label>목표 대학: </label>
          <input
            type="text"
            name="goalUniversity"
            value={userInput.goalUniversity}
            onChange={handleChange}
            placeholder="예: 서울대학교"
            required
          />
        </div>
        <div>
          <label>학과: </label>
          <input
            type="text"
            name="major"
            value={userInput.major}
            onChange={handleChange}
            placeholder="예: 컴퓨터공학과"
            required
          />
        </div>
        <button type="submit">추천 받기</button>
      </form>

      {loading ? (
        <p>추천을 생성 중입니다...</p>
      ) : (
        result && (
          <div className="result-display">
            <h2>추천 입시 전략</h2>
            <p>{result}</p>
          </div>
        )
      )}
    </div>
  );
};

export default App;
