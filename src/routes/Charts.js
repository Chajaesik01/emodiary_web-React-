import React, { useState } from 'react';
import {LineChart1, LineChart2} from './LineChart';
import { BarChart1, BarChart2 } from './BarChart';
import {PieChart1, PieChart2} from "./PieChart";
import '../css/charts.css'
function Charts() {
    const [chartType, setChartType] = useState('bar');

    const handleChartChange = (e) => {
        setChartType(e.target.value);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40%', height : "auto", position: 'relative' }}>
                <div className="select-container" style={{ position: 'absolute', top: 0, left: 0}}>
                    <select onChange={handleChartChange} style={{height: "35px",width:"150px"}}>
                        <option value="bar">Bar Chart</option>
                        <option value="line">Line Chart</option>
                        <option value="pie">Pie Chart</option>
                    </select>
                </div>
                <br/>
                <div style={{ width: '40%', height : "auto", position: 'relative' }}>
                <h2 style={{ paddingTop: '30px' }}>주간 일기 횟수</h2>
                    {chartType === 'bar' ? <BarChart1 /> : chartType === 'line' ? <LineChart1 /> : <PieChart1 />}
                </div>
            </div>
            <div style={{ width: '40%', height : "auto", position: 'relative' }}>
                <h2 style={{ paddingTop: '30px' }}>주간 공유 횟수</h2>
                {chartType === 'bar' ? <BarChart2 /> : chartType === 'line' ? <LineChart2 /> : <PieChart2 />}
            </div>
        </div>
    );


}

export default Charts;