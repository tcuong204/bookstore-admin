"use client";
import axiosInstance from "@/axios/axiosConfig";
import { getListOrder, Order, OrdersResponse } from "@/utils/OrderUtils";
import { formatDateTime } from "@/utils/ProductUtils";
import {
  ConfigProvider,
  Divider,
  message,
  Pagination,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
interface LabelStatus {
  value: string;
  label: string;
}
const { Option } = Select;
const Allstatus = [
  {
    label: "Đang xử lí",
    value: "processing",
    color: "#00cbff",
  },
  {
    label: "Đang vận chuyển",
    value: "shipping",
    color: "#00ff77",
  },

  {
    label: "Đã hủy",
    value: "returned",
    color: "#ff005d",
  },
];
const labelStatus: LabelStatus[] = [
  { value: "unpaid", label: "Chưa trả tiền" },
  { value: "paid", label: "Đã trả tiền" },
];
const getLabelByValue = (value: string): string | undefined => {
  const status = labelStatus.find((item) => item.value === value);
  return status?.label;
};
const getLabelAllStatus = (value: string): string | undefined => {
  const status = Allstatus.find((item) => item.value === value);
  return status?.label;
};
const { Column, ColumnGroup } = Table;
export default function ManageOrders() {
  const [listOrder, setListOrder] = useState<OrdersResponse | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<true | false>(false);
  console.log(labelStatus);
  const handleChange = async (value: string, id: number, type: string) => {
    let body;
    setIsLoading(true);
    if (type === "status") {
      body = { orderId: id, status: value };
    } else {
      body = { orderId: id, paymentStatus: value };
    }
    const data = axiosInstance.patch("/update-order", body).then((res) => {
      if (res.status === 200) {
        messageApi.success("Cập nhật trạng thái thành công");
      } else {
        messageApi.error("Cập nhật trạng thái không thành công");
      }
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };
  const getUser = async () => {
    try {
      const data = await getListOrder(page);
      if (data) {
        setListOrder(data);
      }
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
            <Table<Order>
              dataSource={listOrder?.orders}
              rowKey="id"
              pagination={false}
            >
              <Column title="Id" dataIndex="id" key="id" />
              <Column
                title="Trạng thái đơn hàng"
                key="action"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <Select
                      defaultValue={record.status}
                      style={{ width: 120 }}
                      onChange={(e) => handleChange(e, record.id, "status")}
                      options={[
                        { value: "processing", label: "Đang xử lí" },
                        { value: "shipping", label: "Đang giao" },
                        { value: "completed", label: "Hoàn thành" },
                        { value: "returned", label: "Đã hủy" },
                      ]}
                    />
                  </Space>
                )}
              />
              <Column
                title="Trạng thái"
                key="action"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <Select
                      defaultValue={record.paymentStatus}
                      style={{ width: 120 }}
                      onChange={(e) =>
                        handleChange(e, record.id, "paymentStatus")
                      }
                      options={[
                        { value: "paid", label: "Đã thanh toán" },
                        { value: "unpaid", label: "Chưa thanh toán" },
                      ]}
                    />
                  </Space>
                )}
              />
              {/* <Column
                title="Trạng thái đơn hàng"
                dataIndex="status"
                key="status"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <Tag color="green">{getLabelAllStatus(record.status)}</Tag>
                  </Space>
                )}
              /> */}
              {/* <Column
                title="Trạng thái"
                dataIndex="paymentStatus"
                key="paymentStatus"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <p>{getLabelByValue(record.paymentStatus)}</p>
                  </Space>
                )}
              /> */}
              <Column
                title="Phương thức"
                dataIndex="paymentMethod"
                key="paymentMethod"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <p>
                      {record.paymentMethod === "cash_on_delivery" ? (
                        <p>COD</p>
                      ) : (
                        <p>Chuyển khoản</p>
                      )}
                    </p>
                  </Space>
                )}
              />
              <Column
                title="Ngày đặt"
                dataIndex="orderDate"
                key="orderDate"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <p>{formatDateTime(record.orderDate)}</p>
                  </Space>
                )}
              />
              <Column
                title="Giá sản phẩm"
                dataIndex="totalAmount"
                key="totalAmount"
                render={(_: any, record: Order) => (
                  <Space size="middle">
                    <p>{record.totalAmount?.toLocaleString("en-US")}đ</p>
                  </Space>
                )}
              />
            </Table>
            <div className="p-4">
              <Pagination
                align="end"
                defaultCurrent={1}
                pageSize={5}
                total={listOrder?.pagination?.totalOrders}
                onChange={(e) => setPage(e)}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
