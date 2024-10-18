import React from "react";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";
import ProductSearch from "../../components/customer/ProductSearch";

const Search = () => {
  return (
    <>
      <HeaderComponent />
      <ProductSearch />
      <FooterComponent />
    </>
  );
};
export default Search;
