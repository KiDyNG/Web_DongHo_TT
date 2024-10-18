import React from "react";
import HeaderComponent from "../../components/customer/Header/Header";
import FooterComponent from "../../components/customer/Footer/Footer";
import CartItem from "../../components/customer/CartItem";

const Cart = () => {
  return (
    <>
      <HeaderComponent />
      <CartItem />
      <FooterComponent />
    </>
  );
};
export default Cart;
