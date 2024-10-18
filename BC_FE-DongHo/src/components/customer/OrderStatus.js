import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Badge, Space } from "antd";
import {
  ClockCircleOutlined,
  CarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import {
  getOrderWait,
  getOrderShip,
  getOrderComplete,
  getOrderCancel,
} from "../../redux/silce/customer/orderSlice";

const OrderStatus = () => {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const navigate = useNavigate();
  const {
    orderWait,
    orderShip,
    orderComplete,
    orderCancel,
    handleOrderCancel,
    handleOrderConfirm,
  } = useSelector((state) => state.customer.order);
  const user = useSelector((state) => state.customer.auth.dataUser);

  useEffect(() => {
    dispatch(getOrderWait(user_id));
    dispatch(getOrderShip(user_id));
    dispatch(getOrderComplete(user_id));
    dispatch(getOrderCancel(user_id));
  }, [dispatch, user_id, handleOrderCancel, handleOrderConfirm]);

  const statusItems = [
    {
      key: "wait",
      icon: <ClockCircleOutlined />,
      text: "Chờ xác nhận",
      count: orderWait.length,
      onClick: () => navigate(`/order_wait/${user.id}`),
    },
    {
      key: "ship",
      icon: <CarOutlined />,
      text: "Đang giao",
      count: orderShip.length,
      onClick: () => navigate(`/order_ship/${user.id}`),
    },
    {
      key: "complete",
      icon: <CheckCircleOutlined />,
      text: "Đã nhận",
      count: orderComplete.length,
      onClick: () => navigate(`/order_complete/${user.id}`),
    },
    {
      key: "cancel",
      icon: <CloseCircleOutlined />,
      text: "Đã hủy",
      count: orderCancel.length,
      onClick: () => navigate(`/order_cancel/${user.id}`),
    },
  ];

  return (
    <Row justify="center" style={{ margin: "20px 0" }}>
      {statusItems.map((item) => (
        <Col key={item.key} xs={24} sm={12} md={6}>
          <Space
            direction="vertical"
            align="center"
            onClick={item.onClick}
            style={{ cursor: "pointer", width: "100%", textAlign: "center" }}
          >
            {item.icon}
            <span>{item.text}</span>
            <Badge count={item.count} style={{ backgroundColor: "#d1402c" }} />
          </Space>
        </Col>
      ))}
    </Row>
  );
};

export default OrderStatus;
