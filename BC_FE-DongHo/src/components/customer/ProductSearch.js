import React, { useEffect, useState } from "react";
import { UrlImage } from "../../url";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { getProductSearch } from "../../axios/services";

const URL_IMAGE = UrlImage();
const ProductSearch = () => {
  const navigate = useNavigate();
  const [listProduct, setListProduct] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const location = useLocation();
  let name = new URLSearchParams(location.search).get("name");

  const fetchProductSearch = async (page) => {
    try {
      let res = await getProductSearch(name, page);
      console.log(res.data);
      setListProduct(res.data.products);
      setTotalPage(res.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProductSearch(page);
  }, [page, name]);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };
  return (
    <div
      style={{ marginTop: "40px", marginBottom: "40px" }}
      className="container"
    >
      <h3 style={{ marginBottom: "20px", color: "gray", textAlign: "center" }}>
        SẢN PHẨM CẦN TÌM
      </h3>

      {listProduct && listProduct.length > 0 ? (
        <>
          <div className="row">
            {listProduct.map((item, index) => {
              return (
                <div
                  key={`product-${index}`}
                  style={{ marginBottom: "50px" }}
                  className="col-3"
                >
                  <div>
                    <Link to={`/detail/${item.id}`}>
                      <img width={"100%"} src={URL_IMAGE + item.image} alt="" />
                    </Link>
                  </div>
                  <div>
                    <p
                      style={{
                        overflow: "hidden",
                        maxHeight: "2.8em",
                        lineHeight: "1.4em",
                        textAlign: "center",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/detail/${item.id}`)}
                    >
                      {item.name}
                    </p>
                  </div>
                  <div>
                    <FaStar style={{ color: "#e3c01c" }} />
                    <FaStar style={{ color: "#e3c01c" }} />
                    <FaStar style={{ color: "#e3c01c" }} />
                    <FaStar style={{ color: "#e3c01c" }} />
                    <FaStar style={{ color: "#e3c01c" }} />
                  </div>
                  <div>
                    <p style={{ fontWeight: "bold" }}>
                      {item.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
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
        </>
      ) : (
        <>
          <div
            style={{
              textAlign: "center",
            }}
          >
            <h4>Không tìm thấy sản phẩm</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSearch;
