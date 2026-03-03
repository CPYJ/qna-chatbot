// 메인 페이지. / 경로. layout.js가 감싸줌

import ChatBox from "../components/ChatBox";

export default function Page() {

    return(
        <main // 의미 태그
            style={{
                height: '100vh',
                display : 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                background: '#f5f5f5'
            }}
            >
                <ChatBox/>
            </main>
    );
}