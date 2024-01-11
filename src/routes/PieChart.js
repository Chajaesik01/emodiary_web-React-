import React from 'react';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import '../css/charts.css'

ChartJS.register(
    Title,
    Tooltip,
    Legend,
    ArcElement,
    CategoryScale
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Pie Chart',
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
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(99, 132, 255, 0.5)'
            ],
        },
    ],
};

const data2 = {
    labels,
    datasets: [
        {
            label: '분류 2',
            data: [2, 3, 4, 5, 4, 7, 8],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)',
                'rgba(255, 159, 64, 0.5)',
                'rgba(99, 132, 255, 0.5)'
            ],
        },
    ],
};

function PieChart1() {
    return (
        <div className="Piechart-container">
            <Pie options={options} data={data1}/>
        </div>
    );
}

function PieChart2() {
    return (
        <div className="Piechart-container">
            <Pie options={options} data={data2}/>
        </div>
    );
}

export { PieChart1, PieChart2 };