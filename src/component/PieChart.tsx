"use client";
import { Chart as ChartJS, Tooltip, ArcElement, Legend } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/axios/axiosConfig";

ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = () => {
  const [orders, setOrders] = useState();
  const date = new Date();
  const getOrders = async () => {
    const res = await axiosInstance(
      "/get-order-statistics?startDate=2024-12-02&endDate=2024-12-23"
    ).then((res) => setOrders(res.data.data));
  };

  const data = {
    labels: ["Đang xử lí", "Đang giao", "Hoàn thành", "Hủy"],
    datasets: [
      {
        label: "My First Dataset",
        data: [0, 10, 0, 1],
        backgroundColor: [
          "rgb(255, 205, 86)",
          "rgb(54, 162, 235)",
          "#BBE8A3",
          "rgb(255, 99, 132)",
        ],
        hoverOffset: 4,
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
        text: "14 ngày gần nhất",
      },
    },
  };
  useEffect(() => {
    getOrders();
  }, []);
  return <Pie data={data} options={options} className="h-[360px]" />;
};

export default PieChart;
