import React, { useEffect, useState } from "react";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import "bootstrap-icons/font/bootstrap-icons.css";
import { FaRegUserCircle } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import { HiMiniArchiveBox } from "react-icons/hi2";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHome } from "../../redux/silce/admin/orderSlice";
import { getOrderAdmin } from "../../axios/services";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

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
  }, [page, isAuth]);

  const fetchAllOrder = async () => {
    try {
      const res = await getOrderAdmin(page);
      setListOrder(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const displayStatus = (status) => {
    let statusContent;
    switch (status) {
      case 0:
        statusContent = (
          <div>
            <p style={{ color: "#e3c01c" }}>Đang chờ</p>
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
            <p style={{ color: "#19c37d" }}>Hoàn thành</p>
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
  return (
    <div
      style={{ backgroundColor: "#dff0d8" }}
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
            <div className="container-fluid">
              <div className="row g-3 my-2">
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      {dataDashBoard && dataDashBoard.count_product && (
                        <h3 className="fs-2">{dataDashBoard.count_product}</h3>
                      )}
                      <p className="fs-5">Sản Phẩm</p>
                    </div>
                    <RiShoppingBag3Fill
                      style={{ fontSize: "30px", color: "#19c37d" }}
                    />
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      {dataDashBoard && dataDashBoard.count_order && (
                        <h3 className="fs-2">{dataDashBoard.count_order}</h3>
                      )}
                      <p className="fs-5">Đơn Hàng</p>
                    </div>
                    <HiMiniArchiveBox
                      style={{ fontSize: "30px", color: "#d1402c" }}
                    />
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      {dataDashBoard && dataDashBoard.count_order_ship && (
                        <h3 className="fs-2">
                          {dataDashBoard.count_order_ship}
                        </h3>
                      )}
                      <p className="fs-5">Đang Giao</p>
                    </div>
                    <MdLocalShipping
                      style={{ fontSize: "30px", color: "#e3c01c" }}
                    />
                  </div>
                </div>
                <div className="col-md-3 p-1">
                  <div className="p-3 bg-white shadow-sm d-flex justify-content-around align-items-center rounded">
                    <div>
                      {dataDashBoard && dataDashBoard.count_user && (
                        <h3 className="fs-2">{dataDashBoard.count_user}</h3>
                      )}
                      <p className="fs-5">Người Dùng</p>
                    </div>
                    <FaRegUserCircle
                      style={{ fontSize: "30px", color: "#5bc0de" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <table className="table caption-top bg-white rounded mt-2">
              <caption style={{ color: "#14134f" }} className="text fs-4">
                ĐƠN HÀNG
              </caption>
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">ID</th>
                  <th scope="col">Tên</th>
                  <th scope="col">Trạng Thái</th>
                  <th scope="col">Thanh Toán</th>
                  <th scope="col">Tổng Tiền</th>
                </tr>
              </thead>
              <tbody>
                {listOrder &&
                  listOrder.length > 0 &&
                  listOrder.map((item, index) => {
                    return (
                      <>
                        <tr key={`order-${index + 1}`}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.id}</td>
                          <td>{item.name}</td>
                          <td>{displayStatus(item.status)}</td>
                          <td>{item.payment}</td>
                          <td>{item.total.toLocaleString("vi-VN")} đ</td>
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
            {dataDashBoard && dataDashBoard.total_page && (
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={dataDashBoard.total_page}
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
