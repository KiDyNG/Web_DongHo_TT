import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Row, Col, Card, Typography, Rate, Pagination, Empty } from "antd";
import { getProductSearch } from "../../axios/services";
import { UrlImage } from "../../url";

const { Title, Text } = Typography;
const { Meta } = Card;
const URL_IMAGE = UrlImage();

const ProductSearch = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");

  const fetchProductSearch = async (currentPage) => {
    try {
      let res = await getProductSearch(name, currentPage);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProductSearch(page);
  }, [page, name]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div style={{ padding: "40px" }}>
      <Title
        level={3}
        style={{ marginBottom: "20px", color: "gray", textAlign: "center" }}
      >
        SẢN PHẨM CẦN TÌM
      </Title>

      {listProduct && listProduct.length > 0 ? (
        <>
          <Row gutter={[16, 32]}>
            {listProduct.map((item, index) => (
              <Col xs={24} sm={12} md={8} lg={6} key={`product-${index}`}>
                <Card
                  hoverable
                  cover={
                    <img
                      alt={item.name}
                      src={URL_IMAGE + item.image}
                      style={{ height: 280 }}
                    />
                  }
                  onClick={() => navigate(`/detail/${item.id}`)}
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
                          textAlign: "center",
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
                          style={{ fontSize: 12 }}
                        />
                        <Text
                          strong
                          style={{
                            display: "block",
                            marginTop: 8,
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
            current={page}
            total={totalPage * 10} // Assuming 10 items per page
            onChange={handlePageChange}
            style={{ marginTop: 32, textAlign: "center" }}
          />
        </>
      ) : (
        <Empty
          description={<span>Không tìm thấy sản phẩm</span>}
          style={{ margin: "40px 0" }}
        />
      )}
    </div>
  );
};

export default ProductSearch;
