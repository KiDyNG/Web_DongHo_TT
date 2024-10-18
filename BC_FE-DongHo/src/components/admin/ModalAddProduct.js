import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategory,
  handleStoreProduct,
} from "../../redux/silce/admin/productSlice";

const ModalAddProduct = (props) => {
  const { showModalAdd, handleClose } = props;
  const [image, setImage] = useState(null);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const { listCategory } = useSelector((state) => state.admin.product);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showModalAdd === false) {
      clearInput();
    }
    dispatch(getCategory());
  }, [showModalAdd]);

  const clearInput = () => {
    setImage(null);
    setName("");
    setPrice("");
    setQuantity("");
    setCategoryId("");
    setDescription("");
    setImageAvatar(null);
  };

  const isValidAdd = () => {
    if (!name) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return false;
    }
    if (!price) {
      toast.error("Vui lòng nhập giá");
      return false;
    }
    if (!quantity) {
      toast.error("Vui lòng nhập số lượng");
      return false;
    }
    if (!categoryId) {
      toast.error("Vui lòng chọn danh mục");
      return false;
    }
    if (!description) {
      toast.error("Vui lòng điền mô tả");
      return false;
    }
    if (!image) {
      toast.error("Vui lòng chọn ảnh sản phẩm");
      return false;
    }
    if (isNaN(quantity)) {
      toast.error("Vui lòng nhập đúng số lượng");
      return false;
    }
    if (isNaN(price)) {
      toast.error("Vui lòng nhập đúng giá");
      return false;
    }
    return true;
  };

  const selectImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (validTypes.indexOf(file.type) === -1 || file.size > 1024 * 1024) {
        toast.error("Vui lòng chọn đúng định dạng ảnh");
        return;
      }
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const submitAdd = () => {
    let check = isValidAdd();
    if (check === true) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category_id", categoryId);
      formData.append("description", description);
      dispatch(handleStoreProduct(formData)).then((res) => {
        if (res.payload && res.payload.success === true) {
          toast.success(`${res.payload.message}`);
          clearInput();
          handleClose();
        }
      });
    }
  };
  return (
    <>
      <Modal size="xl" show={showModalAdd} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>THÊM SẢN PHẨM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label className="form-label">Tên sản phẩm:</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3">
                  <label className="form-label">Giá:</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="mb-3">
                  <label className="form-label">Số lượng:</label>
                  <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <img
                  width={"100%"}
                  src={
                    imageAvatar
                      ? imageAvatar
                      : "https://png.pngtree.com/png-vector/20190614/ourlarge/pngtree-cameraimagephotopicture-blue-icon-on-abstract-cloud-backgr-png-image_1475517.jpg"
                  }
                  alt=""
                />
              </div>
              <div className="col-8">
                <div className="row">
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Ảnh:</label>
                      <input
                        type="file"
                        onChange={(e) => selectImage(e)}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-3">
                      <label className="form-label">Danh mục:</label>
                      <select
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="form-select"
                      >
                        <option value={categoryId}>
                          Chọn danh mục sản phẩm
                        </option>
                        {listCategory &&
                          listCategory.length > 0 &&
                          listCategory.map((item, index) => {
                            return (
                              <option key={index + 1} value={item.id}>
                                {item.name}
                              </option>
                            );
                          })}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlTextarea1"
                      className="form-label"
                    >
                      Mô tả:
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      style={{ width: "100%", height: "200px" }}
                      className="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{ width: "150px" }}
            variant="primary"
            onClick={() => submitAdd()}
            type="button"
          >
            THÊM
          </Button>
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
export default ModalAddProduct;
