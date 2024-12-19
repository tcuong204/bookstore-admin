import React from "react";
import { ConfigProvider, Button } from "antd";
import type { ThemeConfig } from "antd/es/config-provider/context";

const theme: ThemeConfig = {
  token: {
    colorPrimary: "#C62027", // Set primary color
    colorBgContainer: "#fff", // Background color for the button
    colorBorder: "#C62027", // Border color for buttons
    colorText: "#fff", // Text color for primary buttons
  },
  components: {
    Button: {
      colorPrimaryHover: "#a91d21", // Hover color for primary buttons
      colorBorder: "#C62027", // Border for default buttons
      colorTextDisabled: "#aaa", // Text color when disabled
      defaultColor: "#C62027",
    },
  },
};

// Define props for the custom button
interface CustomButtonProps {
  buttonText: string;
  onClick: () => void;
  className?: string;
  buttonType?: "primary" | "default";
  disabled: true | false;
  htmlType: "button" | "submit" | "reset";
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  buttonText,
  onClick,
  className,
  buttonType,
  disabled,
  htmlType,
}) => {
  return (
    <ConfigProvider theme={theme}>
      <Button
        type={buttonType}
        className={className}
        onClick={onClick}
        disabled={disabled}
        htmlType={htmlType}
        size="large"
      >
        {buttonText}
      </Button>
    </ConfigProvider>
  );
};
