"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

interface WeightData {
  date: string;
  weight_kg: number;
}

const WeightLineChart = ({ weightData }: { weightData: WeightData[] }) => {
  const data = {
    labels: weightData.map((w) => w.date),
    datasets: [
      {
        label: "Peso Corporal (kg)",
        data: weightData.map((w) => w.weight_kg),
        fill: false,
        borderColor: "rgb(60, 164, 100)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="p-6 bg-[#FEFFEF] border rounded-2xl shadow max-w-3xl">
      <h2 className="text-lg font-bold text-[#1E1E1E] mb-4">
        Evolución de Peso Corporal
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default WeightLineChart;
