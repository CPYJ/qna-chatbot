// app/layout.js
export const metadata = { // next.js가 자동으로 <head> 생성 => 브라우저 + 검색엔진 용 정보
    title: 'QA Bot', // 브라우저 탭 이름
    description: 'Gemini + Qdrant Q&A chatbot',
  };
  
  // 공통 틀. page.js 가 / 경로
  export default function RootLayout({ children }) {
    return (
      <html lang="ko">
        <body>
          {children}
        </body>
      </html>
    );
  }
  