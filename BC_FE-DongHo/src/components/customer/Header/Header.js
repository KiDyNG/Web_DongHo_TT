import React, { useEffect } from "react";
import { Layout, Menu, Button, Badge, Avatar } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, logout } from "../../../redux/silce/customer/authSilce";
import { toast } from "react-toastify";
import { getTotal } from "../../../redux/silce/customer/cartSlice";
import { fetchAllCategory } from "../../../redux/silce/customer/categorySlice";
import SearchInput from "../SearchInput";
import logo from "../../../assets/customer/images/logo-xd.png";

const { Header } = Layout;

const HeaderComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const userLogin = useSelector((state) => state.customer.auth.dataUser);
  const { categoriesList } = useSelector((state) => state.customer.category);
  const { cartTotalQuantity, cartItem } = useSelector(
    (state) => state.customer.cart
  );

  useEffect(() => {
    dispatch(getTotal());
    dispatch(fetchAllCategory());
    dispatch(authLogin());
  }, [cartItem, dispatch]);

  const logoutClick = () => {
    dispatch(logout()).then((result) => {
      if (result.payload.success) {
        toast.success(result.payload.message);
        navigate("/login");
      }
    });
  };

  const userMenuItems = [
    {
      key: "account",
      label: "Tài khoản",
      icon: <Avatar icon={<UserOutlined />} />,
      children: [
        ...(isAuth && isAuth.success
          ? [
              { key: "welcome", label: `Hello! ${userLogin.name}` },
              {
                key: "orders",
                label: "Đơn Hàng",
                onClick: () => navigate(`/order_wait/${userLogin.id}`),
              },
              { key: "logout", label: "Đăng Xuất", onClick: logoutClick },
            ]
          : [
              {
                key: "login",
                label: "Đăng Nhập",
                onClick: () => navigate("/login"),
              },
              {
                key: "register",
                label: "Đăng Ký",
                onClick: () => navigate("/register"),
              },
            ]),
      ],
    },
  ];

  const menuItems = [
    { key: "home", label: "Trang Chủ", onClick: () => navigate("/") },
    ...categoriesList.map((item) => ({
      key: item.id,
      label: item.category_parent,
      children: item.categories.map((category) => ({
        key: category.id,
        label: category.name,
        onClick: () => navigate(`/category/${category.id}`),
      })),
    })),
    {
      key: "cart",
      label: (
        <Badge count={cartTotalQuantity}>
          <Button
            icon={<ShoppingCartOutlined style={{ fontSize: "20px" }} />}
            onClick={() => navigate("/cart")}
            style={{ border: "none" }}
          >
            Giỏ hàng
          </Button>
        </Badge>
      ),
    },
    ...userMenuItems,
  ];

  return (
    <Layout>
      <Header style={{ background: "#fff", padding: "0 50px" }}>
        <div
          style={{
            float: "left",
            width: 200,
            height: 60,
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "100%", cursor: "pointer" }}
            onClick={() => navigate("/")}
          />
        </div>
        <Menu
          mode="horizontal"
          items={menuItems}
          style={{ lineHeight: "64px" }}
        />
      </Header>
      <SearchInput />
    </Layout>
  );
};

export default HeaderComponent;
