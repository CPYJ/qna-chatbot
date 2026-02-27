// Qdrant DB와 연결 + 컬렉션 관리 담당

// Qdrant SDK
import { QdrantClient } from "@qdrant/js-client-rest";
import { ENV } from "./env.js";


// Qdrant 클라이언트 객체 생성
// 최초 import시 한번만 생성됨
// 외부에서 qdrant API를 호출하기 때문에 export
export const qdrant = new QdrantClient({
    url: ENV.QDRANT_URL,
    apiKey: ENV.QDRANT_API_KEY
});


export async function ensureCollection() {
    try { // 컬렉션 존재하는지 확인
        await qdrant.getCollection(ENV.COLLECTION);
    }
    catch { // 없는 경우 새로 생성
        await qdrant.createCollection(ENV.COLLECTION, {
            vectors: {
                size: ENV.DIM,
                distance: 'Cosine'
            }
        });
        console.log('✅ 컬렉션 생성');
    }
}

