import React from "react";
import "./Cancel.css";
import { useNavigate } from "react-router-dom";

export default function Cancel() {
  const navigate = useNavigate();
  return (
    <div style={{ marginTop: "200px" }} class="row justify-content-center">
      <div class="col-md-5">
        <div class="message-box _success _failed">
          <i class="fa fa-times-circle" aria-hidden="true"></i>
          <h4> Thanh toán không thành công </h4>
          <div>
            <button
              style={{ marginTop: "10px" }}
              type="button"
              class="btn btn-danger"
              onClick={() => navigate("/")}
            >
              Quay lại
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
