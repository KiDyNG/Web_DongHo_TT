import React, { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { UrlImage } from "../../url";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import {
  removeCart,
  decreaseCart,
  addTocart,
  getTotal,
} from "../../redux/silce/customer/cartSlice";
import Order from "./Order";
import { useNavigate } from "react-router-dom";

const CartItem = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.customer.cart.cartItem);
  const cartTotalAmount = useSelector(
    (state) => state.customer.cart.cartTotalAmount
  );
  const removeCartClick = (product) => {
    dispatch(removeCart(product));
  };
  const decreaseCartClick = (product) => {
    dispatch(decreaseCart(product));
  };
  const increaseCartClick = (product) => {
    dispatch(addTocart(product));
  };
  useEffect(() => {
    dispatch(getTotal());
  }, [cart]);
  return (
    <>
      <div style={{ marginBottom: "100px" }} className="container">
        <div className="container-fluid" style={{ marginTop: "50px" }}>
          <table className="table table-borderless">
            <thead>
              <tr>
                <th scope="col">SẢN PHẨM</th>
                <th scope="col">TÊN</th>
                <th scope="col">GIÁ</th>
                <th scope="col">SỐ LƯỢNG</th>
                <th scope="col">TỔNG TIỀN</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cart && cart.length > 0 ? (
                <>
                  {cart.map((item, index) => {
                    return (
                      <tr key={`cart-${index}`}>
                        <td>
                          <img
                            src={URL_IMAGE + item.image}
                            width={"120px"}
                            alt=""
                          />
                        </td>
                        <td style={{ width: "400px", textAlign: "left" }}>
                          {item.name}
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {item.price.toLocaleString("vi-VN")} đ
                        </td>
                        <td>
                          <FaCircleMinus
                            onClick={() => decreaseCartClick(item)}
                            style={{
                              fontSize: "25px",
                              color: "#14134f",
                              marginRight: "10px",
                              cursor: "pointer",
                            }}
                          />
                          {item.cartQuantity}
                          <FaCirclePlus
                            onClick={() => increaseCartClick(item)}
                            style={{
                              fontSize: "25px",
                              color: "#14134f",
                              marginLeft: "10px",
                              cursor: "pointer",
                            }}
                          />
                        </td>
                        <td style={{ fontWeight: "bold" }}>
                          {(item.cartQuantity * item.price).toLocaleString(
                            "vi-VN"
                          )}{" "}
                          đ
                        </td>
                        <td>
                          <TiDelete
                            onClick={() => removeCartClick(item)}
                            style={{
                              fontSize: "50px",
                              color: "#14134f",
                              cursor: "pointer",
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td colSpan={"5"} style={{ textAlign: "center" }}>
                      <h5 style={{ color: "gray" }}>GIỎ HÀNG TRỐNG</h5>
                    </td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <Order />
      </div>
    </>
  );
};
export default CartItem;
