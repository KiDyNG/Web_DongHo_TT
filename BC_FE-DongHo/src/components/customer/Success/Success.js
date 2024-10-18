import React, { useEffect } from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../../redux/silce/customer/cartSlice";
import { useDispatch } from "react-redux";

export default function Success() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, []);
  return (
    <div style={{ marginTop: "200px" }} className="container">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="message-box _success">
            <i className="fa fa-check-circle" aria-hidden="true"></i>
            <h4> Đặt hàng thành công ! </h4>
            <div>
              <button
                style={{ marginTop: "10px" }}
                type="button"
                class="btn btn-success"
                onClick={() => navigate("/")}
              >
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
