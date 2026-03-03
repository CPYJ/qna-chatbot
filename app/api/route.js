// 사용자 질문 > 검색 > 응답 반환

// Qdrant 검색
import { searchAnswer } from "../../lib/qdrantService";

export async function POST(req) {

  try{
    // 요청 body에서 질문 꺼내기
    const { question } = await req.json();

    // 질문 없어서 ?. 에서 통째로 undefined 처리 된 경우
    if(!question?.trim()) {
      return Response.json(
        { error : '질문이 필요합니다.' }, // body
        { status: 400 } // option : 상태코드 설정
      );
    }

    // 빌문 있으면 검색 실행
    const answer = await searchAnswer(question);

    // 검색 결과가 없는 경우
    if(!answer) {
      return Response.json(
        { answer : '데이터셋에 없는 질문이에요.' }, // body
        { status : 200 } 
      );
    }

    // 검색결과 O. 정상 응답
    return Response.json({answer}, {status: 200});






  } catch(err) {  // 어디선가 예외가 터졌을 때

    console.error('❌ API 오류:', err);

    return Response.json(
      { error: 'server error' },
      { status: 500 }
    );
  }
}