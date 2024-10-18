import React from "react";
import { Routes, Route } from "react-router-dom";
import DashBoard from "../pages/admin/DashBoard";
import NotFound from "../pages/404";
import Login from "../pages/admin/Login";
import OrderManage from "../pages/admin/OrderManage";
import ProductManage from "../pages/admin/ProductManage";

const AdminRoute = (props) => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/orders" element={<OrderManage />} />
      <Route path="/products" element={<ProductManage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminRoute;
