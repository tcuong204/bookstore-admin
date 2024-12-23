"use client";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
import { Product } from "@/utils/ProductUtils";
import {
  Button,
  Checkbox,
  Form,
  FormProps,
  Input,
  message,
  Select,
} from "antd";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FieldType = {
  quantity?: number;
  price?: string;
  productId?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function UpdateBanner() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [product, setProduct] = useState<Product[]>([]);
  const param = useParams();
  const getBannerbyId = async () => {
    const res = await axiosInstance
      .get("get-import-by-id?importId=" + param.id)
      .then((res) => {
        form.setFieldsValue({
          quantity: res.data.importDetail.quantity,
          price: res.data.importDetail.price,
          productId: res.data.importDetail.productId,
        });
      });
  };
  const getAllProduct = async () => {
    const res = await axiosInstance
      .get("/get-products?limit=1000")
      .then((res) => {
        setProduct(res.data.products);
      });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const body = { ...values, importId: Number(param.id) };
    try {
      const res = await axiosInstance.patch("/update-import", body);
      console.log(res);

      if (res.status === 200) {
        messageApi.success("Sửa import thành công");
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        messageApi.error("Sửa import không thành công");
      }
    } catch {
    } finally {
    }
  };
  useEffect(() => {
    getBannerbyId();
    getAllProduct();
  }, []);
  return (
    <div className="p-4">
      <div className="p-4 bg-[#fff]">
        <div className="flex justify-center">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ width: 700 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="Số lượng"
              name="quantity"
              rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Giá"
              name="price"
              rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="Sản phẩm"
              name="productId"
              rules={[{ required: true, message: "Vui lòng chọn sản phẩm!" }]}
            >
              <Select
                options={product
                  .map((a) => [
                    {
                      label: a.name,
                      value: a.id,
                    },
                  ])
                  .flat()}
              />
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
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
