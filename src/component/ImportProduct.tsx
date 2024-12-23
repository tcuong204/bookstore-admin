import axiosInstance from "@/axios/axiosConfig";
import {
  ConfigProvider,
  Divider,
  message,
  Pagination,
  Space,
  Table,
} from "antd";
import Column from "antd/es/table/Column";
import { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDateTime } from "@/utils/ProductUtils";
import { CustomButton } from "@/utils/CustomButton";
import { useRouter } from "next/navigation";
import {
  getImportbyPage,
  ImportItem,
  ImportsResponse,
} from "@/utils/ImportProductUtils";

export default function ImportProduct() {
  const [listImport, setListImport] = useState<ImportsResponse>();
  const [isModalOpen, setIsModalOpen] = useState<true | false>(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [page, setPage] = useState<number>(1);
  const router = useRouter();
  const getImport = async () => {
    const res = await getImportbyPage(page);
    if (res) {
      setListImport(res);
    }
  };
  useEffect(() => {
    getImport();
  }, [page]);
  const handleDelete = async (id: number | null) => {
    try {
      const res = await axiosInstance.delete("delete-banner?bannerId=" + id);
      if (res.status === 200) {
        messageApi.success("Xóa banner thành công");
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
            onClick={() => router.push("import-product/create-import")}
            buttonText="Thêm import"
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
          <Table<ImportsResponse>
            dataSource={listImport?.imports}
            rowKey="id"
            pagination={false}
          >
            <Column title="Id" dataIndex="id" key="id" />
            <Column title="Số lượng" dataIndex="quantity" key="quantity" />
            <Column
              title="Giá"
              dataIndex="price"
              key="price"
              render={(_: any, record: ImportItem) => (
                <Space size="middle">
                  <p>{record.price.toLocaleString("en-US")}đ</p>
                </Space>
              )}
            />
            <Column
              title="Ngày tạo"
              dataIndex="createdAt"
              key="createdAt"
              render={(_: any, record: ImportItem) => (
                <Space size="middle">
                  <p>{formatDateTime(record.createdAt)}</p>
                </Space>
              )}
            />
            <Column
              title="Sản phẩm"
              dataIndex="createdAt"
              key="createdAt"
              render={(_: any, record: ImportItem) => (
                <Space size="middle">{record.product.name}</Space>
              )}
            />
            <Column
              title="Mã sản phẩm"
              dataIndex="createdAt"
              key="createdAt"
              render={(_: any, record: ImportItem) => (
                <Space size="middle">{record.product.productCode}</Space>
              )}
            />
            <Column
              title=""
              key="action"
              render={(_: any, record: ImportItem) => (
                <Space size="middle">
                  <a
                    onClick={() =>
                      router.push(`import-product/update-import/${record.id}`)
                    }
                  >
                    <EditOutlined />
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
              total={listImport?.pagination?.totalImport}
              onChange={(e) => setPage(e)}
            />
          </div>
        </ConfigProvider>
      </div>
    </div>
  );
}
