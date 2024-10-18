import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../../assets/customer/images/logo-xd.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authLogin, logout } from "../../../redux/silce/customer/authSilce";
import { toast } from "react-toastify";
import { TiShoppingCart } from "react-icons/ti";
import { getTotal } from "../../../redux/silce/customer/cartSlice";
import { fetchAllCategory } from "../../../redux/silce/customer/categorySlice";
import SearchInput from "../SearchInput";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.customer.auth.isAuthSucess);
  const userLogin = useSelector((state) => state.customer.auth.dataUser);
  const { categoriesList } = useSelector((state) => state.customer.category);
  const { cartTotalQuantity, cartItem } = useSelector(
    (state) => state.customer.cart
  );
  const navigatePage = (page) => {
    navigate(page);
  };
  useEffect(() => {
    dispatch(getTotal());
    dispatch(fetchAllCategory());
    dispatch(authLogin());
  }, [cartItem]);
  const logoutClick = () => {
    dispatch(logout()).then((result) => {
      if (result.payload.success && result.payload.success === true) {
        toast.success(`${result.payload.message}`);
        navigate("/login");
      }
    });
  };
  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container style={{ backgroundColor: "#f8f9fa", borderRadius: "50px" }}>
          <Navbar.Brand>
            <img
              style={{ cursor: "pointer" }}
              width={"100px"}
              src={logo}
              alt=""
              onClick={() => navigate("/")}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                onClick={() => navigatePage("/")}
                style={{ color: "#000000" }}
              >
                Trang Chủ
              </Nav.Link>
              {categoriesList &&
                categoriesList.length > 0 &&
                categoriesList.map((item, index) => (
                  <NavDropdown
                    key={`category_parent-${index}`}
                    title={item.category_parent}
                    id="collapsible-nav-dropdown"
                    active={true}
                    style={{ color: "#464646" }}
                  >
                    {item.categories.map((category) => (
                      <NavDropdown.Item
                        onClick={() => navigatePage(`/category/${category.id}`)}
                        key={`category-${category.id}`}
                        style={{ color: "#14134f" }}
                      >
                        {category.name}
                      </NavDropdown.Item>
                    ))}
                  </NavDropdown>
                ))}
              <Nav.Link style={{ color: "#000000" }}>Liên Hệ</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <TiShoppingCart
                  onClick={() => navigatePage("/cart")}
                  style={{ fontSize: "30px", color: "#000000" }}
                />
                <span
                  style={{
                    display: "inline-block",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    backgroundColor: "#c6c7c8",
                    textAlign: "center",
                    lineHeight: "19px",
                    color: "white",
                  }}
                >
                  {cartTotalQuantity}
                </span>
              </Nav.Link>
              {isAuth && isAuth.success === true ? (
                <>
                  <NavDropdown title="Tài Khoản" id="collapsible-nav-dropdown">
                    {userLogin && userLogin.name && (
                      <NavDropdown.Item>
                        Hello ! {userLogin.name}
                      </NavDropdown.Item>
                    )}
                    <NavDropdown.Item
                      onClick={() =>
                        navigatePage(`/order_wait/${userLogin.id}`)
                      }
                    >
                      Đơn Hàng
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => logoutClick()}>
                      Đăng Xuất
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <NavDropdown
                    title="Tài Khoản"
                    id="collapsible-nav-dropdown"
                    active={true}
                    style={{ color: "#464646" }}
                  >
                    <NavDropdown.Item onClick={() => navigatePage("/login")}>
                      Đăng Nhập
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={() => navigatePage("/register")}>
                      Đăng Ký 
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SearchInput />
    </>
  );
};

export default Header;
