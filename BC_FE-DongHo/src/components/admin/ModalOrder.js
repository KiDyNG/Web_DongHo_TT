import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { UrlImage } from "../../url";

const ModalOrder = (props) => {
  const URL_IMAGE = UrlImage();
  const { showModal, handleClose, dataOrder } = props;
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    if (showModal && dataOrder) {
      setListProduct(dataOrder.order.Order_Products);
    }
  }, [showModal, dataOrder]);
  return (
    <>
      <Modal size="lg" show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>CHI TIẾT ĐƠN HÀNG</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            {listProduct &&
              listProduct.length > 0 &&
              listProduct.map((item, index) => {
                return (
                  <div key={index + 1} className="row">
                    <div className="col-sm-3">
                      <img
                        width={"120px"}
                        src={URL_IMAGE + item.Product.image}
                        alt=""
                      />
                    </div>
                    <div className="col-sm-9">
                      <p>{item.Product.name}</p>
                      <p>x {item.quantity}</p>
                      <p
                        style={{
                          color: "#4e7661",
                          fontWeight: "bold",
                        }}
                      >
                        {item.Product.price.toLocaleString("vi-VN")} đ
                      </p>
                    </div>
                  </div>
                );
              })}
            <br />
            {dataOrder && dataOrder.order && (
              <div style={{ fontWeight: "bold" }}>
                {dataOrder.order.payment}
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "150px" }}
            variant="secondary"
            onClick={handleClose}
          >
            ĐÓNG
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ModalOrder;
