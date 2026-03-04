// Gemini 클라이언트 객체를 한 번만 만들어서 공유하기 위함

import { GoogleGenAI } from "@google/genai";
import { ENV } from "./env.js";

export const genAI = new GoogleGenAI({
    apiKey: ENV.GEMINI_API_KEY
});