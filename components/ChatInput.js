// 입력창 컴포넌트

// 사용자의 입력이 있기 때문에 써야함. 화면 출력만 하면 필요 X
'use client';

import { useState } from "react";

// onSend : 부모 컴포넌트가 준 질문 보내는 함수
// disabled : 로딩 중 입력 막기
export default function ChatInput({ onSend, disabled }) {
    // 입력창 텍스트 상태
    const [text, setText] = useState('');

    // 질문 전송
    function send() {
        if(!text.trim()) return; // 빈 입력 방지
        onSend(text); // 부모에게 질문 전달
        setText(''); // 입력창 초기화
    }

    return (
        <div>
            <input
                value={text}
                // 입력 바뀔 때마마 text를 업데이트 하여 화면에 표시 
                onChange={(e) => setText(e.target.value)}
                placeholder="질문 입력 후 Enter를 눌러주세요."
                disabled={disabled}
                onKeyDown={(e)=> { // enter 눌러도 전송
                    if(e.key === 'Enter') send();
                }}
                />

            <button onClick={send} disabled={disabled}>
                보내기
            </button>


        </div>
    )

}