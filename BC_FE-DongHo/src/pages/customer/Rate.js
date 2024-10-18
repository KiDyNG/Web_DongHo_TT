import React, { useEffect, useState } from "react";
import Header from "../../components/customer/Header/Header";
import Footer from "../../components/customer/Footer/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductRate,
  handleRate,
} from "../../redux/silce/customer/rateSlice";
import "../../assets/customer/Rate.css";
import { toast } from "react-toastify";
import { UrlImage } from "../../url";

const Rate = () => {
  const URL_IMAGE = UrlImage();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthError);
  let order_id = new URLSearchParams(location.search).get("order_id");
  let user_id = new URLSearchParams(location.search).get("user_id");
  let product_id = new URLSearchParams(location.search).get("product_id");
  const { ProductRate, isSuccessRate } = useSelector(
    (state) => state.customer.rate
  );
  let data = {
    order_id: order_id,
    product_id: product_id,
    user_id: user_id,
  };
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/login");
    }
    if (!order_id || !user_id || !product_id) {
      navigate("/");
    }
    dispatch(getProductRate(data));
  }, [isSuccessRate, isAuth]);
  const isValidRate = () => {
    if (!rating) {
      toast.error("Vui chọn số sao đánh giá");
      return false;
    }
    if (!comment) {
      toast.error("Vui nhập thông tin đánh giá");
      return false;
    }
    return true;
  };
  const rateClick = () => {
    let check = isValidRate();
    if (check === true) {
      let data_rate = {
        order_id: order_id,
        product_id: product_id,
        user_id: user_id,
        rating: rating,
        comment: comment,
      };
      console.log(data_rate);
      dispatch(handleRate(data_rate));
      toast.success("Đánh giá sản phẩm thành công");
    }
  };
  return (
    <>
      <Header />
      <div className="container">
        <h4 style={{ marginBottom: "40px", color: "gray" }}>
          ĐÁNH GIÁ SẢN PHẨM
        </h4>
      </div>
      {ProductRate && ProductRate.product ? (
        <>
          <div style={{ marginBottom: "100px" }} className="container">
            <div className="row">
              <div className="col-2">
                <img
                  width={"200px"}
                  src={URL_IMAGE + ProductRate.product.image}
                  alt=""
                />
              </div>
              <div className="col-10">
                <p>{ProductRate.product.name}</p>
                <form>
                  <div className="rating">
                    <input
                      type="radio"
                      id="star5"
                      name="rating"
                      value="5"
                      onChange={() => setRating(5)}
                    />
                    <label
                      className="full"
                      htmlFor="star5"
                      title="Awesome - 5 stars"
                    ></label>
                    <input
                      type="radio"
                      id="star4"
                      name="rating"
                      value="4"
                      onChange={() => setRating(4)}
                    />
                    <label
                      className="full"
                      htmlFor="star4"
                      title="Pretty good - 4 stars"
                    ></label>
                    <input
                      type="radio"
                      id="star3"
                      name="rating"
                      value="3"
                      onChange={() => setRating(3)}
                    />
                    <label
                      className="full"
                      htmlFor="star3"
                      title="Meh - 3 stars"
                    ></label>
                    <input
                      type="radio"
                      id="star2"
                      name="rating"
                      value="2"
                      onChange={() => setRating(2)}
                    />
                    <label
                      className="full"
                      htmlFor="star2"
                      title="Kinda bad - 2 stars"
                    ></label>
                    <input
                      type="radio"
                      id="star1"
                      name="rating"
                      value="1"
                      onChange={() => setRating(1)}
                    />
                    <label
                      className="full"
                      htmlFor="star1"
                      title="Sucks big time - 1 star"
                    ></label>
                  </div>
                  <div className="form-group">
                    <textarea
                      className="form-control"
                      rows="7"
                      id="comment"
                      name="comment"
                      placeholder="Nhập ghi chú đánh giá..."
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <br />
                  <button
                    style={{ width: "150px" }}
                    onClick={() => rateClick()}
                    type="button"
                    className="btn btn-dark"
                  >
                    Đánh giá
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {ProductRate && ProductRate.message && (
            <div style={{ marginBottom: "100px", textAlign: "center" }}>
              <h4>{ProductRate.message}</h4>
            </div>
          )}
        </>
      )}

      <Footer />
    </>
  );
};
export default Rate;
