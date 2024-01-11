import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from "react-calendar";
import '../css/board.css';
import Customdate from './Customdatepicker'

const BoardList = () => {
    const navigate = useNavigate();

    const [boardList, setBoardList] = useState([]);
    const [pageList, setPageList] = useState([]);

    const [curPage, setCurPage] = useState(0);
    const [prevBlock, setPrevBlock] = useState(0);
    const [nextBlock, setNextBlock] = useState(0);
    const [lastPage, setLastPage] = useState(0);


    const getBoardList = async () => {
        if (search.page === curPage) return;

        const queryString = Object.entries(search)
            .map((e) => e.join('='))
            .join('&');

        try {
            const response = await axios.get('//localhost:8080/board?' + queryString);
            const respData = response.data;

            setBoardList(respData.data);
            const pngn = respData.pagination;

            const { endPage, nextBlock, prevBlock, startPage, totalPageCnt } = pngn;

            setCurPage(search.page);
            setPrevBlock(prevBlock);
            setNextBlock(nextBlock);
            setLastPage(totalPageCnt);

            const tmpPages = [];
            for (let i = startPage; i <= endPage; i++) {
                tmpPages.push(i);
            }

            setPageList(tmpPages);
        } catch (error) {
            console.error(error);
        }
    };

    const moveToWrite = () => {
        navigate('/write');
    };

    const onClick = (event) => {
        let value = event.target.value;
        setSearch({
            ...search,
            page: value,
        });

        getBoardList();
    };


   const onChange = (event) => {
       const { value, name } = event.target;
       setSearch({
           ...search,
           [name]: value,
       });
   };

   const onSearch = () => {
       if (search.sk !== '' && search.sv !== '') {
           setSearch({
               ...search,
               page: 1,
           });
           setCurPage(0);
           getBoardList();
       }
   };
    const resetSearch = () => {
        setSearch({
            page: 1,
            sk: '',
            sv: '',
        });
        window.location.reload(); //페이지 다시 로드
    };
    const [search, setSearch] = useState({
        page: 1,
        sk: '',
        sv: '',
    });

    useEffect(() => {
        getBoardList();
    }, [search]);


    return (
        <div className="board-container">
            <div className="board-search">
                <div className="write">공지대상
                <select name="sk" onChange={onChange} style={{height: "30px"}}>
                    <option value="title">전체</option>
                    <option value="manager">관리자</option>
                    <option value={"user"}>사용자</option>
                </select>
                </div>
                <div className="write">
                    <div style={{ marginTop: '20px' }}>등록일</div>
                        <Customdate/>
                    <button className="search-button" onClick={onSearch}>조회</button>
                    <button className="reset-button" onClick={resetSearch}>초기화</button>
                </div>
            </div>
            <ul className="board-list">
                {boardList.map((board) => (
                    <li key={board.idx}>
                        <Link to={`/board/${board.idx}`}>{board.title}</Link>
                    </li>
                ))}
            </ul>
            <div className="board-pagination">
                <button onClick={onClick} value={1}>
                    &lt;&lt;
                </button>
                <button onClick={onClick} value={prevBlock}>
                    &lt;
                </button>
                {pageList.map((page, index) => (
                    <button key={index} onClick={onClick} value={page}>
                        {page}
                    </button>
                ))}
                <button onClick={onClick} value={nextBlock}>
                    &gt;
                </button>
                <button onClick={onClick} value={lastPage}>
                    &gt;&gt;
                </button>
            </div>
            <br />
            <div>
                <button className="write-button" onClick={moveToWrite}>글쓰기</button>
            </div>
            <br />
        </div>
    );
};

export default BoardList;
