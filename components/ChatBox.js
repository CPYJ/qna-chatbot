// 메시지 창과 입력 창 컴포넌트를 조립하고 연결하는 컴포넌트

// 브라우저 기능 사용할 때(hook, event, 클라이언트 fetch ...) 필수. 브라우저에서 실행
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
        <div style={{
            width: '40%', 
            maxWidth: 500,
            margin: '40px auto',
            padding: 20,
            borderRadius: 16,
            background: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}>
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