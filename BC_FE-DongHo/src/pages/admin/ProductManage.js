import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Space,
  Button,
  Typography,
  Image,
  Popconfirm,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import { getProductAdmin } from "../../axios/services";
import { UrlImage } from "../../url";
import ModalAddProduct from "../../components/admin/ModalAddProduct";
import ModalEditProduct from "../../components/admin/ModalEditProduct";
import { handleDeleteProduct } from "../../redux/silce/admin/productSlice";

const { Title } = Typography;

const ProductManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [listProduct, setListProduct] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productEdit, setProductEdit] = useState({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const deleteProduct = useSelector(
    (state) => state.admin.product.deleteProduct
  );
  const updateProduct = useSelector(
    (state) => state.admin.product.updateProduct
  );
  const storeProduct = useSelector((state) => state.admin.product.storeProduct);
  const isAuth = useSelector((state) => state.admin.auth.isAuth);

  const Toggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    fetchAllProduct();
  }, [
    pagination.current,
    deleteProduct,
    updateProduct,
    isAuth,
    storeProduct,
    navigate,
  ]);

  const fetchAllProduct = async () => {
    try {
      const res = await getProductAdmin(pagination.current);
      setListProduct(res.data.products);
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

  const handleClose = () => setShowModalAdd(false);
  const handleCloseEdit = () => setShowModalEdit(false);
  const displayAdd = () => setShowModalAdd(true);
  const showEdit = (product) => {
    setShowModalEdit(true);
    setProductEdit(product);
  };

  const deleteClick = (product_id) => {
    dispatch(handleDeleteProduct(product_id)).then((res) => {
      if (res.payload && res.payload.success === true) {
        message.success(res.payload.message);
      }
      if (res.payload && res.payload.detail) {
        message.warning(res.payload.detail);
      }
    });
  };

  const columns = [
    { title: "STT", dataIndex: "index", key: "index" },
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "image",
      render: (image) => <Image src={URL_IMAGE + image} width={100} />,
    },
    { title: "Tên", dataIndex: "name", key: "name", width: 400 },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString("vi-VN")} đ`,
    },
    { title: "Danh Mục", dataIndex: "CategoryId", key: "CategoryId" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa sản phẩm này?"
            onConfirm={() => deleteClick(record.id)}
            okText="Có"
            cancelText="Không"
          >
            <DeleteOutlined style={{ color: "#ee4d2d", fontSize: 20 }} />
          </Popconfirm>
          <EditOutlined
            onClick={() => showEdit(record)}
            style={{ color: "#b79635", fontSize: 20 }}
          />
        </Space>
      ),
    },
  ];

  return (
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Title level={4} style={{ color: "#14134f" }}>
                QUẢN LÝ SẢN PHẨM
              </Title>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={displayAdd}
              >
                THÊM SẢN PHẨM
              </Button>
            </div>
            <Table
              columns={columns}
              dataSource={listProduct.map((item, index) => ({
                ...item,
                key: item.id,
                index:
                  (pagination.current - 1) * pagination.pageSize + index + 1,
              }))}
              pagination={pagination}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>
      <ModalAddProduct showModalAdd={showModalAdd} handleClose={handleClose} />
      <ModalEditProduct
        showModalEdit={showModalEdit}
        handleCloseEdit={handleCloseEdit}
        productEdit={productEdit}
      />
    </div>
  );
};

export default ProductManage;
