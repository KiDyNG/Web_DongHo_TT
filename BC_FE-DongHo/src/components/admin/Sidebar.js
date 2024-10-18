import React from "react";
import logo from "../../assets/customer/images/logo-xd.png";
import { AiOutlineDashboard } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { IoBagOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/silce/admin/authSlice";
import { toast } from "react-toastify";
const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutClick = () => {
    dispatch(logoutAdmin()).then((res) => {
      if (res.payload && res.payload.success === true) {
        toast.success(`${res.payload.message}`);
        navigate("/admin");
      }
    });
  };
  return (
    <div className="bg-white sidebar p-2">
      <div className="m-2">
        <img src={logo} alt="" width={"200px"} />
      </div>
      <hr className="text-dark" />
      <div>
        <div
          onClick={() => navigate("/admin/dashboard")}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2"
        >
          <AiOutlineDashboard
            style={{ fontSize: "30px", color: "#030303", marginRight: "5px" }}
          />
          <span>Dashboard</span>
        </div>
        <br />
        <div
          onClick={() => navigate("/admin/orders")}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
        >
          <IoBagOutline
            style={{ fontSize: "30px", color: "#030303", marginRight: "5px" }}
          />
          <span>Đơn Hàng</span>
        </div>
        <br />
        <div
          onClick={() => navigate("/admin/products")}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
        >
          <RiProductHuntLine
            style={{ fontSize: "30px", color: "#030303", marginRight: "5px" }}
          />
          <span>Sản Phẩm</span>
        </div>
        <br />
        <div
          onClick={() => logoutClick()}
          style={{ cursor: "pointer" }}
          className="list-group-item py-2 "
        >
          <MdOutlineLogout
            style={{ fontSize: "30px", color: "#030303", marginRight: "5px" }}
          />
          <span>Đăng Xuất</span>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
