import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Typography } from "antd";
import { authLoginAdmin } from "../../redux/silce/admin/authSlice";

const { Header } = Layout;
const { Text } = Typography;

const Nav = () => {
  const dispatch = useDispatch();
  const { dataAdmin } = useSelector((state) => state.admin.auth);

  useEffect(() => {
    dispatch(authLoginAdmin());
  }, [dispatch]);

  return (
    <Header
      style={{
        background: "#fff",
        padding: "0 16px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      {dataAdmin && dataAdmin.name && (
        <Text strong style={{ color: "#14134f" }}>
          Xin chào, {dataAdmin.name}!
        </Text>
      )}
    </Header>
  );
};

export default Nav;
