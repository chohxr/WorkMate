// server.js
require("dotenv").config(); // 환경 변수를 로드

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// POST 요청을 통해 GPT API 호출
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body; // 클라이언트에서 보낸 메시지
  const API_KEY = process.env.OPENAI_API_KEY; // .env 파일에서 API 키를 가져옵니다.

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions", // 최신 API 엔드포인트
      {
        model: "gpt-3.5-turbo", // 모델 선택
        messages: messages, // 대화 메시지
        max_tokens: 5,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`, // Authorization 헤더에 API 키 포함
        },
      }
    );

    // API 응답을 클라이언트에게 전달
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("OpenAI API 호출에 실패했습니다.");
  }
});

// 서버 실행
app.listen(3003, () => console.log("Server running on port 3003"));
