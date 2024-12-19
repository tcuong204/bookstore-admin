"use client";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale,
  Chart,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/axios/axiosConfig";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  CategoryScale
);
interface revenue {
  month?: string;
  date?: string;
  totalRevenue: number;
}
type LineChartProps = {
  type: "month" | "day";
};
const LineChart: React.FC<LineChartProps> = ({ type }) => {
  const [revenue, setRevenue] = useState<revenue[]>();
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // Trạng thái tải dữ liệu
  const [revenueData, setRevenueData] = useState<number[]>([]); // Dữ liệu doanh thu
  const [labels, setLabels] = useState<string[]>([]); // Nhãn biểu đồ
  const getRevenue = async (type: "day" | "month") => {
    const res = await axiosInstance(
      "/get-revenue-statistics?timeRange=" + type
    ).then((res) => setRevenue(res.data.data));
  };
  const data = {
    labels:
      type === "month"
        ? revenue?.map((a) => a.month)
        : revenue?.map((a) => a.date?.split("-").pop()),
    datasets: [
      {
        label: "VNĐ",
        data: revenue?.map((a) => a.totalRevenue),
        fill: false,
        borderColor: "#a91d21",
        tension: 0.1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: type === "day" ? "Tháng 12" : "2024",
      },
    },
  };
  useEffect(() => {
    getRevenue(type);
  }, [type]);
  useEffect(() => {
    if (chartRef.current) {
      if (!chartInstance.current) {
        // Khởi tạo biểu đồ
        chartInstance.current = new Chart(chartRef.current, {
          type: "line",
          data: {
            labels,
            datasets: [
              {
                label: "Revenue",
                data: revenueData,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.1,
              },
            ],
          },
        });
      } else {
        // Cập nhật dữ liệu
        chartInstance.current.data.labels = labels;
        chartInstance.current.data.datasets[0].data = revenueData;
        chartInstance.current.update();
      }
    }
  }, [labels, revenueData]); // Chỉ cập nhật khi dữ liệu thay đổi

  return <Line data={data} options={options} className="!h-[310px]" />;
};

export default LineChart;
