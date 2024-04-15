"use client";

import { ConfigProvider } from "antd";

const ConfigProviderPagination = ({ children }: React.PropsWithChildren) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            colorBgContainer: "#FFF5E0",
            colorPrimary: "#8DECB4",
            colorPrimaryHover: "#FFF5E0",
          },
          Select: {
            optionSelectedBg: "#FFF5E0",
            optionSelectedColor: "#8DECB4",
          },
          Input: {
            activeShadow: "0 0 0 2px rgba(5, 145, 255, 0.1)",
            warningActiveShadow: "0 0 0 2px rgba(5, 145, 255, 0.1)",
            errorActiveShadow: "0 0 0 2px rgba(255, 38, 5, 0.06)",
            addonBg: "rgba(0, 0, 0, 0.01)",
            hoverBorderColor: "#41B06E",
            activeBorderColor: "#41B06E",
          },
          Modal: {
            paddingContentHorizontal: 0,
          },
          Switch: {
            colorPrimary: "#141E46",
            colorPrimaryHover: "#141E46",
            colorPrimaryBorder: "#FFF5E0",
            colorBorderBg: "#FFF5E0",
            colorBgBase: "red",
            colorBgElevated: " red",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ConfigProviderPagination;
