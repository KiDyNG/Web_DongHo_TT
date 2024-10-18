import React, { useEffect } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrderWait,
  orderCancelAction,
} from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";

const OrderWait = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderWait);
  const orderCancel = useSelector(
    (state) => state.customer.order.handleOrderCancel
  );
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderWait(user_id));
  }, [isAuth, orderCancel]);

  const canelOrderClick = (order_id) => {
    dispatch(orderCancelAction(order_id));
  };
  return (
    <>
      <Header />
      <div style={{ height: "1000px" }} className="container">
        <h4 style={{ marginBottom: "40px" }}>ĐƠN HÀNG ĐANG CHỜ</h4>
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
                    <div key={`order-${order.id}`}>
                      {order.Order_Products.map((item, itemIndex) => {
                        return (
                          <div
                            style={{ marginBottom: "20px" }}
                            className="row"
                            key={`item-${index}-${itemIndex}`}
                          >
                            <div className="col-3">
                              <div>
                                <img
                                  width={"120px"}
                                  src={URL_IMAGE + item.Product.image}
                                  alt=""
                                />
                              </div>
                            </div>
                            <div className="col-9">
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
                          <i style={{ fontSize: "14px", color: "gray" }}>
                            Đơn hàng đang được chờ duyệt!
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
                              backgroundColor: "#dc0000",
                              color: "white",
                              fontWeight: "bold",
                            }}
                            onClick={() => canelOrderClick(order.id)}
                          >
                            Hủy đơn hàng
                          </button>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h5>Chưa có đơn hàng nào đang chờ duyệt!</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OrderWait;
