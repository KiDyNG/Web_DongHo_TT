import React, { useEffect, useState } from "react";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Statistic, Table, Typography, Pagination } from "antd";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { getOrderHome } from "../../redux/silce/admin/orderSlice";
import { getOrderAdmin } from "../../axios/services";

const { Title } = Typography;

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [listOrder, setListOrder] = useState([]);
  const dataDashBoard = useSelector((state) => state.admin.order.listOrderHome);
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    dispatch(getOrderHome());
    fetchAllOrder();
  }, [page, isAuth, dispatch, navigate]);

  const fetchAllOrder = async () => {
    try {
      const res = await getOrderAdmin(page);
      setListOrder(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const columns = [
    { title: "STT", dataIndex: "index", key: "index" },
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        const statusColors = {
          0: "#e3c01c",
          1: "#01bacf",
          2: "#19c37d",
          3: "#ce1515",
        };
        const statusTexts = {
          0: "Đang chờ",
          1: "Đang giao",
          2: "Hoàn thành",
          3: "Đã hủy",
        };
        return (
          <span style={{ color: statusColors[status] }}>
            {statusTexts[status]}
          </span>
        );
      },
    },
    { title: "Thanh Toán", dataIndex: "payment", key: "payment" },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} đ`,
    },
  ];

  const dataSource = listOrder.map((item, index) => ({
    ...item,
    key: item.id,
    index: index + 1,
  }));

  return (
    <div
      className="container-fluid bg min-vh-100"
      style={{ backgroundColor: "#dff0d8" }}
    >
      <div className="row">
        {toggle && (
          <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
            <Sidebar />
          </div>
        )}
        {toggle && <div className="col-4 col-md-2"></div>}
        <div className="col">
          <div className="px-3">
            <Nav Toggle={Toggle} />
            <div className="container-fluid">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title="Sản Phẩm"
                      value={dataDashBoard?.count_product}
                      prefix={<ShoppingOutlined style={{ color: "#19c37d" }} />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title="Đơn Hàng"
                      value={dataDashBoard?.count_order}
                      prefix={
                        <ShoppingCartOutlined style={{ color: "#d1402c" }} />
                      }
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title="Đang Giao"
                      value={dataDashBoard?.count_order_ship}
                      prefix={<CarOutlined style={{ color: "#e3c01c" }} />}
                    />
                  </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                  <Card>
                    <Statistic
                      title="Người Dùng"
                      value={dataDashBoard?.count_user}
                      prefix={<UserOutlined style={{ color: "#5bc0de" }} />}
                    />
                  </Card>
                </Col>
              </Row>
              <Title level={4} style={{ marginTop: 24, color: "#14134f" }}>
                ĐƠN HÀNG
              </Title>
              <Table
                columns={columns}
                dataSource={dataSource}
                pagination={false}
              />
              <Pagination
                current={page}
                total={dataDashBoard?.total_page * 10}
                onChange={handlePageChange}
                style={{ marginTop: 16, textAlign: "right" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
