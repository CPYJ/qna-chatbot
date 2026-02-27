// 환경변수를 여기저기서 process.env 로 꺼내지 말고,
// 한 군데에서 편리하게 관리하기 위함

// .env 파일을 읽어서 process.env안에 넣어줌. 
// 실행용 import => 다른 곳에서 env.js를 import시 실행됨
import 'dotenv/config';

export const ENV = {
    // gemini 
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    MODEL: process.env.EMBEDDING_MODEL,
    DIM: Number(process.env.EMBEDDING_DIM), 
    // process.env는 전부 string
    
    // qdrant
    QDRANT_URL : process.env.QDRANT_URL,
    QDRANT_API_KEY: process.env.QDRANT_API_KEY,
    COLLECTION: process.env.QDRANT_COLLECTION
};

// ENV 안 값이 하나라도 undefined, null, '', 0, false 인 경우
if(Object.values(ENV).some(v => !v)) {
    throw new Error('!!! 환경변수 누락 !!!');
}