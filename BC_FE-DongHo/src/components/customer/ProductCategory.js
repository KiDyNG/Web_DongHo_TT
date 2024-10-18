import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Row, Col, Card, Typography, Rate, Pagination, Menu, Spin } from "antd";
import { getProductCategory } from "../../axios/services";
import { UrlImage } from "../../url";

const { Title, Text } = Typography;
const { Meta } = Card;
const URL_IMAGE = UrlImage();

const ProductCategory = () => {
  const { category_id } = useParams();
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const { categoriesList } = useSelector((state) => state.customer.category);

  useEffect(() => {
    fetchAllProduct(page);
  }, [page, category_id]);

  const fetchAllProduct = async (page) => {
    try {
      let res = await getProductCategory(category_id, page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const renderCategoryMenu = () => (
    <Menu mode="inline">
      {categoriesList.map((item, index) => (
        <Menu.SubMenu
          key={`category-parent-${index}`}
          title={item.category_parent}
        >
          {item.categories.map((category) => (
            <Menu.Item key={`category-${category.id}`}>
              <Link to={`/category/${category.id}`}>{category.name}</Link>
            </Menu.Item>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );

  return (
    <div style={{ margin: "40px" }}>
      <Row gutter={32}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Title level={3}>DANH MỤC</Title>
          {categoriesList && categoriesList.length > 0 ? (
            renderCategoryMenu()
          ) : (
            <Spin />
          )}
        </Col>
        <Col xs={24} sm={24} md={18} lg={18}>
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
                          style={{ height: 250 }}
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
                total={totalPage * 10}
                onChange={handlePageChange}
                style={{ marginTop: 32, textAlign: "center" }}
              />
            </>
          ) : (
            <div style={{ textAlign: "center" }}>
              <Title level={4}>Không có sản phẩm !</Title>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ProductCategory;
