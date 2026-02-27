// Qdrant API 호출 + 답변 반환 레이어

import { qdrant, ensureCollection } from './qdrant.js'
import { embed } from './embed.js'
import { ENV } from './env.js'


// Q/A 데이터 저장
// rows = [{q,a}, {q,a}, ... ] 형태
export async function insertQnA(rows) {

    // 컬렉션 없으면 생성
    await ensureCollection();

    // [promise, promise, ...] 배열들을 Promise.all이 하나의 Promise로 만들어줌
    // await은 오로지 promise 타입 앞에만 쓸 수 있기에 promise.all 덕에 await 키워드를 쓸 수 있음
    const points = await Promise.all( 
        rows.map(async(row, i) => { 
            // 내부에서 await을 쓰고 있기 때문에 async 무명함수로 만들기 위해서 
            // async 키워드가 있음. map은 await 키워드를 기다리지 않고 지나쳐서 일함
            
            // ?? = 값이 null or undefined 면 '' 사용.   앞뒤 공백 제거
            const question = String(row.question ?? '').trim();
            const answer = String(row.answer ?? '').trim();

            if (!question) return null;
            // 질문을 벡터로 변환
            const vector = await embed(question);

            // return 값들이 모여서 새 배열 생성
            return { 
                id : i,
                vector: vector, // 질문 벡터
                payload: {
                    question, // 원본 질문 (혹시 몰라서)
                    answer // 답변은 벡터화 X. 원본 유지
                }
            };
        })
    );

    // 배열에서 null 제거
    const cleaned = points.filter(p => p!=null);

    // qdrant에 upsert
    await qdrant.upsert(ENV.COLLECTION, {
        points: cleaned
    });

    // upsert 된 데이터 쌍의 갯수 반환. 현재 15개
    return cleaned.length;
}




// 질문 검색 후 답변 찾아오기
export async function searchAnswer(question) {
    
    const vector = await embed(question);

    // Qdrant로부터 가장 비슷한 질문 1개 검색
    const results = await qdrant.search(ENV.COLLECTION, {
        vector, // 사용자 질문 벡터
        limit: 1, // 가장 비슷한 1개만 반환
        with_payload: true, // payload(답변 텍스트) 같이 반환
        score_threshold: 0.65 // 유사도 점수 이 이상만 반환
    });

    if(!results.length) return null;

    // 답변이 리스트로 옴.값이 null or undefined 면 null 반환
    return results[0]?.payload?.answer ?? null;
}