"use client";
// src/components/LayoutComponent.tsx
import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { ILayoutComponentProps } from "../types";
import { useRouter } from "next/navigation";
const { Header, Content, Footer, Sider } = Layout;
import Swal from "sweetalert2";
import { ACCESS_TOKEN_KEY } from '@/configs/constants/index';

const LayoutComponent: React.FC<ILayoutComponentProps> = ({
  children,
  colorBgContainer = "#fff",
  borderRadiusLG = "4px",
}) => {
  const breadcrumbItems: IBreadcrumbItem[] = [
    { path: "/", breadcrumbName: "Home" },
    { path: "/management/users", breadcrumbName: "User Management" },
  ];
  const [collapsed, setCollapsed] = useState(false);

  const router = useRouter();
  // Function to handle logout
  const handleLogout = () => {

    // Display confirmation dialog
    Swal.fire({
      title: "ยืนยัน ?",
      text: "คุณต้องการออกจากระบบ",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, ออกจากระบบ",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.clear();
        router.push("/auth/signin");
      }
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className="demo-logo-vertical" />

        <div
          style={{ display: "flex", flexDirection: "column", height: "100vh" }}
        >
          <div style={{ flex: 1 }}>
            <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
              <Menu.Item key="/" onClick={() => router.push("/managements/users")}>
                ข้อมูลผู้ใช้
              </Menu.Item>

              <Menu.Item key="logout" onClick={() => handleLogout()}>
                ออกจากระบบ
              </Menu.Item>
            </Menu>
          </div>
          {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px', marginBottom:"64px" }}>
        <Menu.Item key="logout" onClick={() => handleLogout()}>
          Logout
        </Menu.Item>
      </Menu>
    </div> */}
        </div>
      </Sider>

      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            {breadcrumbItems.map((item) => (
              <Breadcrumb.Item onClick={item.onClick} key={item.path}>
                {item.breadcrumbName}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Your Copyright ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutComponent;
