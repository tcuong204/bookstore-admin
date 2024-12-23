"use client";
import { isLoggedIn } from "@/utils/Auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Divider, Flex, Modal, Radio } from "antd";
import dynamic from "next/dynamic";
import Link from "next/link";
interface PopupContextProps {
  openPopup: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
const options = [
  { label: "Tháng", value: "month" },
  { label: "Ngày", value: "day" },
];
const LineChart = dynamic(() => import("@/component/LineChart"), {
  ssr: false,
});
const PieChart = dynamic(() => import("@/component/PieChart"), {
  ssr: false,
});
const BestSeller = dynamic(() => import("@/component/BestSeller"), {
  ssr: false,
});
export default function Dashboard() {
  const [isLogin, setIsLogin] = useState<true | false>(false);
  const router = useRouter();
  const [lineChartType, setLineChartType] = useState<"day" | "month">("month");
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
      <div className="p-4">
        <div className=" mt-4 ml-4 flex">
          <div className="w-[60%] bg-[#fff] p-4  rounded-lg">
            <div className="flex justify-between">
              <b>Doanh thu</b>
              <div>
                <Radio.Group
                  block
                  options={options}
                  value={lineChartType}
                  optionType="button"
                  buttonStyle="solid"
                  onChange={(e) => setLineChartType(e.target.value)}
                />
              </div>
            </div>
            <LineChart type={lineChartType} />
          </div>
          <div className="w-[26%] bg-[#fff] ml-[2rem] p-4 rounded-lg">
            <div className="flex justify-center">
              <b>Đơn hàng</b>
            </div>

            <PieChart />
          </div>
        </div>
        <div className="bg-[#fff] p-4 w-[60%] ml-4 rounded-lg mt-4">
          <div>
            <b>Sản phẩm bán chạy</b>
            <Link href={"dashboard/manage-products"}>
              <BestSeller />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
