import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Legend, plugins } from "chart.js/auto";

function LineChart() {

  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My Dataset",
        data: [0, 59, 80, 81, 56, 55, 70],
        fill: false,
        borderColor: "rgba(85, 112, 241, 0.6)",
        tension: 0.1
      }
    ]
  };

  return <Line data={chartData} options={{
    scales: {
      y: {
        ticks: { beginAtZero: true }
      },
      x: {
        ticks: { beginAtZero: true }
      }
    },
    plugins:{
      legend:{
        display:false}
      }
    }
  }/>
}

export default LineChart;