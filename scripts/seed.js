// Q/A 데이터 가져오기 -> qdrant 저장

// 엑셀 읽는 라이브러리
import * as XLSX from 'xlsx';
// 파일 다루는 라이브러리
import fs from 'fs';
// 파일 경로 다루는 라이브러리
import path from 'path';
// Qdrant DB 서비스
import { insertQnA } from '../lib/qdrantService.js';


// 엑셀 -> Json 변환
function loadExcel() {

    // 엑셀 파일 경로 String
    const filePath = path.join(process.cwd(), 'data/qna_new.xlsx');

    // 엑셀 파일 즉시 읽기               파일 데이터
    const workbook = XLSX.read(fs.readFileSync(filePath));

    // 첫번째 시트 선택
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    // [{q,a}, ... ] 형태로 변환 (행별로 json화. 첫 행은 컬럼 이름화)
    return XLSX.utils.sheet_to_json(sheet);
}


// 실행 함수
async function run() {
    console.log('📄 엑셀 로딩 중...');

    const rows = loadExcel();
    if(!rows.length) {
        console.error('❌ 엑셀 데이터 없음');
        process.exit(1); // 프로그램 강제 종료. 사용자 화면 그대로
    }

    console.log('🚀 Qdrant 업로드 중...');

    const cnt = await insertQnA(rows);
    console.log(`✅ 업로드 완료: ${cnt} 건`);
}

// 실행. Promise를 반환하는 async 함수 에러처리 방식
run().catch(err => {
    console.error('❌ seed.js 실패: ', err);
    process.exit(1);
})