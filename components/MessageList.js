// 컴포넌트이기 때문에 default         대화배열,  답변 생성중 여부
export default function MessageList({messages, loading}) {

    return (
        <div 
            style={{
               height: 400,
                overflowY: 'auto', // 스크롤
                border: '1px solid #ddd',
                padding: 10,
                marginBottom: 10
            }}
        >
            {/* 메시지 하나씩 role 따라 위치 정해서 출력 */}
            {messages.map((m,i) => (
                <div
                    key={i}
                    style={{
                        textAlign: m.role === 'user' ? 'right' : 'left',
                        margin: '8px 0'
                    }}
                >
                    {m.text}
                </div>
            ))}

            {/* loading이 true인 경우 로딩 표시 */}
            {loading && <p>🤖 답변 생성 중...</p>}

        </div>
    )
}