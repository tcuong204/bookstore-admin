"use client";
import ManageAccounts from "@/component/ManageAccount";
import ManageBanners from "@/component/ManageBanners";
import ManageOrders from "@/component/ManageOrders";
import ManageProducts from "@/component/ManageProducts";
import { useParams } from "next/navigation";

const AccountParamPage = () => {
  const params = useParams();
  const param = params?.param;
  const renderContent = () => {
    switch (param) {
      case "manage-accounts":
        return <ManageAccounts />;
      case "manage-banners":
        return <ManageBanners />;
      case "manage-orders":
        return <ManageOrders />;
      case "manage-products":
        return <ManageProducts />;
      default:
        return <div>Nội dung không tồn tại.</div>;
    }
  };

  return <div>{renderContent()}</div>;
};

export default AccountParamPage;
