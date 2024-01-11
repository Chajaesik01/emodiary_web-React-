import React, {useState, useEffect,useRef, forwardRef, } from 'react';


const modal = forwardRef((props, ref) =>{
    let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

    useEffect(()=>{
        document.addEventListener('mousedown', handleClickOutside);
        return()=>{
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })
    const handleClickOutside=(event)=>{
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            props.setModalState(false);
        }
    }

    const handleClose = () => {
        props.setModalState(false);
    };

    return (
        <div ref={wrapperRef} style={{width:"300px", height:"300px", border:"1px solid",}}>
            <button onClick={handleClose}>X</button>
            {props.children}
        </div>
    )

});

export default modal;