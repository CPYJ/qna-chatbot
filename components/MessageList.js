// 메시지 리스트 컴포넌트. 화면 출력만 함


// 컴포넌트이기 때문에 default         대화배열,  답변 생성중 여부
export default function MessageList({messages, loading}) {

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

                const isUser = m.role === 'user'; // true or false

                return (
                    <div
                        key={i}
                        style={{
                            display : 'flex',
                            justifyContent: isUser ? 'flex-end' : 'flex-start',
                            margin: '8px 0'
                        }}
                    >
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

        </div>
    );
}