import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import '../css/boardUpdate.css';

const BoardUpdate = () => {
    const navigate = useNavigate();
    const { idx } = useParams();
    const [board, setBoard] = useState({
        idx: 0,
        title: '',
        createdBy: '',
        contents: '',
    });

    const { title, createdBy, contents } = board;

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

    const onChange = (event) => {
        const { value, name } = event.target;
        setBoard({
            ...board,
            [name]: value,
        });
    };

    const getBoard = async () => {
        try {
            const response = await axios.get(`//localhost:8080/board/${idx}`);
            setBoard(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const updateBoard = async () => {
        try {
            await axios.patch(`//localhost:8080/board`, board);
            alert('수정되었습니다.');
            navigate(`/board/${idx}`);
        } catch (error) {
            console.error(error);
            alert('수정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    const backToDetail = () => {
        navigate(`/board/${idx}`);
    };

    useEffect(() => {
        getBoard();
    }, []);

    return (
        <div className="board-update-container">
            <div>
                <span>제목</span>
                <input type="text" name="title" value={title} onChange={onChange} />
            </div>
            <br />
            <div>
                <span>작성자</span>
                <input type="text" name="createdBy" value={createdBy} readOnly />
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
                <button onClick={updateBoard}>수정</button>
                <button onClick={backToDetail}>취소</button>
            </div>
        </div>
    );
};

export default BoardUpdate;
