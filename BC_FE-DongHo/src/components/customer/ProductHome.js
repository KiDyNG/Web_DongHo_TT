import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Typography, Rate, Spin, Pagination } from "antd";
import { fetchProductHome } from "../../redux/silce/customer/productSilce";
import { UrlImage } from "../../url";

const { Meta } = Card;
const { Title, Text } = Typography;

const URL_IMAGE = UrlImage();

const ProductHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const listProduct = useSelector(
    (state) => state.customer.product.listProduct
  );
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    dispatch(fetchProductHome());
  }, [dispatch]);

  const handleProductClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = listProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ margin: "40px" }}>
      <Title level={3} style={{ marginBottom: "20px", textAlign: "center" }}>
        SẢN PHẨM NỔI BẬT
      </Title>
      {listProduct && listProduct.length > 0 ? (
        <>
          <Row gutter={[16, 32]}>
            {currentProducts.map((item) => (
              <Col key={`product-${item.id}`} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <div style={{ overflow: "hidden", height: "300px" }}>
                      <img
                        alt={item.name}
                        src={URL_IMAGE + item.image}
                        style={{
                          width: "100%",
                          height: "100%",
                        }}
                      />
                    </div>
                  }
                  onClick={() => handleProductClick(item.id)}
                >
                  <Meta
                    title={
                      <Text
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          height: "3em",
                        }}
                      >
                        {item.name}
                      </Text>
                    }
                    description={
                      <>
                        <Rate
                          disabled
                          defaultValue={5}
                          style={{ fontSize: "14px" }}
                        />
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginTop: "8px",
                            color: "#ff4d4f",
                          }}
                        >
                          {item.price.toLocaleString("vi-VN")} đ
                        </Text>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            total={listProduct.length}
            pageSize={productsPerPage}
            onChange={onPageChange}
            style={{ marginTop: "20px", textAlign: "center" }}
          />
        </>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default ProductHome;
