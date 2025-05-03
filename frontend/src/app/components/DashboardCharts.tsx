import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, LineElement, BarElement, CategoryScale, LinearScale, PointElement);

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

const DashboardCharts = ({ workoutData, weightData }: { workoutData: WorkoutData[], weightData: WeightData[] }) => {

    
    const barChartData = {
        labels: workoutData.map((w) => w.exercise_name),
        datasets: [{
            label: 'Repeticiones',
            data: workoutData.map((w) => w.reps),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        }],
    };

    // Gráfico de línea para el peso corporal
    const lineChartData = {
        labels: weightData.map((w) => w.date),
        datasets: [{
            label: 'Peso Corporal (kg)',
            data: weightData.map((w) => w.weight_kg),
            fill: false,
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.1,
        }],
    };

    return (
        <div className="grid gap-4 md:grid-cols-2">
            <div className="p-6 bg-white border rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">Repeticiones por Ejercicio</h2>
                <Bar data={barChartData} options={{ responsive: true }} />
            </div>

            <div className="p-6 bg-white border rounded-lg shadow-lg text-gray-900">
                <h2 className="text-xl font-semibold mb-4">Progreso de Peso Corporal</h2>
                <Line data={lineChartData} options={{ responsive: true }} />
            </div>
        </div>
    );
};

export default DashboardCharts;
