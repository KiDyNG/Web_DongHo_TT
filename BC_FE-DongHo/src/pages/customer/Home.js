import React from "react";
import HeaderComponent from "../../components/customer/Header/Header";
import Banner from "../../components/customer/Banner";
import ProductHome from "../../components/customer/ProductHome";
import FooterComponent from "../../components/customer/Footer/Footer";

const Home = () => {
  return (
    <>
      <HeaderComponent />
      <Banner />
      <ProductHome />
      <FooterComponent />
    </>
  );
};
export default Home;
