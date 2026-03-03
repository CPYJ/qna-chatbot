// 단순 출력 X, 유저와 상호작용 있을 때 입력.
'use client';

import { useState } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";

export default function ChatBox() {
    
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    // 사용자 질문 올 경우 처리
    async function ask(question) {
        if(!question.trim()) return;

        // 사용자 메시지 추가
        setMessages(prev => [
            ...prev,
            { role: 'user', text : question }
        ]);

        setLoading(true); // 입력창 disabled 시킴

        // 서버 호출 후 질문에 따른 답변 받아오기
        const res = await fetch('/api', {
            method: 'POST',
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({question}) // {question: question} 형태
        });

        // 응답 body json -> js 객체화
        const data = await res.json();

        // 챗봇 응답 추가
        setMessages(prev => [
            ...prev,
            // || 는 왼쪽 값이 falsy면 오른쪽 값 사용
            { role: 'bot', text : data.answer || '오류 발생'}
        ]);

        setLoading(false);
    }

    return (
        <div style={{maxWidth: 700, margin: '0 auto'}}>
            <h2>💭 RAG 챗봇</h2>

            {/* 메시지 창 */}
            <MessageList 
                messages={messages} 
                loading={loading}
            />

            {/* 인풋 입력창 */}
            <ChatInput
                onSend={ask}
                disabled={loading}
            />
        </div>
    )
}