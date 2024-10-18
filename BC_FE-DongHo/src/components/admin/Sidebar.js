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

const Sidebar = ({ collapsed, onCollapse }) => {
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
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div style={{ padding: "16px", textAlign: "center" }}>
        <Image
          src={logo}
          alt="logo"
          width={collapsed ? 40 : 80}
          preview={false}
        />
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={menuItems}
      />
    </Sider>
  );
};

export default Sidebar;
