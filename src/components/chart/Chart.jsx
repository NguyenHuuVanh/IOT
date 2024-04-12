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
import { Bar,Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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


export const data = {
  type: "bar",
  data: {
    datasets: [
      {
        label: "Độ ẩm",
        data: [10, 10, 30, 40, 50, 10, 20, 30, 20, 30, 40],
        type: "bar",
        order: 2,
      },
      {
        label: "Nhiệt độ",
        data: [10, 40, 10, 10, 20, 30, 90, 80, 20, 10, 11],
        type: "line",
        order: 1,
      },
    ],
    labels: ["0H", "1H", "2H", "3H", "4H", "5H", "6H", "7H", "8H", "9H", "10H","11H","12H","13H","14H","15H","16H","17H","18H","19H","20H","21H","22H","23H"],
  },
};

// export const VerticalChart=()=> {
//   return <Bar options={options} data={data} />;
// }
