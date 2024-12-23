"use client";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import { InboxOutlined } from "@ant-design/icons";
import { DetailProduct } from "@/utils/ProductUtils";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Select,
  Upload,
  UploadProps,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const { Option } = Select;
const onFinishFailed: FormProps<DetailProduct>["onFinishFailed"] = (
  errorInfo
) => {
  console.log("Failed:", errorInfo);
};
const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
export default function CreateProduct() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [select, setSelect] = useState("1");
  const onFinish: FormProps<DetailProduct>["onFinish"] = async (values) => {
    const body = { ...values, image: "", genreId: select };
    try {
      const res = await axiosInstance.post("/add-product", body);
      console.log(res);

      if (res.status === 201) {
        messageApi.success("Thêm sản phẩm thành công");
        form.resetFields();
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        messageApi.error("Thêm sản phẩm không thành công");
      }
    } catch {
    } finally {
    }
  };
  return (
    <div className="p-4">
      <div className="p-4 bg-[#fff]">
        <div className="flex">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
            className="w-[60%]"
          >
            <div className="grid grid-cols-2">
              <Form.Item<DetailProduct>
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item<DetailProduct>
                label="Tác giả"
                name="author"
                rules={[{ required: true, message: "Vui lòng nhập tác giả!" }]}
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>
              <Form.Item<DetailProduct> label="Nhà cung cấp" name="supplier">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct> label="NXB" name="publisher">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct> label="Giá ban đầu" name="price">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct>
                label="Giá khuyến mại"
                name="originalPrice"
              >
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct> label="Mã sản phẩm" name="productCode">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct>
                label="Năm phát hành"
                name="publishYear"
              >
                <Input />
              </Form.Item>

              <Form.Item<DetailProduct> label="Trọng lượng" name="weight">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct> label="Kích thước" name="size">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct> label="Số trang" name="quantityOfPages">
                <Input />
              </Form.Item>
              <Form.Item<DetailProduct>
                label="Số lượng"
                name="quantityAvailable"
              >
                <Input />
              </Form.Item>
            </div>
            <Select defaultValue={"1"} onChange={(e) => setSelect(e)}>
              <Option value="1">Tieu thuyet</Option>
              <Option value="2">Nhan vat - Bai hoc Kinh doanh</Option>
              <Option value="6">Truyện thiếu nhi</Option>
              <Option value="7">Lịch sử</Option>
              <Option value="8">Địa lý</Option>
              <Option value="3"> Fantance</Option>
              <Option value="4"> Business</Option>
            </Select>
            <Form.Item<DetailProduct> label="Mô tả" name="description">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item label={null} className="ml-[50%]">
              <CustomButton
                className=""
                onClick={() => router.back()}
                buttonText="Hủy"
                buttonType="default"
                disabled={false}
                htmlType="button"
              />
              <CustomButton
                className="ml-[1rem]"
                onClick={() => console.log("")}
                buttonText="Xác nhận"
                buttonType="primary"
                disabled={false}
                htmlType="submit"
              />
            </Form.Item>
          </Form>
          {/* <div>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div> */}
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
