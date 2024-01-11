import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BoardDetail from "./BoardDetail"
import BoardWrite from "./BoardWrite"
import BoardUpdate from "./BoardUpdate"
import BoardList from "./BoardList";
import Charts from './Charts'
import Picture from './Picture'



//<Route path="/board" element={<BoardList />} />
const Router = () => (
    <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/board/:idx" element={<BoardDetail />} />
        <Route path="/write" element={<BoardWrite />} />
        <Route path="/update/:idx" element={<BoardUpdate />} />
        <Route path="/charts" element={<Charts/>}/>
            <Route path="/picture" element={<Picture/>}/>
    </Routes>
);


export default Router;