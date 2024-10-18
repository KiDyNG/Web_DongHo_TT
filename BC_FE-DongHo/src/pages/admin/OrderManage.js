import React, { useState, useEffect } from "react";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import { getOrder } from "../../axios/services";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEye } from "react-icons/fa";
import ModalOrder from "../../components/admin/ModalOrder";
import {
  getOrderDetail,
  handleConfirmOrder,
  handleDeleteOrder,
} from "../../redux/silce/admin/orderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const OrderManage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSuccessConfirmOrder, isSuccessDeleteOrder } = useSelector(
    (state) => state.admin.order
  );
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listOrder, setListOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dataOrder, setDataOrder] = useState({});
  const Toggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    fetchAllOrder();
  }, [page, isSuccessConfirmOrder, isSuccessDeleteOrder, isAuth]);

  const fetchAllOrder = async () => {
    try {
      const res = await getOrder(page);
      setListOrder(res.data.orders);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };
  const displayStatus = (status, order_id) => {
    let statusContent;
    switch (status) {
      case 0:
        statusContent = (
          <div>
            <button
              onClick={() => confirmClick(order_id)}
              style={{ width: "140px" }}
              type="button"
              className="btn btn-success"
            >
              Duyệt
            </button>
          </div>
        );
        break;
      case 1:
        statusContent = (
          <div>
            <p style={{ color: "#01bacf" }}>Đang giao</p>
          </div>
        );
        break;
      case 2:
        statusContent = (
          <div>
            <p style={{ color: "#198754" }}>Hoàn thành</p>
          </div>
        );
        break;
      case 3:
        statusContent = (
          <div>
            <p style={{ color: "#ce1515" }}>Đã hủy</p>
          </div>
        );
        break;

      default:
        statusContent = <div>Invalid star value</div>;
        break;
    }

    return statusContent;
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
    dispatch(handleDeleteOrder(order_id));
  };
  return (
    <>
      <ModalOrder
        dataOrder={dataOrder}
        showModal={showModal}
        handleClose={handleClose}
      />
      <div
        style={{ backgroundColor: "#f0f0f0" }}
        className="container-fluid bg min-vh-100 "
      >
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <Sidebar />
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}
          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div className="container-fluid"></div>
              <table className="table caption-top bg-white rounded mt-2">
                <caption style={{ color: "#14134f " }} className="text fs-4">
                  QUẢN LÝ ĐƠN HÀNG
                </caption>
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Trạng Thái</th>
                    <th scope="col">SĐT</th>
                    <th scope="col">Địa Chỉ</th>
                    <th scope="col">Tổng Tiền</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listOrder &&
                    listOrder.length > 0 &&
                    listOrder.map((item, index) => {
                      const displayIndex = (page - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <th scope="row">{displayIndex}</th>
                          <td>{item.name}</td>
                          <td>{displayStatus(item.status, item.id)}</td>
                          <td>{item.phone}</td>
                          <td>{item.address}</td>
                          <td
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.total.toLocaleString("vi-VN")} đ
                          </td>
                          <td>
                            <RiDeleteBin6Fill
                              style={{
                                fontSize: "25px",
                                marginRight: "10px",
                                cursor: "pointer",
                                color: "#dc0000",
                              }}
                              onClick={() => deleteClick(item.id)}
                            />
                            <FaEye
                              onClick={() => OrderDetail(item)}
                              style={{
                                fontSize: "25px",
                                cursor: "pointer",
                                color: "#5bc0de",
                              }}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OrderManage;
