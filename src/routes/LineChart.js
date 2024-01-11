
import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
            text: 'Chart.js Line Chart',
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
            label: 'Dataset 1',
            data: [1, 2, 3, 4, 5, 6, 7],
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: [2, 3, 4, 5, 6, 7, 8],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

const data2 = {
    labels,
    datasets: [
        {
            label: 'Dataset 3',
            data: [5, 6, 7, 8, 9, 10, 11],
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
        },
        {
            label: 'Dataset 4',
            data: [3, 4, 5, 6, 7, 8, 9],
            borderColor: 'rgb(153, 102, 255)',
            backgroundColor: 'rgba(153, 102, 255, 0.5)',
        },
    ],
};

function LineChart1() {
    return (
    <div className="Linechart-container">
   <Line options={options} data={data1} />
    </div>
    )
}

function LineChart2() {
    return (
    <div className="Linechart-container">
    <Line options={options} data={data2} />;
    </div>
    )
}

export { LineChart1, LineChart2 };