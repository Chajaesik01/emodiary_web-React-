import React, { useState } from 'react';

const PasswordCheck: React.FC = () => {
    const [password, setPassword] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const predefinedPassword = 'yourPassword'; // 미리 정의된 비밀번호
    const imageURL = 'https://your-image-url'; // 표시할 이미지의 URL

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (password !== predefinedPassword) {
            setIsCorrect(false);
            alert('비밀번호가 일치하지 않습니다.');
        } else {
            setIsCorrect(true);
        }
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label>
                    비밀번호:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </label>

                <button type="submit">제출하기</button>
            </form>

            {isCorrect && <img src={imageURL} alt="secret image" />}
        </div>
    );
};

export default PasswordCheck;