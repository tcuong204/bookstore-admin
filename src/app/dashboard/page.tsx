"use client";
import { isLoggedIn } from "@/utils/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Divider, Modal } from "antd";
import dynamic from "next/dynamic";
interface PopupContextProps {
  openPopup: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const LineChart = dynamic(() => import("@/component/LineChart"), {
  ssr: false,
}); // Tắt SSR để tránh lỗi Chart.js
export default function Dashboard() {
  const [isLogin, setIsLogin] = useState<true | false>(false);
  const router = useRouter();
  useEffect(() => {
    setIsLogin(isLoggedIn);
    if (isLogin) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [isLogin]);
  return (
    <>
      <LineChart />
      <div>Đây là dashboard</div>
    </>
  );
}
