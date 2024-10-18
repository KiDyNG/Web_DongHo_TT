import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import logo from "../../../assets/customer/images/logo-xd.png";

const Footer = () => {
  return (
    <>
      <MDBFooter
        style={{ backgroundColor: "#f8f9fa" }}
        className="text-center text-lg-start text-muted"
      >
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
          <div>
            <span style={{ textAlign: "center" }}></span>
          </div>
        </section>
        <section className="">
          <MDBContainer className="text-center text-md-start mt-5">
            <MDBRow className="mt-3">
              <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                <img src={logo} alt="" style={{ width: "200px" }} />
              </MDBCol>

              <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  Thương Hiệu
                </h6>
                <p style={{ color: "#14134f" }}>Casio</p>
                <p style={{ color: "#14134f" }}>Citizen</p>
                <p style={{ color: "#14134f" }}>Koi</p>
                <p style={{ color: "#14134f" }}>Tissot</p>
                <p style={{ color: "#14134f" }}>Doxa</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  Đồng Hồ
                </h6>
                <p style={{ color: "#14134f" }}>Đồng Hồ Nam</p>
                <p style={{ color: "#14134f" }}>Đồng Hồ Nữ</p>
                <p style={{ color: "#14134f" }}>Đồng Hồ Đôi</p>
              </MDBCol>

              <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  Phụ Kiện
                </h6>
                <p style={{ color: "#14134f" }}>Ví Da</p>
                <p style={{ color: "#14134f" }}>Dây Da</p>
              </MDBCol>

              <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                <h6
                  style={{ color: "#14134f" }}
                  className="text-uppercase fw-bold mb-4"
                >
                  LIÊN HỆ
                </h6>
                <p style={{ color: "#14134f" }}>
                  <MDBIcon color="#14134f" icon="home" className="me-2" />
                  Dương Liễu, Hoài Đức, Hà Nội
                </p>
                <p style={{ color: "#14134f" }}>
                  <MDBIcon color="#14134f" icon="envelope" className="me-3" />
                  duyminhwatch@gmail.com
                </p>
                <p style={{ color: "#14134f" }}>
                  <MDBIcon color="#14134f" icon="phone" className="me-3" />{" "}
                  0967792857
                </p>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section>
      </MDBFooter>
    </>
  );
};
export default Footer;
