import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Layout, Menu, Image, message } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { logoutAdmin } from "../../redux/silce/admin/authSlice";
import logo from "../../assets/customer/images/logo-xd.png";

const { Sider } = Layout;

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutClick = () => {
    dispatch(logoutAdmin()).then((res) => {
      if (res.payload && res.payload.success === true) {
        message.success(res.payload.message);
        navigate("/admin");
      }
    });
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      onClick: () => navigate("/admin/dashboard"),
    },
    {
      key: "orders",
      icon: <ShoppingOutlined />,
      label: "Đơn Hàng",
      onClick: () => navigate("/admin/orders"),
    },
    {
      key: "products",
      icon: <ShoppingCartOutlined />,
      label: "Sản Phẩm",
      onClick: () => navigate("/admin/products"),
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Đăng Xuất",
      onClick: logoutClick,
    },
  ];

  return (
    <Sider
      width={200}
      style={{
        background: "#fff",
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
      }}
    >
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Image src={logo} alt="logo" width={150} preview={false} />
      </div>
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        style={{ borderRight: 0 }}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
