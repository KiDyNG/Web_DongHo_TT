import React from "react";
import HeaderComponent from "../../components/customer/Header/Header";
import ProductCategory from "../../components/customer/ProductCategory";
import FooterComponent from "../../components/customer/Footer/Footer";

export default function Category() {
  return (
    <>
      <HeaderComponent />
      <ProductCategory />
      <FooterComponent />
    </>
  );
}
