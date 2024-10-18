import React, { useEffect } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderShip,
  orderConfirmAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";

const OrderShip = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderShip);
  const orderConfirm = useSelector(
    (state) => state.customer.order.handleOrderConfirm
  );
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderShip(user_id));
  }, [isAuth, orderConfirm]);

  const orderConfirmClick = (order_id) => {
    dispatch(orderConfirmAction(order_id));
  };
  return (
    <>
      <Header />
      <div style={{ marginBottom: "800px" }} className="container">
        <h4 style={{ marginBottom: "40px" }}>ĐƠN HÀNG ĐANG GIAO</h4>
        <div
          className="container"
          style={{ height: "50px", marginTop: "20px" }}
        >
          <OrderStatus />
          <div className="container" style={{ marginTop: "50px" }}>
            {orders && orders.length > 0 ? (
              <>
                {orders.map((order, index) => {
                  return (
                    <React.Fragment key={order.id}>
                      {order.Order_Products.map((item, indexItem) => {
                        return (
                          <div
                            style={{ marginBottom: "20px" }}
                            className="row"
                            key={`order-${indexItem}`}
                          >
                            <div className="col-2">
                              <div>
                                <img
                                  width={"120px"}
                                  src={URL_IMAGE + item.Product.image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-10">
                              <p style={{ fontSize: "17px" }}>
                                {item.Product.name}
                              </p>
                              <p style={{ fontSize: "17px" }}>
                                x {item.quantity}
                              </p>
                              <p
                                style={{
                                  fontWeight: "bold",
                                  fontSize: "18px",
                                }}
                              >
                                {item.Product.price.toLocaleString("vi-VN")} đ
                              </p>
                            </div>
                          </div>
                        );
                      })}
                      <div className="row">
                        <div className="col-4">
                          <i
                            style={{
                              color: "gray",
                              fontSize: "14px",
                            }}
                          >
                            Đơn hàng đang được giao nếu không gặp vấn đề gì vui
                            lòng bấm đã nhận hàng
                          </i>
                        </div>
                        <div className="col-4">
                          <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Thành tiền:{" "}
                            <span>{order.total.toLocaleString("vi-VN")} đ</span>
                          </p>
                        </div>
                        <div className="col-4">
                          <button
                            style={{
                              width: "200px",
                              height: "45px",
                              border: "none",
                              borderRadius: "10px",
                              backgroundColor: "#4e7661",
                              color: "white",
                              fontWeight: "bold",
                            }}
                            onClick={() => orderConfirmClick(order.id)}
                          >
                            Đã nhận
                          </button>
                        </div>
                      </div>
                      <hr />
                    </React.Fragment>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h5>Chưa có đơn hàng nào đang giao!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OrderShip;
