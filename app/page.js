'use client';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // 🔹 추천 질문 8개
  const samples = [
    { q: "임베딩(Embedding)이 뭐야?"},
    { q: "Gemini Embedding API는 어떤 역할을 해?"},
    { q: "Qdrant는 뭐 하는 도구야?"},
    { q: "Collection은 Qdrant에서 어떤 역할을 해?" },
    { q: "Seed Script는 왜 있어?"},
    { q: "Next.js는 왜 썼어?"},
    { q: "Route Handler는 어떤 기능을 해?"},
    { q: "Vercel은 어떤 역할을 해?"},
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function ask(textOverride) {
    const question = textOverride || q;
    if (!question.trim()) return;

    const userMsg = { role: 'user', text: question };
    setMessages(prev => [...prev, userMsg]);
    setQ('');
    setLoading(true);

    const res = await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    if (!res.ok) {
      setMessages(prev => [...prev, { role: 'bot', text: '서버 오류가 발생했습니다.' }]);
      setLoading(false);
      return;
    }

    const data = await res.json();
    const botMsg = { role: 'bot', text: data.answer || data.error || '오류 발생' };
    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  }




  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      ask();
    }
  }




  // 🔹 body 스타일 초기화
  useEffect(() => {
    document.documentElement.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
    document.body.style.height = '100%';
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden';
  }, []);

  

  return (
    <main style={{
      width: '100vw',
      height: '100vh',
      background: '#e5e7eb',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'Inter, system-ui, sans-serif',
      color: '#1f2937',
      overflow: 'hidden'
    }}>
      
      {/* 전체 레이아웃 */}
      <div style={{
        width: '95%',
        maxWidth: 1100,
        height: '90vh',
        background: '#f3f4f6',
        borderRadius: '16px',
        boxShadow: '0 6px 16px rgba(0,0,0,0.1)',
        padding: '24px',
        display: 'flex',
        gap: '20px'
      }}>

        {/* 왼쪽: 채팅 */}
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{
            textAlign: 'center',
            fontSize: '1.6rem',
            fontWeight: 600,
            marginBottom: '12px',
            color: '#111827'
          }}>
            💭 Gemini + Qdrant 챗봇
          </h1>

          {/* 대화창 */}
          <div style={{
            flex: 1,
            overflowY: 'auto',
            background: '#d1d5db',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start',
                margin: '8px 0'
              }}>
                <div style={{
                  background: m.role === 'user' ? '#2563eb' : '#f9fafb',
                  color: m.role === 'user' ? 'white' : '#111827',
                  padding: '10px 14px',
                  borderRadius: '16px',
                  maxWidth: '75%',
                  lineHeight: 1.5,
                  wordBreak: 'break-word'
                }}>
                  {m.text}
                </div>
              </div>
            ))}

            {loading && (
              <p style={{
                textAlign: 'center',
                color: '#4b5563',
                fontStyle: 'italic',
                marginTop: '8px'
              }}>🤖 답변 생성 중...</p>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* 입력창 */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #9ca3af',
            borderRadius: '12px',
            background: '#f9fafb',
            padding: '8px 10px'
          }}>
            <input
              type="text"
              value={q}
              onChange={e => setQ(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="질문 입력 후 Enter"
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                background: 'transparent'
              }}
            />
            <button
              onClick={() => ask()}
              disabled={loading}
              style={{
                borderRadius: '8px',
                background: '#2563eb',
                color: 'white',
                border: 'none',
                padding: '8px 14px',
                cursor: 'pointer',
                fontSize: '18px'
              }}
            >
              💬
            </button>
          </div>
        </div>

        {/* 오른쪽: 추천 질문 박스 */}
        <div style={{
          flex: 1,
          background: 'white',
          borderRadius: '12px',
          padding: '20px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
          overflowY: 'auto'
        }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>
            ⭐ 추천 질문
          </h2>

          {samples.map((item, i) => (
            <div key={i} style={{
              marginBottom: '14px',
              padding: '12px',
              background: '#f3f4f6',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
              onClick={() => ask(item.q)}
            >
              <p style={{ fontWeight: 600, marginBottom: '6px' }}>💬 {item.q}</p>
              <p style={{ color: '#4b5563', fontSize: '0.9rem' }}>{item.a}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
