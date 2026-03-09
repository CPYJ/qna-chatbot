# 🤖 RAG FAQ Chatbot

> **Vector DB + LLM을 결합한 RAG 기반 FAQ 챗봇**

사용자의 질문을 **임베딩 → Vector DB 검색 → LLM 생성** 구조로 처리하여  
**검색 기반(RAG) 응답 시스템**을 구현했습니다.

---

## 🌐 Demo

> 실제 배포된 챗봇을 확인할 수 있습니다.

https://qna-chatbot.vercel.app/

---

# 📌 프로젝트 동작 흐름

1. FAQ 데이터를 임베딩 후 Vector DB에 저장  
2. 사용자의 질문을 동일 모델로 임베딩하여 변환  
3. Qdrant에서 사용자의 질문벡터와 유사한 데이터 검색  
4. Qdrant 검색 결과를 LLM에게 전달
5. Gemini가 Qdrant 검색 결과와 사용자의 질문을 참고하여 자연어 답변 생성  
6. Qdrant 검색 결과가 없는 경우 '데이터셋에 없는 질문이에요' 반환

---

## 🚀 기술 스택

| Category | Stack |
|------|------|
| **Frontend** | Next.js (React) |
| **Backend** | Next.js Route Handler |
| **AI / LLM** | Gemini 2.5 flash |
| **Vector DB** | Qdrant |
| **Embedding** | Gemini Embedding |
| **Deployment** | Vercel |

---

## 💡 설계 및 구현 포인트

### RAG 기반 질의 응답 구조

- 사용자 질문을 벡터로 변환 -> Vector DB에서 관련 데이터를 검색  ->  
검색 결과를 LLM에 전달 -> LLM이 답변 생성


### Vector DB 기반 유사도 검색

- 텍스트를 벡터로 변환하여 사용자의 질문과 **유사한 데이터를 검색**하는 구조


### Service Layer 분리

- Vector DB 접근 로직을 분리하여 유지보수성과 구조 개선


### AI Client 재사용 구조

- Gemini API Client를 하나의 모듈에서 생성하여 Embedding과 LLM에서 **재사용**하도록 구성

---

## 📂 주요 코드 바로가기

| 기능 | 파일 | 설명 | 
|------|------|------|
| **챗봇 질문 처리 API** | [route.js](app/api/route.js) | 질문 -> 검색 -> LLM 답변 생성 |
| **Vector DB 관련 로직** | [qdrantService.js](lib/qdrantService.js) | 의미 기반 검색 + QnA 데이터 저장 로직|
| **임베딩** | [embed.js](lib/embed.js) | 텍스트를 임베딩 하여 벡터로 변환 |
| **LLM 답변 생성** | [llm.js](lib/llm.js) | 검색 결과를 기반으로 Gemini가 답변 생성 |
| **Gemini 객체 생성** | [genAi.js](lib/genAi.js) | Gemini Client 생성 및 관리 |
| **QnA 데이터 업로드** | [seed.js](scripts/seed.js) | QnA 데이터를 임베딩하여 Vector DB에 저장 |

