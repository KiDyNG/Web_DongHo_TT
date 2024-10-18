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
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import {
  getOrderWait,
  orderCancelAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;

const OrderWait = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderWait);
  const orderCancel = useSelector(
    (state) => state.customer.order.handleOrderCancel
  );

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderWait(user_id));
  }, [isAuth, orderCancel, dispatch, navigate, user_id]);

  const cancelOrderClick = (order_id) => {
    dispatch(orderCancelAction(order_id));
  };

  return (
    <Layout>
      <HeaderComponent />
      <div
        style={{
          padding: "0 50px",
          minHeight: 500,
        }}
      >
        <Title level={4} style={{ marginBottom: 40 }}>
          ĐƠN HÀNG ĐANG CHỜ
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
                          <Text strong style={{ fontSize: 17 }}>
                            {item.Product.name}
                          </Text>
                          <Text style={{ display: "block", fontSize: 17 }}>
                            x {item.quantity}
                          </Text>
                          <Text strong style={{ fontSize: 18 }}>
                            {item.Product.price.toLocaleString("vi-VN")} đ
                          </Text>
                        </Col>
                      </Row>
                    </List.Item>
                  )}
                />
                <Row gutter={16} style={{ marginTop: 20 }}>
                  <Col xs={24} sm={8}>
                    <Text italic style={{ color: "gray" }}>
                      Đơn hàng đang được chờ duyệt!
                    </Text>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Text strong style={{ fontSize: 17 }}>
                      Thành tiền: {order.total.toLocaleString("vi-VN")} đ
                    </Text>
                  </Col>
                  <Col xs={24} sm={8}>
                    <Button
                      type="primary"
                      danger
                      style={{ width: 200, height: 45 }}
                      onClick={() => cancelOrderClick(order.id)}
                    >
                      Hủy đơn hàng
                    </Button>
                  </Col>
                </Row>
              </Card>
            )}
          />
        ) : (
          <Empty
            description={<span>Chưa có đơn hàng nào đang chờ duyệt!</span>}
          />
        )}
      </div>
      <FooterComponent />
    </Layout>
  );
};

export default OrderWait;
