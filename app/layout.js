// app/layout.js
export const metadata = { // next.js가 자동으로 <head> 생성 => 브라우저 + 검색엔진 용 정보
    title: 'QA Bot', // 브라우저 탭 이름
    description: 'Gemini + Qdrant Q&A chatbot',
  };
  
  // 공통 틀. 본인 하위에 있는 모든 page.js가 렌더링 될 때 감싼다
  export default function RootLayout({ children }) {
    return (
      <html lang="ko">
        <body style={{ margin: 0 }}>
          {children}
        </body>
      </html>
    );
  }
  