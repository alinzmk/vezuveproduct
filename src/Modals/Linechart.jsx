import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, Legend, plugins } from "chart.js/auto";
import { useSelector } from "react-redux";

function LineChart() {

  
  const {dash} = useSelector((state) => state.dash);


  if (!dash || !dash.sales || !Array.isArray(dash.sales[0])) {
    return <div>Loading...</div>; // Or handle the loading state accordingly
  }

  const salesData = dash.sales[0].map((item) => item.value);

  const chartData = {
    labels: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
    datasets: [
      {
        label: "Satış",
        data: salesData,
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