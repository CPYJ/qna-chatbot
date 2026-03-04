// AI 관련 코드를 한 곳에 몰아넣기 위함

// Gemini SDK
import { genAI } from './genAi.js';
import { ENV } from './env.js';


// 텍스트 한 문장 -> 벡터 변환 함수
// async: api 호출에 시간이 걸리기 때문
export async function embed(text) {

    // Gemini Embedding API 호출
    const res = await genAI.models.embedContent({
        model: ENV.MODEL,
        contents: [text], // 여러개도 받음
        outputDimensionality: ENV.DIM
    });

    // embeddings 배열 중 첫번째 벡터 반환
    // 지금은 한 문장만 보내기 때문에 결과도 한 개라 [0]
    return res.embeddings?.[0]?.values;
}