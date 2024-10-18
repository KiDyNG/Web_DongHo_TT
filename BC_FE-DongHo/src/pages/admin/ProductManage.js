import React, { useState, useEffect } from "react";
import Nav from "../../components/admin/Nav";
import Sidebar from "../../components/admin/Sidebar";
import { getProductAdmin } from "../../axios/services";
import ReactPaginate from "react-paginate";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { UrlImage } from "../../url";
import ModalAddProduct from "../../components/admin/ModalAddProduct";
import ModalEditProduct from "../../components/admin/ModalEditProduct";
import { handleDeleteProduct } from "../../redux/silce/admin/productSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductManage = () => {
  const navigate = useNavigate();
  const URL_IMAGE = UrlImage();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [listProduct, setListProduct] = useState([]);
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [productEdit, setProductEdit] = useState({});
  const deleteProduct = useSelector(
    (state) => state.admin.product.deleteProduct
  );
  const updateProduct = useSelector(
    (state) => state.admin.product.updateProduct
  );
  const storeProduct = useSelector((state) => state.admin.product.storeProduct);
  const isAuth = useSelector((state) => state.admin.auth.isAuth);
  const Toggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    if (isAuth && isAuth.detail) {
      navigate("/admin");
    }
    fetchAllProduct();
  }, [page, deleteProduct, updateProduct, isAuth, storeProduct]);

  const fetchAllProduct = async () => {
    try {
      const res = await getProductAdmin(page);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };
  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const handleClose = () => {
    setShowModalAdd(false);
  };
  const handleCloseEdit = () => {
    setShowModalEdit(false);
  };

  const displayAdd = () => {
    setShowModalAdd(true);
  };

  const showEdit = (product) => {
    setShowModalEdit(true);
    setProductEdit(product);
  };

  const deleteClick = (product_id) => {
    dispatch(handleDeleteProduct(product_id)).then((res) => {
      if (res.payload && res.payload.success === true) {
        toast.success(`${res.payload.message}`);
      }
      if (res.payload && res.payload.detail) {
        toast.warning(`${res.payload.detail}`);
      }
    });
  };

  return (
    <>
      <div
        style={{ backgroundColor: "#f0f0f0" }}
        className="container-fluid bg min-vh-100 "
      >
        <div className="row ">
          {toggle && (
            <div className="col-4 col-md-2 bg-white vh-100 position-fixed">
              <Sidebar />
            </div>
          )}
          {toggle && <div className="col-4 col-md-2"></div>}
          <ModalAddProduct
            showModalAdd={showModalAdd}
            handleClose={handleClose}
          />
          <ModalEditProduct
            showModalEdit={showModalEdit}
            handleCloseEdit={handleCloseEdit}
            productEdit={productEdit}
          />
          <div className="col">
            <div className="px-3">
              <Nav Toggle={Toggle} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ color: "#14134f " }} className="text fs-4">
                  QUẢN LÝ SẢN PHẨM
                </div>
                <button
                  onClick={() => displayAdd()}
                  type="button"
                  className="btn btn-primary"
                >
                  THÊM SẢN PHẨM
                </button>
              </div>
              <table className="table caption-top bg-white rounded mt-2">
                <thead>
                  <tr>
                    <th scope="col">STT</th>
                    <th scope="col">Ảnh</th>
                    <th scope="col">Tên</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Danh Mục</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listProduct &&
                    listProduct.length > 0 &&
                    listProduct.map((item, index) => {
                      const displayIndex = (page - 1) * 5 + index + 1;
                      return (
                        <tr key={index}>
                          <th scope="row">{displayIndex}</th>
                          <td style={{ width: "150px" }}>
                            <img
                              width={"100px"}
                              src={URL_IMAGE + item.image}
                              alt=""
                            />
                          </td>
                          <td style={{ width: "400px" }}>{item.name}</td>
                          <td
                            style={{
                              fontWeight: "bold",
                            }}
                          >
                            {item.price.toLocaleString("vi-VN")} đ
                          </td>
                          <td>{item.CategoryId}</td>
                          <td>
                            <RiDeleteBin6Fill
                              style={{
                                fontSize: "25px",
                                marginRight: "10px",
                                cursor: "pointer",
                                color: "#ee4d2d",
                              }}
                              onClick={() => deleteClick(item.id)}
                            />
                            <BiSolidMessageSquareEdit
                              style={{
                                fontSize: "23px",
                                marginRight: "10px",
                                cursor: "pointer",
                                color: "#b79635",
                              }}
                              onClick={() => showEdit(item)}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => handlePageClick(e)}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={totalPage}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductManage;
