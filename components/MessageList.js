// 메시지 리스트 컴포넌트. 화면 출력만 함

import { useEffect, useRef } from "react";

// 컴포넌트이기 때문에 default         대화배열,  답변 생성중 여부
export default function MessageList({messages, loading}) {

    // div를 직접 가리키는 변수. 맨 아래 위치를 가리킴
    const bottomRef = useRef(null);

    // 새 메시지 추가 시 실행
    useEffect(() => {
        // bottomRef가 가리키는 객체로 부드럽게 스크롤해서 이동
        bottomRef.current?.scrollIntoView({behavior: "smooth"});
     }, [messages.length]);
    

    return (
        
        <div 
            style={{ 
                height: 450,
                overflowY: 'auto',
                borderRadius: '12px',
                background: '#f9fafb'
            }}
        >
            {/* 메시지 하나씩 role 따라 위치 정해서 출력 */}
            {messages.map((m,i) => {

                // 값 && 타입 비교. 하나라도 다르면 false
                const isUser = m.role === 'user';

                return (
                    <div
                        key={i}
                        style={{
                            display : 'flex',
                            justifyContent: isUser ? 'flex-end' : 'flex-start',
                            margin: '8px 0'
                        }}
                    >

                        {/* 말풍선 */}
                        <div
                            style={{
                            maxWidth: '70%',
                            padding: '10px 14px',
                            borderRadius: '16px',
                            background: isUser ? '#2563eb' : '#e5e7eb',
                            color: isUser ? 'white' : '#111827',
                            wordBreak: 'break-word',
                            whiteSpace: 'pre-wrap'
                            }}
                        >
                            {m.text}
                        </div>
                    </div>
                );    
            })}

            {/* loading이 true인 경우 p태그 표시 */}
            {loading && <p>🤖 답변 생성 중...</p>}

            {/* 스크롤 기준점. 새 메시지 생기면 여기로 이동 */}
            <div ref={bottomRef}></div>

        </div>
    );
}