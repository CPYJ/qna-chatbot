# 💭 Q&A 챗봇

질문에 가장 적합한 답변을 찾아주는 Q&A 챗봇입니다.

---

## 🧩 실행 흐름 요약

1. Q/A 데이터를 임베딩 후 Qdrant에 저장  
2. 사용자가 질문 입력  
3. 입력된 질문을 임베딩 후 Qdrant에 검색  
4. 가장 유사한 질문을 찾은 후 같이 묶여있는 답변 반환
5. 답변 화면 출력
---

## 🌐 배포 URL
> https://qna-chatbot.vercel.app/

---

## 🧩 기술 스택

| 구분 | 사용 기술 |
|------|-----------|
| Frontend | Next.js |
| Backend | Next.js Route Handler |
| Embedding | Google Gemini Embedding API |
| Vector DB | Qdrant |
| 배포 | Vercel (GitHub 자동 배포 연동) |

---

## 🧠 임베딩 방식

- **모델:** `gemini-embedding-001`  
- **차원 수:** 3072
- **거리 계산 방식:** Cosine Similarity  

---

## 🎯 정확도 향상 전략

1. **동일 모델 유지**  
   Q/A 데이터와 사용자의 질문을 모두 동일한 모델(`gemini-embedding-001`)과  
   차원(3072)으로 임베딩 하여 벡터 공간을 일치시켰습니다.

2. **유사도 기준값 조정**  
   지나치게 높은 기준값(0.75 이상)은 유연한 질의 대응을 방해하였기 때문에,  
   0.65로 조정해 다양한 토막의 질문에도 적합한 답변을 반환하도록 했습니다.

3. **환각 방지**  
   환각 현상을 방지하기 위해, 정해진 Q/A 데이터 셋에서만 답변을 조회하도록  
   하였습니다. 또한, 검색된 답변이 없다면 고정된 안내 문구만 반환하도록 하였습니다.

---

## 📂 주요 코드 구조

| 파일 | 설명 | 링크 |
|------|------|------|
| `route.js` | 질문 임베딩 → Qdrant 검색 로직 | [보기](app/api/route.js) |
| `seed.js` | 엑셀 데이터 → Qdrant 초기 시드 업로드 | [보기](scripts/seed.js) |
| `page.js` | UI 및 사용자 입력 처리 | [보기](app/page.js) |















