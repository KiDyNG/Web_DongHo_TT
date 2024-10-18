import React, { useEffect, useState } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { FaHome } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getOrderComplete } from "../../redux/silce/customer/orderSlice";
import { UrlImage } from "../../url";
import OrderStatus from "../../components/customer/OrderStatus";

const OrderComplete = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  let { user_id } = useParams();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  const orders = useSelector((state) => state.customer.order.orderComplete);
  const rates = useSelector((state) => state.customer.order.orderRate);
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    dispatch(getOrderComplete(user_id));
  }, [isAuth]);

  const isRated = (productId, orderId) => {
    return rates.some(
      (itemRate) =>
        itemRate.ProductId === productId && itemRate.OrderId === orderId
    );
  };

  return (
    <>
      <Header />
      <div style={{ height: "1000px" }} className="container">
        <h4 style={{ marginBottom: "40px" }}>ĐƠN HÀNG ĐÃ HOÀN THÀNH</h4>
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
                    <div key={`order-${index}`}>
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

                              <div>
                                {!isRated(item.ProductId, order.id) ? (
                                  <button
                                    style={{
                                      width: "150px",
                                      height: "45px",
                                      border: "none",
                                      borderRadius: "10px",
                                      backgroundColor: "#01bacf",
                                      color: "white",
                                      fontWeight: "bold",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        `/rate?order_id=${order.id}&product_id=${item.ProductId}&user_id=${order.UserId}`
                                      )
                                    }
                                  >
                                    Đánh giá
                                  </button>
                                ) : (
                                  <div>
                                    <button
                                      style={{
                                        width: "150px",
                                        height: "45px",
                                        border: "none",
                                        borderRadius: "10px",
                                        backgroundColor: "gray",
                                        color: "white",
                                        fontWeight: "bold",
                                      }}
                                      disabled
                                    >
                                      Đã đánh giá
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div className="row">
                        <div className="col-6">
                          <i style={{ fontSize: "14px", color: "#19c37d" }}>
                            Đơn hàng đã được giao thành công !
                          </i>
                        </div>
                        <div className="col-6">
                          <p style={{ fontSize: "17px", fontWeight: "bold" }}>
                            Thành tiền:
                            <span>{order.total.toLocaleString("vi-VN")} đ</span>
                          </p>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <h5>Chưa có đơn hàng nào hoàn thành</h5>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OrderComplete;
