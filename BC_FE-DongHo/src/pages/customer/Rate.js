import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Layout,
  Typography,
  Row,
  Col,
  Image,
  Rate as AntRate,
  Input,
  Button,
  message,
} from "antd";
import {
  getProductRate,
  handleRate,
} from "../../redux/silce/customer/rateSlice";
import { UrlImage } from "../../url";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";

const { Content } = Layout;
const { Title, Text } = Typography;
const { TextArea } = Input;

const Rate = () => {
  const URL_IMAGE = UrlImage();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const { ProductRate, isSuccessRate } = useSelector(
    (state) => state.customer.rate
  );

  const order_id = new URLSearchParams(location.search).get("order_id");
  const user_id = new URLSearchParams(location.search).get("user_id");
  const product_id = new URLSearchParams(location.search).get("product_id");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    if (!order_id || !user_id || !product_id) {
      navigate("/");
    }
    dispatch(getProductRate({ order_id, product_id, user_id }));
  }, [
    isSuccessRate,
    isAuth,
    dispatch,
    navigate,
    order_id,
    user_id,
    product_id,
  ]);

  const isValidRate = () => {
    if (!rating) {
      message.error("Vui lòng chọn số sao đánh giá");
      return false;
    }
    if (!comment) {
      message.error("Vui lòng nhập thông tin đánh giá");
      return false;
    }
    return true;
  };

  const rateClick = () => {
    if (isValidRate()) {
      const data_rate = { order_id, product_id, user_id, rating, comment };
      dispatch(handleRate(data_rate));
      message.success("Đánh giá sản phẩm thành công");
    }
  };

  return (
    <Layout>
      <HeaderComponent />
      <Content style={{ padding: "0 50px", marginTop: 64, marginBottom: 64 }}>
        <Title level={4} style={{ marginBottom: 40, color: "gray" }}>
          ĐÁNH GIÁ SẢN PHẨM
        </Title>
        {ProductRate && ProductRate.product ? (
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={8} md={6} lg={4}>
              <Image
                width="100%"
                src={URL_IMAGE + ProductRate.product.image}
                alt={ProductRate.product.name}
              />
            </Col>
            <Col xs={24} sm={16} md={18} lg={20}>
              <Text strong>{ProductRate.product.name}</Text>
              <AntRate
                onChange={setRating}
                value={rating}
                style={{ display: "block", marginTop: 16, marginBottom: 16 }}
              />
              <TextArea
                rows={4}
                placeholder="Nhập ghi chú đánh giá..."
                onChange={(e) => setComment(e.target.value)}
                style={{ marginBottom: 16 }}
              />
              <Button type="primary" onClick={rateClick}>
                Đánh giá
              </Button>
            </Col>
          </Row>
        ) : (
          ProductRate &&
          ProductRate.message && (
            <div style={{ textAlign: "center" }}>
              <Title level={4}>{ProductRate.message}</Title>
            </div>
          )
        )}
      </Content>
      <FooterComponent />
    </Layout>
  );
};

export default Rate;
