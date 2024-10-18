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
import { HomeOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { getOrderComplete } from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;

const OrderComplete = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderComplete);
  const rates = useSelector((state) => state.customer.order.orderRate);

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderComplete(user_id));
  }, [isAuth, dispatch, navigate, user_id]);

  const isRated = (productId, orderId) => {
    return rates.some(
      (itemRate) =>
        itemRate.ProductId === productId && itemRate.OrderId === orderId
    );
  };

  return (
    <Layout>
      <HeaderComponent />
      <Content style={{ padding: "0 50px", minHeight: 500 }}>
        <Title level={4} style={{ marginBottom: 40 }}>
          ĐƠN HÀNG ĐÃ HOÀN THÀNH
        </Title>
        <OrderStatus />
        {orders && orders.length > 0 ? (
          <List
            dataSource={orders}
            renderItem={(order, orderIndex) => (
              <Card key={`order-${orderIndex}`} style={{ marginBottom: 20 }}>
                <List
                  dataSource={order.Order_Products}
                  renderItem={(item, itemIndex) => (
                    <List.Item key={`item-${orderIndex}-${itemIndex}`}>
                      <Row gutter={16} style={{ width: "100%" }}>
                        <Col xs={24} sm={6} md={4}>
                          <Image
                            width={120}
                            src={URL_IMAGE + item.Product.image}
                            alt={item.Product.name}
                          />
                        </Col>
                        <Col xs={24} sm={18} md={20}>
                          <Space
                            direction="vertical"
                            size="small"
                            style={{ width: "100%" }}
                          >
                            <Text strong style={{ fontSize: 17 }}>
                              {item.Product.name}
                            </Text>
                            <Text style={{ fontSize: 17 }}>
                              x {item.quantity}
                            </Text>
                            <Text strong style={{ fontSize: 18 }}>
                              {item.Product.price.toLocaleString("vi-VN")} đ
                            </Text>
                            {!isRated(item.ProductId, order.id) ? (
                              <Button
                                type="primary"
                                style={{
                                  backgroundColor: "#01bacf",
                                  borderColor: "#01bacf",
                                }}
                                onClick={() =>
                                  navigate(
                                    `/rate?order_id=${order.id}&product_id=${item.ProductId}&user_id=${order.UserId}`
                                  )
                                }
                              >
                                Đánh giá
                              </Button>
                            ) : (
                              <Button disabled>Đã đánh giá</Button>
                            )}
                          </Space>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
                <Row gutter={16} style={{ marginTop: 20 }}>
                  <Col xs={24} sm={12}>
                    <Text italic style={{ color: "#19c37d", fontSize: 14 }}>
                      <CheckCircleOutlined /> Đơn hàng đã được giao thành công !
                    </Text>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Text strong style={{ fontSize: 17 }}>
                      Thành tiền: {order.total.toLocaleString("vi-VN")} đ
                    </Text>
                  </Col>
                </Row>
              </Card>
            )}
          />
        ) : (
          <Empty description={<span>Chưa có đơn hàng nào hoàn thành</span>} />
        )}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default OrderComplete;
