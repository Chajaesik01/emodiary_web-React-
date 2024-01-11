import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/boardWrite.css';

const BoardWrite = () => {
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        title: '',
        createdBy: '',
        contents: '',
    });

    const { title, createdBy, contents } = board;

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const saveBoard = async () => {
        try {
            const response = await axios.post('//localhost:8080/board', board);
            if (response.status === 201) {
                alert('등록되었습니다.');
                navigate('/board');
            }
        } catch (error) {
            console.error(error);
            alert('등록에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const backToList = () => {
        navigate('/board');
    };

    return (
        <div className="board-write-container">
            <div>
                <span>제목</span>
                <input type="text" name="title" value={title} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>작성자</span>
                <input type="text" name="createdBy" value={createdBy} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>내용</span>
                <textarea name="contents" cols="30" rows="10" value={contents} onChange={onChange}></textarea>
            </div>
            <br />
            <div>
                <button onClick={saveBoard}>저장</button>
                <button onClick={backToList}>취소</button>
            </div>
        </div>
    );
};

export default BoardWrite;
