import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const searchClick = () => {
    if (!search) {
      toast.error("Vui lòng nhập tên sản phẩm");
      return;
    }
    navigate(`/search?name=${search}`);
  };
  const handleKeyPress = (event) => {
    if (event.keyCode === 13 || event.which === 13) {
      searchClick();
    }
  };
  return (
    <div
      style={{ marginTop: "20px", marginBottom: "30px" }}
      className="container"
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <input
          style={{ width: "70%", marginRight: "10px" }}
          className="form-control"
          type="text"
          placeholder="Nhập tên sản phẩm..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="btn btn"
          style={{
            backgroundColor: "#000000",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={() => searchClick()}
        >
          <IoSearch />
        </button>
      </div>
    </div>
  );
};
export default SearchInput;
