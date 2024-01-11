import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/board.css'

const Board = ({ idx, title, contents, createdBy }) => {
    const navigate = useNavigate();

    const moveToUpdate = () => {
        navigate('/update/' + idx);
    };

    const deleteBoard = async () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            await axios.delete(`//localhost:8080/board/${idx}`).then((res) => {
                alert('삭제되었습니다.');
                navigate('/board');
            });
        }
    };

    const moveToList = () => {
        navigate('/');
    };

    return (
        <div className="board">
            <div className="board-content">
                <h2 className="board-title">{title}</h2>
                <h5 className="board-author">{createdBy}</h5>
                <hr />
                <p className="board-contents">{contents}</p>
                <hr />
            </div>
            <div className="board-buttons">
                <button className="board-button" onClick={moveToUpdate}>수정</button>
                <button className="board-button" onClick={deleteBoard}>삭제</button>
                <button className="board-button" onClick={moveToList}>목록</button>
            </div>
        </div>
    );
};

export default Board;