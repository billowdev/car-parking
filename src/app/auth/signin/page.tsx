"use client";

import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { ICredential } from "@/interfaces/common.interface";
// import * as userService from '@/services/user.service';
import WithAuth from "@/components/WithAuth";

import {
  useRouter,
} from "next/navigation";
import { postLogin } from "@/services/user.service";
import {
  API_REQUEST_SUCCESS,
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from "@/configs/constants/index";
import { NextResponse, setCookie } from "next/server";
import Swal from "sweetalert2";
const SigninPage: React.FC = () => {
  const router = useRouter();

  const onFinish = async (values: ICredential) => {
    try {
      const response = await postLogin(values);
      if (response.message == API_REQUEST_SUCCESS) {
        const responseData = response.data;
        const access = responseData.access_token;
        localStorage.setItem(ACCESS_TOKEN_KEY, access);
        localStorage.setItem(REFRESH_TOKEN_KEY, access);
        const refresh = responseData.refresh_token;
        Swal.fire({
          icon: "success",
          title: "สำเร็จ",
          text: "เข้าสู่ระบบสำเร็จ",
          confirmButtonText: "ปิด",
        });
        router.push('/');
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สำเร็จ",
          text: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง",
          confirmButtonText: "ปิด",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "ไม่สำเร็จ",
        text: "เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง",
        confirmButtonText: "ปิด",
      });
    }
  };

  return (
    <div className="flex ">
      <div className="justify-center items-center h-screen">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "กรุณากรอกชื่อผู้ใช้ของคุณ!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "กรุณรากรอกรหัสผ่าน!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            เข้าสู่ระบบ
          </Button>
          หรือ <a href="">สมัครสมาชิก!</a>
        </Form.Item>
      </Form>
         </div>
      
    </div>
  );
};
export default WithAuth(SigninPage);
