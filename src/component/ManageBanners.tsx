import axiosInstance from "@/axios/axiosConfig";
import { ConfigProvider, Divider, message, Space, Table } from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDateTime } from "@/utils/ProductUtils";
import { CustomButton } from "@/utils/CustomButton";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState<true | false>(false);
  const [selectedBanner, setSelectedBanner] = useState<banner | null>(null);
  const getBanner = async () => {
    const res = await axiosInstance
      .get("/get-banners")
      .then((res) => setListBanner(res.data.banners));
  };
  const showModal = () => {
    setSelectedBanner(null);
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
  const handleDelete = async (id: number | undefined) => {
    try {
      const res = await axiosInstance.delete("/delete-banner?bannerId=" + id);
      if (res.status === 200) {
        messageApi.success("Xóa banner thành công");
        getBanner();
      } else {
        messageApi.error("Xóa banner không thành công");
      }
    } catch {}
  };
  return (
    <div className="p-4">
      <div className="bg-[#fff]">
        <div className="flex justify-end p-4">
          <CustomButton
            className="w-[20%]"
            onClick={() => router.push("manage-banners/create-banner")}
            buttonText="Thêm banner"
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
          <Table<banner> dataSource={listbanner} rowKey="id" pagination={false}>
            <Column title="Id" dataIndex="id" key="id" />
            <Column
              title="Ảnh"
              dataIndex="imageUrl"
              key="imageUrl"
              render={(_: any, record: banner) => (
                <Space size="middle">
                  <img src={record.imageUrl} width={60}></img>
                </Space>
              )}
            />
            <Column
              title="Ngày tạo"
              dataIndex="createdAt"
              key="createdAt"
              render={(_: any, record: banner) => (
                <Space size="middle">
                  <p>{formatDateTime(record.createdAt)}</p>
                </Space>
              )}
            />
            <Column
              title=""
              key="action"
              render={(_: any, record: banner) => (
                <Space size="middle">
                  <a
                    onClick={() => {
                      setSelectedBanner(record);
                      showModal();
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
                              <b className="text-[20px]">Xóa banner</b>
                            </div>
                            <Divider style={{ margin: 0 }} />
                            <div className="h-[60px] flex justify-center items-center">
                              <p>Bạn có chắc chắn xóa banner này</p>
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
                                onClick={() => handleDelete(selectedBanner?.id)}
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
                    onClick={() =>
                      router.push(`manage-banner/update-banner/${record.id}`)
                    }
                  >
                    <EditOutlined />
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
      {contextHolder}
    </div>
  );
}
