import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  Layout,
  Typography,
  List,
  Card,
  Image,
  Button,
  Row,
  Col,
  Empty,
  Space,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import {
  getOrderShip,
  orderConfirmAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;

const OrderShip = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderShip);
  const orderConfirm = useSelector(
    (state) => state.customer.order.handleOrderConfirm
  );

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderShip(user_id));
  }, [isAuth, orderConfirm, dispatch, navigate, user_id]);

  const orderConfirmClick = (order_id) => {
    dispatch(orderConfirmAction(order_id));
  };

  return (
    <Layout>
      <HeaderComponent />
      <Content style={{ padding: "0 50px", minHeight: 500 }}>
        <Title level={4} style={{ marginBottom: 40 }}>
          ĐƠN HÀNG ĐANG GIAO
        </Title>
        <OrderStatus />
        {orders && orders.length > 0 ? (
          <List
            dataSource={orders}
            renderItem={(order) => (
              <Card style={{ marginBottom: 20 }}>
                <List
                  dataSource={order.Order_Products}
                  renderItem={(item) => (
                    <List.Item>
                      <Row gutter={16} style={{ width: "100%" }}>
                        <Col xs={24} sm={6} md={4}>
                          <Image
                            width={120}
                            src={URL_IMAGE + item.Product.image}
                            alt={item.Product.name}
                          />
                        </Col>
                        <Col xs={24} sm={18} md={20}>
                          <Space direction="vertical">
                            <Text strong style={{ fontSize: 17 }}>
                              {item.Product.name}
                            </Text>
                            <Text style={{ fontSize: 17 }}>
                              x {item.quantity}
                            </Text>
                            <Text strong style={{ fontSize: 18 }}>
                              {item.Product.price.toLocaleString("vi-VN")} đ
                            </Text>
                          </Space>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
                <Row gutter={[16, 16]} style={{ marginTop: 20 }}>
                  <Col xs={24} md={8}>
                    <Text italic style={{ color: "gray", fontSize: 14 }}>
                      Đơn hàng đang được giao nếu không gặp vấn đề gì vui lòng
                      bấm đã nhận hàng
                    </Text>
                  </Col>
                  <Col xs={24} md={8}>
                    <Text strong style={{ fontSize: 17 }}>
                      Thành tiền: {order.total.toLocaleString("vi-VN")} đ
                    </Text>
                  </Col>
                  <Col xs={24} md={8}>
                    <Button
                      type="primary"
                      style={{
                        width: 200,
                        height: 45,
                        backgroundColor: "#4e7661",
                        borderColor: "#4e7661",
                      }}
                      onClick={() => orderConfirmClick(order.id)}
                    >
                      Đã nhận
                    </Button>
                  </Col>
                </Row>
              </Card>
            )}
          />
        ) : (
          <Empty description={<span>Chưa có đơn hàng nào đang giao!</span>} />
        )}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default OrderShip;
