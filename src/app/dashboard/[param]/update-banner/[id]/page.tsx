"use client";
import axiosInstance from "@/axios/axiosConfig";
import { CustomButton } from "@/utils/CustomButton";
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
import { useEffect } from "react";

type FieldType = {
  link?: string;
  imageUrl?: string;
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function UpdateBanner() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const param = useParams();
  const getBannerbyId = async () => {
    const res = await axiosInstance
      .get("get-banner?bannerId=" + param.id)
      .then((res) => {
        form.setFieldsValue({
          link: res.data.banner.link,
          imageUrl: res.data.banner.imageUrl,
        });
      });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await axiosInstance.patch("/edit-banner", values);
      console.log(res);

      if (res.status === 200) {
        messageApi.success("Sửa banner thành công");
        form.resetFields();
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        messageApi.error("Sửa banner không thành công");
      }
    } catch {
    } finally {
    }
  };
  useEffect(() => {
    getBannerbyId();
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
            <Form.Item<FieldType> label="Link" name="link">
              <Input />
            </Form.Item>

            <Form.Item<FieldType> label="Link ảnh" name="imageUrl">
              <Input />
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
