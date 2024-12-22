"use client";

import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
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
export default function ManageAccounts() {
  const [listUserRes, setListUserRes] = useState<ResponseListUsers | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState<true | false>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<true | false>(false);
  const router = useRouter();
  const [id, setId] = useState<number | null>(null);
  const showModal = () => {
    setIsAnimating(true); // Bắt đầu animation mở
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsAnimating(false); // Kích hoạt animation đóng
    setTimeout(() => setIsModalOpen(false), 300); // Chờ animation kết thúc (0.3s)
  };
  const getUser = async () => {
    try {
      const data = await getListUser(page);
      if (data) {
        setListUserRes(data);
      }
    } catch {
      (e: any) => console.log(e);
    } finally {
    }
  };
  useEffect(() => {
    getUser();
  }, [page]);
  const handleDelete = async (id: number | null) => {
    try {
      const res = await axiosInstance.delete("delete-user?id=" + id);
      if (res.status === 200) {
        messageApi.success("Xóa người dùng thành công");
        setId(null);
        getUser();
      } else {
        messageApi.error("Xóa người dùng không thành công");
      }
    } catch {}
  };
  return (
    <div className="p-4 ">
      <div className="m-4 bg-[#fff] rounded-lg">
        <div className="">
          <div className="flex justify-end p-4">
            <CustomButton
              className="w-[20%]"
              onClick={() => router.push("manage-accounts/create-user")}
              buttonText="Thêm người dùng"
              buttonType="primary"
              disabled={false}
              htmlType="button"
            />
          </div>
          <ConfigProvider
            theme={{
              token: { colorPrimary: "#C62027", colorLinkHover: "#C62027" },
              components: { Table: { rowSelectedHoverBg: "#C62027" } },
            }}
          >
            <Table<UserManager>
              dataSource={listUserRes?.users}
              rowKey="id"
              pagination={false}
            >
              <Column title="Id" dataIndex="id" key="id" />
              <Column title="Họ" dataIndex="firstName" key="firstName" />
              <Column title="Tên" dataIndex="lastName" key="lastName" />
              <Column title="Email" dataIndex="email" key="email" />
              <Column
                title="Vai trò"
                dataIndex="userType"
                key="email"
                render={(data) =>
                  data === "customer" ? (
                    <span>Người dùng</span>
                  ) : (
                    <span>Admin</span>
                  )
                }
              />
              <Column title="SĐT" dataIndex="phoneNumber" key="phoneNumber" />
              <Column
                title=""
                key="action"
                render={(_: any, record: UserManager) => (
                  <Space size="middle">
                    <a
                      onClick={() => {
                        showModal();
                        setId(record.id);
                      }}
                    >
                      <DeleteOutlined />
                    </a>
                    {isModalOpen && (
                      <div
                        className={`modal-mask ${
                          isAnimating ? "modal-mask-active" : ""
                        }`}
                        onClick={closeModal}
                      >
                        <div
                          className={`modal-content ${
                            isAnimating
                              ? "modal-enter-active"
                              : "modal-exit-active"
                          }`}
                        >
                          <div className="flex  justify-center items-center h-full">
                            <div className="bg-[#fff] w-[400px]">
                              <div className="p-4 flex justify-center">
                                <b className="text-[20px]">Xóa tài khoản</b>
                              </div>
                              <Divider style={{ margin: 0 }} />
                              <div className="h-[60px] flex justify-center items-center">
                                <p>
                                  Bạn có chắc chắn xóa "{record.firstName}{" "}
                                  {record.lastName}"
                                </p>
                              </div>
                              <div
                                className="p-4"
                                style={{
                                  display: "flex",
                                  gap: "10px",
                                  marginTop: "20px",
                                  justifyContent: "center",
                                }}
                              >
                                <button
                                  className="button-cancel"
                                  onClick={closeModal}
                                >
                                  Hủy
                                </button>
                                <button
                                  className="button-confirm"
                                  onClick={() => handleDelete(record.id)}
                                >
                                  Xác nhận
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Space>
                )}
              />
              <Column
                title=""
                key="action"
                render={(_: any, record: UserManager) => (
                  <Space size="middle">
                    <a
                      onClick={() =>
                        router.push(`manage-account/update-user/${record.id}`)
                      }
                    >
                      <EditOutlined />
                    </a>
                  </Space>
                )}
              />
              <Column
                title=""
                key="action"
                render={(_: any, record: UserManager) => (
                  <Space size="middle">
                    <a
                      onClick={() =>
                        router.push(`manage-account/detail-user/${record.id}`)
                      }
                    >
                      <InfoCircleOutlined />
                    </a>
                  </Space>
                )}
              />
            </Table>
            <div className="p-4">
              <Pagination
                align="end"
                defaultCurrent={1}
                pageSize={5}
                total={listUserRes?.pagination?.totalItems}
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
