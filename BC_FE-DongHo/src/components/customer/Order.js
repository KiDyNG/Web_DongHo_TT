import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTotal } from "../../redux/silce/customer/cartSlice";
import { authLogin } from "../../redux/silce/customer/authSilce";
import {
  addOrderOff,
  addOrderOnl,
} from "../../redux/silce/customer/orderSlice";
import { clearCart } from "../../redux/silce/customer/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js/pure";

const Order = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const dataUser = useSelector((state) => state.customer.auth.dataUser);
  const { isLoadingOrder, isSuccessOrder } = useSelector(
    (state) => state.customer.order
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [payment, setPayment] = useState("");

  useEffect(() => {
    dispatch(authLogin());
    dispatch(getTotal());
  }, [cart]);

  const isValidOrder = () => {
    if (isAuth === null) {
      toast.error("Vui lòng đăng nhập để đặt hàng");
      navigate("/login");
      return false;
    }
    if (cart.length === 0) {
      toast.error("Vui lòng thêm sản phẩm vào giỏ hàng");
      return false;
    }
    if (!name) {
      toast.error("Vui lòng nhập tên người nhận ");
      return false;
    }
    if (!phone) {
      toast.error("Vui lòng nhập số điện thoại");
      return false;
    }
    const isValidPhone =
      /(([03+[2-9]|05+[6|8|9]|07+[0|6|7|8|9]|08+[1-9]|09+[1-4|6-9]]){3})+[0-9]{7}\b/g.test(
        phone
      );
    if (isValidPhone === false) {
      toast.error("Vui lòng nhập đúng số điện thoại");
      return false;
    }
    if (!payment) {
      toast.error("Vui lòng chọn phương thức thanh toán");
      return false;
    }
    return true;
  };

  const orderClick = async () => {
    let check = isValidOrder();
    if (check === true) {
      let user_id = dataUser.id;
      let data_order = {
        cart: cart,
        user: {
          name: name,
          address: address,
          phone: phone,
          user_id: user_id,
          payment: payment,
        },
      };
      if (payment === "off") {
        dispatch(addOrderOff(data_order)).then((result) => {
          if (result.payload.success === true) {
            dispatch(clearCart());
            navigate("/order_success");
          }
        });
      }
      if (payment === "online") {
        const stripe = await loadStripe(
          "pk_test_51PEShMC1J19xsVaHRFSg1Ut7AQZU8WOYbZ7X7hQqh7enlkx71HB5jwRFuEq2yiXpb3kv6Dq7B4xjmSyErDXwpGtW0084FRy4LR"
        );
        dispatch(addOrderOnl(data_order)).then((result) => {
          if (result.payload.success === true) {
            const res = stripe.redirectToCheckout({
              sessionId: result.payload.id,
            });
            if (res.error) {
              console.log(res.error);
            }
          }
        });
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="container-fluid">
      <h4>CHI TIẾT ĐẶT HÀNG</h4>
      <div className="row">
        <div className="col-6">
          <hr />
          <form>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Người nhận hàng</label>
                  <p style={{ color: "#cd3f34" }}>*</p>
                  <input
                    style={{ height: "50px", borderColor: "gray" }}
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Số điện thoại</label>
                  <p style={{ color: "#cd3f34" }}>*</p>
                  <input
                    style={{ height: "50px", borderColor: "gray" }}
                    type="text"
                    className="form-control"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Địa chỉ nhận hàng</label>
              <p style={{ color: "#cd3f34" }}>*</p>
              <input
                style={{ height: "50px", borderColor: "gray" }}
                type="text"
                className="form-control"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="col-6">
          <div
            style={{
              margin: "auto",
              width: "70%",
              height: "350px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <div style={{ paddingLeft: "50px", paddingTop: "40px" }}>
              <h5>THÀNH TIỀN</h5>
              <div style={{ marginTop: "20px" }} className="row">
                <div className="col-6">
                  <h6>TỔNG</h6>
                </div>
                <div className="col-6">
                  <p style={{ color: "#ce1515 ", fontWeight: "bold" }}>
                    {cartTotalAmount.toLocaleString("vi-VN")} đ
                  </p>
                </div>
              </div>
              <div>
                <h6>Phương thức thanh toán</h6>
                <div style={{ marginTop: "20px" }} className="form-check">
                  <input
                    style={{ borderColor: "#4e7661" }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={"off"}
                    onChange={(event) => setPayment(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Thanh toán khi nhận hàng
                  </label>
                </div>
                <div style={{ marginTop: "20px" }} className="form-check">
                  <input
                    style={{ borderColor: "#4e7661" }}
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    value={"online"}
                    onChange={(event) => setPayment(event.target.value)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Thanh toán Online
                  </label>
                </div>
              </div>
              <div style={{ marginTop: "20px" }}>
                <button
                  style={{
                    width: "80%",
                    height: "45px",
                    border: "none",
                    borderRadius: "15px",
                    margin: "auto",
                    backgroundColor: "#4e7661",
                    color: "white",
                    fontWeight: "bold",
                  }}
                  onClick={() => orderClick()}
                >
                  {isLoadingOrder === true ? "LOADING..." : "Đặt Hàng"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
