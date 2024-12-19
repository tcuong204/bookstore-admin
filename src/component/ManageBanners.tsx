import axiosInstance from "@/axios/axiosConfig";
import { ConfigProvider, Divider, message, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
interface banner {
  id: number;
  imageUrl: string;
  link: string | null;
  createdAt: string;
  updatedAt: string;
}
export default function ManageBanners() {
  const [listbanner, setListBanner] = useState<banner[]>();
  const [isModalOpen, setIsModalOpen] = useState<true | false>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<true | false>(false);
  const getBanner = async () => {
    const res = await axiosInstance
      .get("/get-banners")
      .then((res) => setListBanner(res.data.banners));
  };
  const showModal = () => {
    setIsAnimating(true); // Bắt đầu animation mở
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsAnimating(false); // Kích hoạt animation đóng
    setTimeout(() => setIsModalOpen(false), 300); // Chờ animation kết thúc (0.3s)
  };
  console.log(listbanner);
  useEffect(() => {
    getBanner();
  }, []);
  return (
    <div className="p-4">
      <div className="bg-[#fff]">
        <ConfigProvider
          theme={{
            token: { colorPrimary: "#C62027", colorLinkHover: "#C62027" },
            components: { Table: { rowSelectedHoverBg: "#C62027" } },
          }}
        >
          <Table<banner> dataSource={listbanner} rowKey="id" pagination={false}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Ảnh" dataIndex="imageUrl" key="imageUrl" />
            <Column title="Ngày tạo" dataIndex="createdAt" key="createdAt" />
            <Column
              title=""
              key="action"
              render={(_: any, record: banner) => (
                <Space size="middle">
                  <a
                    onClick={() => {
                      // showModal();
                      // setId(record.id);
                    }}
                  >
                    <DeleteOutlined />
                    Xóa
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
                                {/* Bạn có chắc chắn xóa "{record.firstName}{" "}
                                  {record.lastName}" */}
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
                                // onClick={() => handleDelete(record.id)}
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
              render={(_: any, record: banner) => (
                <Space size="middle">
                  <a
                  // onClick={() =>
                  //   router.push(`manage-account/update-user/${record.id}`)
                  // }
                  >
                    <EditOutlined />
                    Sửa
                  </a>
                </Space>
              )}
            />
          </Table>
          <div className="p-4">
            {/* <Pagination
                align="end"
                defaultCurrent={1}
                pageSize={5}
                total={listUserRes?.pagination?.totalItems}
                onChange={(e) => setPage(e)}
              /> */}
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
}
