import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  Form,
  Input,
  Radio,
  Button,
  Typography,
  Space,
  Card,
} from "antd";
import { getTotal } from "../../redux/silce/customer/cartSlice";
import { authLogin } from "../../redux/silce/customer/authSilce";
import {
  addOrderOff,
  addOrderOnl,
} from "../../redux/silce/customer/orderSlice";
import { clearCart } from "../../redux/silce/customer/cartSlice";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js/pure";

const { Title, Text } = Typography;

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const dataUser = useSelector((state) => state.customer.auth.dataUser);
  const { isLoadingOrder, isSuccessOrder } = useSelector(
    (state) => state.customer.order
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(authLogin());
    dispatch(getTotal());
  }, [cart, dispatch]);

  const isValidOrder = () => {
    if (isAuth === null) {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return false;
    }
    if (cart.length === 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return false;
    }
    if (!name) {
      toast.error("Vui lòng nhập tên người nhận ");
      return false;
    }
    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }
    const isValidPhone =
      /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g.test(
        phone
      );
    if (isValidPhone === false) {
      toast.error("Vui lòng nhập đúng số điện thoại");
      return false;
    }
    if (!payment) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    return true;
  };

  const orderClick = async () => {
    let check = isValidOrder();
    if (check === true) {
      let user_id = dataUser.id;
      let data_order = {
        cart: cart,
        user: {
          name: name,
          address: address,
          phone: phone,
          user_id: user_id,
          payment: payment,
        },
      };
      if (payment === "off") {
        dispatch(addOrderOff(data_order)).then((result) => {
          if (result.payload.success === true) {
            dispatch(clearCart());
            navigate("/order_success");
          }
        });
      }
      if (payment === "online") {
        const stripe = await loadStripe(
          "pk_test_51PEShMC1J19xsVaHRFSg1Ut7AQZU8WOYbZ7X7hQqh7enlkx71HB5jwRFuEq2yiXpb3kv6Dq7B4xjmSyErDXwpGtW0084FRy4LR"
        );
        dispatch(addOrderOnl(data_order)).then((result) => {
          if (result.payload.success === true) {
            stripe
              .redirectToCheckout({
                sessionId: result.payload.id,
              })
              .then((res) => {
                if (res.error) {
                  console.log(res.error);
                }
              });
          }
        });
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="container-fluid">
      <Title level={4}>CHI TIẾT ĐẶT HÀNG</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card>
            <Form form={form} layout="vertical">
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label={
                      <>
                        Người nhận hàng <Text type="danger">*</Text>
                      </>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên người nhận",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="phone"
                    label={
                      <>
                        Số điện thoại <Text type="danger">*</Text>
                      </>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập số điện thoại",
                      },
                    ]}
                  >
                    <Input
                      style={{ height: "50px" }}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item
                name="address"
                label={
                  <>
                    Địa chỉ nhận hàng <Text type="danger">*</Text>
                  </>
                }
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input
                  style={{ height: "50px" }}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card style={{ backgroundColor: "#f5f5f5", height: "100%" }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <Title level={5}>THÀNH TIỀN</Title>
              <Row>
                <Col span={12}>
                  <Text strong>
                    TỔNG:{" "}
                    <span style={{ color: "#ce1515", fontWeight: "bold" }}>
                      {cartTotalAmount.toLocaleString("vi-VN")} đ
                    </span>
                  </Text>
                </Col>
              </Row>
              <Text strong>Phương thức thanh toán</Text>
              <Radio.Group
                onChange={(e) => setPayment(e.target.value)}
                value={payment}
              >
                <Space direction="vertical">
                  <Radio value="off">Thanh toán khi nhận hàng</Radio>
                  <Radio value="online">Thanh toán Online</Radio>
                </Space>
              </Radio.Group>
              <Button
                type="primary"
                style={{
                  width: "100%",
                  height: "45px",
                  borderRadius: "15px",
                  backgroundColor: "#4e7661",
                  fontWeight: "bold",
                }}
                onClick={orderClick}
                loading={isLoadingOrder}
              >
                {isLoadingOrder ? "LOADING..." : "Đặt Hàng"}
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Order;
