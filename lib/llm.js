// LLM에게 답변 생성을 요청함

import { genAI } from "./genAi";

// 유저 질문 + qdrant 검색 결과 => 최종 답변 생성
export async function generateAnswer(question, context) {

    // 프롬프트
    const prompt = `너는 굉장히 정중하고 친절하고, 초보도 이해하기 매우 쉽게 매우 간결히 설명해주는 챗봇이야. '정보'를 참고해서 '질문'에 답해. 정보 = ${context}, 질문 = ${question}. `;


    // Gemini LLM 호출
    const res = await genAI.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt
    });

    // 생성된 답변 반환
    return res.text;
}