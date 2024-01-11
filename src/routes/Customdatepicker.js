import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from 'date-fns/esm/locale';
import styled from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const SDatePicker = styled(DatePicker)`
    margin-top : 1.5rem;
    width: 200px;
    height: 30px;
    box-sizing:border-box;
    padding:8px 20px;
    border-radius: 4px;
    font-size: 12px;
    margin-left: 30px;
    margin-right: 10px;
`;
const Customdatepciker = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate , setEndDate] = useState(new Date());

    return (
        <>
            <div style={{ marginRight: '1px' }}>
            <SDatePicker selected={startDate}
                         locale = {ko}
                         dateFormat={"yyyy년 MM월 dd일"}
                         onChange={date => setStartDate(date)}
                         selectsStart
                         startDate={startDate}
                         endDate = {endDate}
            />
            </div>
            <div style={{ marginTop: '30px' }}>~</div>
            <SDatePicker style={{ marginLeft: '30px' }}
                         selected={endDate}
                         locale = {ko}
                         dateFormat={"yyyy년 MM월 dd일"}
                         onChange={date => setEndDate(date)}
                         selectsEnd
                         endDate={endDate}
                         minDate = {startDate}
            />
        </>
    );
};


export default Customdatepciker
