# 🤖 RAG FAQ Chatbot

> **Vector Search + LLM을 결합한 RAG 기반 FAQ 챗봇**

사용자의 질문을 **Embedding → Vector Search → LLM 생성** 구조로 처리하여  
**검색 기반(RAG) 질의 응답 시스템**을 구현했습니다.

- 질문을 벡터로 변환하여 **Qdrant Vector DB에서 의미 기반 검색**
- 검색된 데이터를 **Gemini LLM에 전달**
- 자연어 기반 **답변 생성**

---

## 🌐 Demo

> 실제 배포된 챗봇을 확인할 수 있습니다.

https://qna-chatbot.vercel.app/

---

## 🚀 기술 스택

| Category | Stack |
|------|------|
| **Frontend** | Next.js |
| **Backend** | Next.js Route Handler |
| **AI / LLM** | Gemini API |
| **Vector DB** | Qdrant |
| **Embedding** | Gemini Embedding |
| **Deployment** | Vercel |

---

## 💡 설계 및 구현 포인트

