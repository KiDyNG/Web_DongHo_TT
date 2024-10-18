import React from "react";
import { Layout, Row, Col, Typography, Space } from "antd";
import { HomeOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import logo from "../../../assets/customer/images/logo-xd.png";

const { Footer } = Layout;
const { Title, Text } = Typography;

const FooterComponent = () => {
  return (
    <Footer style={{ backgroundColor: "#f8f9fa", color: "#14134f" }}>
      <Row gutter={[16, 32]}>
        <Col xs={24} md={6}>
          <img src={logo} alt="Logo" style={{ width: "200px" }} />
        </Col>

        <Col xs={24} md={6}>
          <Title level={5} style={{ color: "#14134f" }}>
            THƯƠNG HIỆU
          </Title>
          <Space direction="vertical">
            <Text>Casio</Text>
            <Text>Citizen</Text>
            <Text>Koi</Text>
            <Text>Tissot</Text>
            <Text>Doxa</Text>
          </Space>
        </Col>

        <Col xs={24} md={4}>
          <Title level={5} style={{ color: "#14134f" }}>
            ĐỒNG HỒ
          </Title>
          <Space direction="vertical">
            <Text>Đồng Hồ Nam</Text>
            <Text>Đồng Hồ Nữ</Text>
            <Text>Đồng Hồ Đôi</Text>
          </Space>
        </Col>

        <Col xs={24} md={4}>
          <Title level={5} style={{ color: "#14134f" }}>
            PHỤ KIỆN
          </Title>
          <Space direction="vertical">
            <Text>Ví Da</Text>
            <Text>Dây Da</Text>
          </Space>
        </Col>

        <Col xs={24} md={4}>
          <Title level={5} style={{ color: "#14134f" }}>
            LIÊN HỆ
          </Title>
          <Space direction="vertical">
            <Text>
              <HomeOutlined /> Dương Liễu, Hoài Đức, Hà Nội
            </Text>
            <Text>
              <MailOutlined /> duyminhwatch@gmail.com
            </Text>
            <Text>
              <PhoneOutlined /> 0967792857
            </Text>
          </Space>
        </Col>
      </Row>
    </Footer>
  );
};

export default FooterComponent;
