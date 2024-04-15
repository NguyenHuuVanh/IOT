import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "April",
  "May",
  "June",
  "July",
];

export const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Temprerature",
      data: [0, 10, 20, 30, 40, 50],
      borderColor: "rgb(255, 99, 132)",
      borderWidth: 5,
      fill: false,
    },
    {
      type: "bar",
      label: "Humidity",
      data: [50, 60, 70, 80, 90, 100],
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "white",
      borderWidth: 2,
    },
  ],
};

// export function MultitypeChart() {
//   return (
//     <Chart
//       type="bar"
//       data={data}
//       width={1000}
//       height={603}
//       options={{ maintainAspectRatio: false }}
//     />
//   );
// }
