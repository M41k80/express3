import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement
);

interface WorkoutData {
  date: string;
  exercise_name: string;
  sets: number;
  reps: number;
  weight_kg: number;
}

interface WeightData {
  date: string;
  weight_kg: number;
}

const DashboardCharts = ({
  workoutData,
  weightData,
}: {
  workoutData: WorkoutData[];
  weightData: WeightData[];
}) => {
  const barChartData = {
    labels: workoutData.map((w) => w.exercise_name),
    datasets: [
      {
        label: "Repeticiones",
        data: workoutData.map((w) => w.reps),
        backgroundColor: "rgb(128, 252, 138)",
        borderColor: "rgb(7, 121, 17)",
        borderWidth: 1,
      },
    ],
  };

  const lineChartData = {
    labels: weightData.map((w) => w.date),
    datasets: [
      {
        label: "Peso Corporal (kg)",
        data: weightData.map((w) => w.weight_kg),
        fill: false,
        borderColor: "rgb(7, 121, 17)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Progreso de Peso Corporal
        </h2>
        <div className="p-6 bg-[#FEFFEF] border rounded-lg shadow-lg text-gray-700">
          <Line data={lineChartData} options={{ responsive: true }} />
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Repeticiones por Ejercicio
        </h2>
        <div className="p-6 bg-[#FEFFEF] border rounded-lg shadow-lg text-gray-700">
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardCharts;
