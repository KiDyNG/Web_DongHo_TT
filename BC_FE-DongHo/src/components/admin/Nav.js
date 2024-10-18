import React, { useEffect } from "react";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import { useDispatch, useSelector } from "react-redux";
import { authLoginAdmin } from "../../redux/silce/admin/authSlice";

const Nav = ({ Toggle }) => {
  const dispatch = useDispatch();
  const { dataAdmin } = useSelector((state) => state.admin.auth);
  useEffect(() => {
    dispatch(authLoginAdmin());
  }, []);
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      <i
        style={{ color: "#14134f" }}
        className="navbar-brand bi bi-justify-left fs-4"
        onClick={Toggle}
      ></i>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          {dataAdmin && dataAdmin.name && (
            <li className="nav-item">
              <i style={{ color: "#14134f", fontWeight: "bold" }}>Xin chào !</i>{" "}
              {dataAdmin.name}
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};
export default Nav;
