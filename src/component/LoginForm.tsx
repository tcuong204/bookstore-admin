"use client";
import axiosInstance from "@/axios/axiosConfig";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import { Formik, FormikHelpers } from "formik";
interface Values {
  email: string;
  password: string;
}
import * as Yup from "yup";
export default function LoginForm() {
  const [messageApi, contextHolder] = message.useMessage();
  const handleLogin = async (
    values: Values,
    { setSubmitting }: FormikHelpers<Values>
  ) => {
    const body = JSON.stringify(values, null, 2);
    const response = await axiosInstance
      .post("/login", body)
      .then((response) => {
        const res = response;

        if (res.status === 200) {
          messageApi.success("Đăng nhập thành công");
          window.localStorage.setItem("token1", response?.data?.token);
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        } else {
          messageApi.error("Đăng nhập không thành công");
        }
      })
      .catch((error) => {
        messageApi.error("Đăng nhập không thành công");
      });
  };
  return (
    <div>
      <img
        src="/asset/scenery1.jpg"
        className="w-full h-full opacity-70 relative"
      ></img>
      <div className="absolute w-[350px] h-[350px] top-[40%] right-[50%]">
        <div className="flex justify-center text-[#C62027] text-[20px]">
          <label className="">Book Store - Admin</label>
        </div>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={handleLogin}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
              .required("Vui lòng nhập email"),
            password: Yup.string()
              .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
              .required("Vui lòng nhập mật khẩu"),
          })}
          validateOnMount={true}
        >
          {(props) => (
            <Form autoComplete="off">
              <Input
                className="input-login my-[1rem]"
                value={props.values.email}
                onChange={(e) => {
                  props.values.email = e.target.value;
                  props.validateForm();
                }}
                type="text"
                autoComplete="off"
              />
              {props.errors.email && props.touched.email && (
                <div className="text-[#C62027]">{props.errors.email}</div>
              )}
              <Input.Password
                className="input-login mb-[1rem]"
                value={props.values.password}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => {
                  props.values.password = e.target.value;
                  props.validateForm();
                }}
                autoComplete="off"
              />

              {props.errors.password && props.touched.password && (
                <div className="text-[#C62027]">{props.errors.password}</div>
              )}
              <div className="flex justify-center">
                <button
                  onClick={() => console.log()}
                  className="input-login !bg-[#C62027]/70 !text-[#fff] "
                  disabled={props.isSubmitting}
                  type="submit"
                >
                  Đăng nhập
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {contextHolder}
    </div>
  );
}
