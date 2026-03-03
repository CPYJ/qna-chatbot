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

        setLoading(true);

        // 서버 호출 후 질문에 따른 답변 받아오기


    }
}