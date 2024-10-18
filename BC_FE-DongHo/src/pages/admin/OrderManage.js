import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Button, Typography, Modal, message } from "antd";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import ModalOrder from "../../components/admin/ModalOrder";
import { getOrder } from "../../axios/services";
import {
  getOrderDetail,
  handleConfirmOrder,
  handleDeleteOrder,
} from "../../redux/silce/admin/orderSlice";

const { Title } = Typography;

const OrderManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccessConfirmOrder, isSuccessDeleteOrder } = useSelector(
    (state) => state.admin.order
  );
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const [toggle, setToggle] = useState(true);
  const [listOrder, setListOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataOrder, setDataOrder] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    fetchAllOrder();
  }, [
    pagination.current,
    isSuccessConfirmOrder,
    isSuccessDeleteOrder,
    isAuth,
    navigate,
  ]);

  const fetchAllOrder = async () => {
    try {
      const res = await getOrder(pagination.current);
      setListOrder(res.data.orders);
      setPagination((prev) => ({
        ...prev,
        total: res.data.total_page * pagination.pageSize,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const OrderDetail = (order) => {
    dispatch(getOrderDetail(order.id)).then((res) => {
      if (res.payload && res.payload.success) {
        setDataOrder(res.payload);
        setShowModal(true);
      }
    });
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const confirmClick = (order_id) => {
    dispatch(handleConfirmOrder(order_id));
  };

  const deleteClick = (order_id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa đơn hàng này?",
      content: "Hành động này không thể hoàn tác.",
      onOk() {
        dispatch(handleDeleteOrder(order_id));
      },
    });
  };

  const columns = [
    { title: "STT", dataIndex: "index", key: "index" },
    { title: "Tên", dataIndex: "name", key: "name" },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status, record) => {
        switch (status) {
          case 0:
            return (
              <Button type="primary" onClick={() => confirmClick(record.id)}>
                Duyệt
              </Button>
            );
          case 1:
            return <span style={{ color: "#01bacf" }}>Đang giao</span>;
          case 2:
            return <span style={{ color: "#198754" }}>Hoàn thành</span>;
          case 3:
            return <span style={{ color: "#ce1515" }}>Đã hủy</span>;
          default:
            return "Không xác định";
        }
      },
    },
    { title: "SĐT", dataIndex: "phone", key: "phone" },
    { title: "Địa Chỉ", dataIndex: "address", key: "address" },
    {
      title: "Tổng Tiền",
      dataIndex: "total",
      key: "total",
      render: (total) => `${total.toLocaleString("vi-VN")} đ`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <DeleteOutlined
            onClick={() => deleteClick(record.id)}
            style={{ color: "#dc0000", fontSize: 20 }}
          />
          <EyeOutlined
            onClick={() => OrderDetail(record)}
            style={{ color: "#5bc0de", fontSize: 20 }}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      <ModalOrder
        dataOrder={dataOrder}
        showModal={showModal}
        handleClose={handleClose}
      />
      <div
        className="container-fluid bg min-vh-100"
        style={{ backgroundColor: "#f0f0f0" }}
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
                <Title level={4} style={{ color: "#14134f", marginTop: 16 }}>
                  QUẢN LÝ ĐƠN HÀNG
                </Title>
                <Table
                  columns={columns}
                  dataSource={listOrder.map((item, index) => ({
                    ...item,
                    key: item.id,
                    index:
                      (pagination.current - 1) * pagination.pageSize +
                      index +
                      1,
                  }))}
                  pagination={pagination}
                  onChange={handleTableChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderManage;
