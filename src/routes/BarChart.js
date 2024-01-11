import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const getPastWeek=()=>{
    const result=[];
    const today=new Date();
    for(let i=0;i<7;i++){
        const d=new Date(today);
        d.setDate(d.getDate()-i);
        result.push(d.toLocaleDateString('ko-KR'));
    }
    return result.reverse();
}
const labels=getPastWeek();

const data1 = {
    labels,
    datasets: [
        {
            label: '분류 1',
            data: [1, 2, 3, 4, 5, 6, 7],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: '분류 2',
            data: [2, 3, 4, 5, 4, 7, 8],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

function BarChart1() {
    return (
        <div className="Barchart-container" >
            <Bar options={options} data={data1}/>
        </div>
    );
}

function BarChart2() {
    return (
        <div className="Barchart-container">
            <Bar options={options} data={data2}/>
        </div>
    );
}

export { BarChart1, BarChart2 };
