import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Carousel,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { getProductDetail } from "../../redux/silce/customer/productSilce";
import { addTocartDetail } from "../../redux/silce/customer/cartSlice";
import { UrlImage } from "../../url";

const StarRating = ({ rating }) => {
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <FaStar
          key={index}
          className={index < rating ? "text-warning" : "text-muted"}
        />
      ))}
    </>
  );
};

const RatingSummary = ({ countStar, totalRatings }) => {
  const starCounts = {
    5: countStar.fine || 0,
    4: countStar.four || 0,
    3: countStar.three || 0,
    2: countStar.two || 0,
    1: countStar.one || 0,
  };

  const calculatePercentage = (count) => {
    if (totalRatings === 0) return 0;
    return Math.round((count / totalRatings) * 100);
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <h5 className="mb-3">Đánh giá: {totalRatings} lượt</h5>
        {Object.entries(starCounts)
          .reverse()
          .map(([stars, count]) => (
            <Row key={stars} className="align-items-center mb-2">
              <Col xs={3} className="d-flex align-items-center">
                <StarRating rating={parseInt(stars)} />
              </Col>
              <Col xs={7}>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: `${calculatePercentage(count)}%` }}
                    aria-valuenow={calculatePercentage(count)}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </Col>
              <Col xs={2} className="text-end">
                {count}
              </Col>
            </Row>
          ))}
      </Card.Body>
    </Card>
  );
};

const RatingList = ({ ratings }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  return (
    <>
      <h5 className="mb-4">ĐÁNH GIÁ SẢN PHẨM</h5>
      {ratings.length > 0 ? (
        ratings.map((item, index) => (
          <Card key={`rate-${index}`} className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-center mb-2">
                <FaUserCircle size={40} className="me-2" />
                <div>
                  <Card.Title>{item.User.name}</Card.Title>
                  <Card.Subtitle className="text-muted">
                    {formatDate(item.createdAt)}
                  </Card.Subtitle>
                </div>
              </div>
              <StarRating rating={item.star} />
              <Card.Text className="mt-2">{item.comment}</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-muted">Sản phẩm chưa có đánh giá!</p>
      )}
    </>
  );
};

const ProductDetail = () => {
  const URL_IMAGE = UrlImage();
  let { product_id } = useParams();
  const dispatch = useDispatch();
  const { rate, productDetail, countRate, countStar } = useSelector(
    (state) => state.customer.product
  );
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(getProductDetail(product_id));
  }, [dispatch, product_id]);

  const addTocartClick = (product, cartQuantity) => {
    let product_cart = { ...product, cartQuantity: cartQuantity };
    dispatch(addTocartDetail(product_cart));
    setQuantity(1);
  };

  if (!productDetail || !countStar) return null;

  return (
    <Container className="my-5">
      <h3 className="mb-4">CHI TIẾT SẢN PHẨM</h3>
      <Row>
        <Col md={6}>
          <Carousel>
            {[1, 2, 3].map((item) => (
              <Carousel.Item key={item}>
                <img
                  className="d-block w-100"
                  src={URL_IMAGE + productDetail.image}
                  alt={`Slide ${item}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
        <Col md={6}>
          <h4>{productDetail.name}</h4>
          <h5 className="text-danger font-weight-bold my-3">
            {productDetail.price.toLocaleString("vi-VN")} đ
          </h5>
          <p className="font-weight-bold">Mô tả:</p>
          <p>{productDetail.description}</p>
          <Form.Group className="mb-3">
            <Form.Label>Số lượng:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: "100px" }}
            />
          </Form.Group>
          <Button
            variant="success"
            className="mt-3"
            onClick={() => addTocartClick(productDetail, quantity)}
          >
            <FaCartShopping className="me-2" /> Thêm giỏ hàng
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <RatingSummary countStar={countStar} totalRatings={countRate} />
        </Col>
        <Col md={8}>
          <RatingList ratings={rate} />
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
