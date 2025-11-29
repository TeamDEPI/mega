import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

function MyGraph() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Users",
        data: [5, 12, 8, 20, 17, 25, 30],
        borderColor: "#3b82f6",
        backgroundColor: "rgba(59,130,246,0.15)",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Clinics",
        data: [3, 9, 12, 10, 15, 18, 22],
        borderColor: "#10b981",
        backgroundColor: "rgba(16,185,129,0.15)",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
      {
        label: "Pending",
        data: [2, 4, 3, 8, 6, 10, 7],
        borderColor: "#f59e0b",
        backgroundColor: "rgba(245,158,11,0.15)",
        borderWidth: 3,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#e5e7eb",
        padding: 12,
        borderWidth: 0,
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#4b5563",
          font: {
            size: 14,
          },
        },
      },
      y: {
        grid: {
          color: "#e5e7eb",
        },
        ticks: {
          color: "#4b5563",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full  h-[420px]">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Monthly Activity Overview
      </h2>
      <div className="w-full h-full py-10">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default MyGraph;
