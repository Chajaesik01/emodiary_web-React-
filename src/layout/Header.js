import React from 'react';
import {Link} from "react-router-dom";
import '../css/header.css'
const Header = () => {
    return (
        <header className="header">
            <div className={"emodiary"}>Emodiary</div>
            <div className="right-section">
                <div className={"id"}>관리자Id님</div>
                <Link to="/" className={"link"}>로그아웃</Link>
            </div>
        </header>
    );
};

export default Header;