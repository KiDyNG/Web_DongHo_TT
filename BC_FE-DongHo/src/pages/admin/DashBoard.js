import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Layout,
  Row,
  Col,
  Card,
  Statistic,
  Table,
  Typography,
  Pagination,
  Select,
} from "antd";
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  getOrderHome,
  getStatistical,
} from "../../redux/silce/admin/orderSlice";
import { getOrderAdmin } from "../../axios/services";
import moment from "moment";
import StatisicalRevenue from "../../components/admin/StatisicalRevenue";
import Sidebar from "../../components/admin/Sidebar";
import Nav from "../../components/admin/Nav";

const { Header, Content } = Layout;
const { Title } = Typography;

const DashBoard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [listOrder, setListOrder] = useState([]);
  const dataDashBoard = useSelector((state) => state.admin.order.listOrderHome);
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [filterType, setFilterType] = useState("year");
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    dispatch(getOrderHome());
    fetchAllOrder();
  }, [page, isAuth, dispatch, navigate]);

  const fetchStatistical = async () => {
    setIsLoading(true);
    const res = await dispatch(
      getStatistical({
        year: selectedYear,
        month: selectedMonth,
      })
    ).unwrap();
    if (res.success) {
      setMonthlyRevenue(res.data.yearlyStats);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchStatistical();
  }, [filterType, selectedYear, selectedMonth]);

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

  const handleCollapse = (value) => {
    setCollapsed(value);
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

  const handleChangeType = (value) => {
    if (value === "month") {
      setSelectedMonth(moment().month() + 1);
    } else {
      setSelectedMonth("");
    }
    setFilterType(value);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed} onCollapse={handleCollapse} />
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <Nav />
        </Header>
        <Content style={{ margin: "16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
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
            <Card bordered={false} style={{ marginTop: 16 }}>
              <Title level={4} style={{ marginTop: 24, color: "#14134f" }}>
                DOANH THU
              </Title>
              <div style={{ marginBottom: "10px" }}>
                <Select
                  style={{ marginRight: "4px" }}
                  defaultValue={filterType}
                  onChange={handleChangeType}
                  optionFilterProp="label"
                  options={[
                    {
                      key: "month",
                      label: "Lọc theo tháng",
                    },
                    {
                      key: "year",
                      label: "Lọc theo năm",
                    },
                  ].map((item) => ({
                    value: item.key,
                    label: <span>{item.label}</span>,
                  }))}
                />
                {filterType === "month" && (
                  <Select
                    style={{ marginRight: "4px" }}
                    defaultValue={selectedMonth}
                    onChange={setSelectedMonth}
                    optionFilterProp="label"
                    options={[...Array(12)].map((_, i) => ({
                      value: i + 1,
                      label: <span>Tháng {i + 1}</span>,
                    }))}
                  />
                )}
                <Select
                  style={{ marginRight: "4px" }}
                  defaultValue={selectedYear}
                  onChange={setSelectedYear}
                  optionFilterProp="label"
                  options={[...Array(moment().year() - 1990 + 1)].map(
                    (_, i) => ({
                      value: moment().year() + i,
                      label: <span>Năm {moment().year() + i}</span>,
                    })
                  )}
                />
              </div>
              <StatisicalRevenue {...{ monthlyRevenue, isLoading }} />
            </Card>
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
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashBoard;
