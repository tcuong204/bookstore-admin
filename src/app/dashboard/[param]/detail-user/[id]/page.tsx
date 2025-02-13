"use client";
import axiosInstance from "@/axios/axiosConfig";
import { User } from "@/utils/Auth";
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
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type FieldType = {
  id: number;
  firstName?: string;
  lastName?: string;
  phoneNumber?: number;
  userType?: "customer" | "admin";
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
export default function DetailUser() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [user, setUser] = useState<User>();
  const [form] = Form.useForm();
  const pathname = usePathname();
  const getUser = async () => {
    const res = await axiosInstance.get(
      "/get-user-by-id?userId=" + pathname.split("/").pop()
    );
    const userData = res.data.user;
    setUser(userData);

    // Cập nhật giá trị cho form
    form.setFieldsValue({
      id: userData.id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phoneNumber,
      userType: userData.userType,
    });
  };
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      const res = await axiosInstance.patch("/edit-user", values);
      console.log(res);

      if (res.status === 200) {
        messageApi.success("Thêm người dùng thành công");
        setTimeout(() => {
          router.back();
        }, 1000);
      } else {
        messageApi.error("Thêm người dùng không thành công");
      }
    } catch {
    } finally {
    }
  };
  useEffect(() => {
    getUser();
  });
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
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType> label="Id" name="id">
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType> label="Họ" name="firstName">
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType> label="Tên" name="lastName">
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType> label="SĐT" name="phoneNumber">
              <Input disabled />
            </Form.Item>
            <Form.Item<FieldType> name="userType">
              <Select
                disabled
                className="!w-[200px] ml-[50%]"
                options={[
                  { value: "customer", label: "Người dùng" },
                  { value: "admin", label: "Admin" },
                ]}
              ></Select>
            </Form.Item>

            <Form.Item label={null} className="ml-[50%]">
              <CustomButton
                className=""
                onClick={() => router.back()}
                buttonText="Quay lại"
                buttonType="default"
                disabled={false}
                htmlType="button"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
      {contextHolder}
    </div>
  );
}
