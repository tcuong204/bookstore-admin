"use client";

import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import { BestSellerProps } from "@/utils/ProductUtils";
import { getListUser, ResponseListUsers, UserManager } from "@/utils/UserUtils";
import {
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import {
  ConfigProvider,
  Divider,
  message,
  Pagination,
  Space,
  Table,
  Tag,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const { Column, ColumnGroup } = Table;
export default function BestSeller() {
  const [bestseller, setbestseller] = useState<BestSellerProps | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<true | false>(false);
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const getUser = async () => {
    try {
      const data = await axiosInstance
        .get("/get-bestseller?limit=5")
        .then((res) => setbestseller(res.data.products));
    } catch {
      (e: any) => console.log(e);
    } finally {
    }
  };
  useEffect(() => {
    getUser();
  }, [page]);
  return (
    <div className="p-4 ">
      <div className="m-4 bg-[#fff] rounded-lg">
        <div className="">
          <ConfigProvider
            theme={{
              token: { colorPrimary: "#C62027", colorLinkHover: "#C62027" },
              components: { Table: { rowSelectedHoverBg: "#C62027" } },
            }}
          >
            <Table<UserManager>
              dataSource={bestseller}
              rowKey="id"
              pagination={false}
            >
              <Column title="Id" dataIndex="id" key="id" />
              <Column
                width={200}
                title="Tên"
                dataIndex="name"
                key="name"
                render={(_: any, record: BestSellerProps) => (
                  <Space size="middle">
                    <p className="line-clamp-2">{record.name}</p>
                  </Space>
                )}
              />
              <Column
                title="Ảnh"
                dataIndex="image"
                key="image"
                render={(_: any, record: BestSellerProps) => (
                  <Space size="middle">
                    <img src={record.image} width={60}></img>
                  </Space>
                )}
              />
              <Column title="Giá" dataIndex="price" key="price" />
              <Column
                title="Số lượng bán"
                dataIndex="soldCount"
                key="soldCount"
              />
            </Table>
          </ConfigProvider>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
