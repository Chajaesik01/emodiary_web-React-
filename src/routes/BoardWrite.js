import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import '../css/boardWrite.css';

const BoardWrite = () => {
    const modules = {
        toolbar : [
            [{'header' : [1,2,3,4,5,6,false]}],
            ['bold','italic','underline','strike','blockquote'],
            [{'list' : 'ordered'}, {'list' : 'bullet'}, {'indent' : '-1'}, {'indent' : '+1'}],
            ['link','image'],
            [{'align' : [] }, {'color': []}, {'background':[]}],
            ['clean']
        ],
    }
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
        navigate('/');
    };

    return (
        <div className="board-write-container">
            <div>
                <span>제목</span>
                <br/><br/>
                <input type="text" name="title" value={title} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>작성자</span>
                <br/><br/>
                <input type="text" name="createdBy" value={createdBy} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>내용</span>
                <br/><br/>
                <ReactQuill theme="snow"
                            className="myQuillEditor"
                            modules={modules}
                            name="contents"
                            value={contents}
                            onChange={value => setBoard({...board, contents: value})} />
            </div>
            <br />
            <div>
                <button onClick={saveBoard} className="styles.button">저장</button>
                <button onClick={backToList} className="styles.button">취소</button>
            </div>
        </div>
    );
};

export default BoardWrite;