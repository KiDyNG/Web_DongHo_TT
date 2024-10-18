import React from "react";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";
import ProductDetail from "../../components/customer/ProductDetail";

const Detail = () => {
  return (
    <>
      <HeaderComponent />
      <ProductDetail />
      <FooterComponent />
    </>
  );
};
export default Detail;
