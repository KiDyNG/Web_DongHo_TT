import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Table, Image, Button, Typography, Space, Card, List } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { UrlImage } from "../../url";
import {
  removeCart,
  decreaseCart,
  addTocart,
  getTotal,
} from "../../redux/silce/customer/cartSlice";
import Order from "./Order";

const { Text } = Typography;

const CartItem = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    dispatch(getTotal());

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [cart, dispatch]);

  const removeCartClick = (product) => {
    dispatch(removeCart(product));
  };

  const decreaseCartClick = (product) => {
    dispatch(decreaseCart(product));
  };

  const increaseCartClick = (product) => {
    dispatch(addTocart(product));
  };

  const columns = [
    {
      title: "SẢN PHẨM",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={URL_IMAGE + image} width={120} />,
    },
    {
      title: "TÊN",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <Text style={{ width: 400, textAlign: "left" }}>{text}</Text>
      ),
    },
    {
      title: "GIÁ",
      dataIndex: "price",
      key: "price",
      render: (price) => <Text strong>{price.toLocaleString("vi-VN")} đ</Text>,
    },
    {
      title: "SỐ LƯỢNG",
      key: "quantity",
      render: (_, record) => (
        <Space>
          <Button
            icon={<MinusCircleOutlined />}
            onClick={() => decreaseCartClick(record)}
            style={{ color: "#14134f", border: "none" }}
          />
          <Text>{record.cartQuantity}</Text>
          <Button
            icon={<PlusCircleOutlined />}
            onClick={() => increaseCartClick(record)}
            style={{ color: "#14134f", border: "none" }}
          />
        </Space>
      ),
    },
    {
      title: "TỔNG TIỀN",
      key: "total",
      render: (_, record) => (
        <Text strong>
          {(record.cartQuantity * record.price).toLocaleString("vi-VN")} đ
        </Text>
      ),
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => removeCartClick(record)}
          style={{ fontSize: 24, color: "#14134f", border: "none" }}
        />
      ),
    },
  ];

  const renderMobileCart = () => (
    <List
      dataSource={cart}
      renderItem={(item) => (
        <Card style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Image src={URL_IMAGE + item.image} width={120} />
            <Text strong>{item.name}</Text>
            <Text>Giá: {item.price.toLocaleString("vi-VN")} đ</Text>
            <Space>
              <Button
                icon={<MinusCircleOutlined />}
                onClick={() => decreaseCartClick(item)}
                style={{ color: "#14134f", border: "none" }}
              />
              <Text>{item.cartQuantity}</Text>
              <Button
                icon={<PlusCircleOutlined />}
                onClick={() => increaseCartClick(item)}
                style={{ color: "#14134f", border: "none" }}
              />
            </Space>
            <Text strong>
              Tổng: {(item.cartQuantity * item.price).toLocaleString("vi-VN")} đ
            </Text>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => removeCartClick(item)}
              style={{ color: "#14134f", border: "none" }}
            >
              Xóa
            </Button>
          </Space>
        </Card>
      )}
      locale={{
        emptyText: (
          <Text strong style={{ color: "gray", fontSize: 18 }}>
            GIỎ HÀNG TRỐNG
          </Text>
        ),
      }}
    />
  );

  return (
    <div style={{ marginBottom: "100px" }} className="container">
      <div className="container-fluid" style={{ marginTop: "50px" }}>
        {isMobile ? (
          renderMobileCart()
        ) : (
          <Table
            columns={columns}
            dataSource={cart}
            pagination={false}
            locale={{
              emptyText: (
                <Text strong style={{ color: "gray", fontSize: 18 }}>
                  GIỎ HÀNG TRỐNG
                </Text>
              ),
            }}
          />
        )}
      </div>
      <Order />
    </div>
  );
};

export default CartItem;
