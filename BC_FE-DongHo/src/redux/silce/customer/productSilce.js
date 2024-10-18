import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";

const URL_API = UrlApi();
const initialState = {
  listProduct: [],
  listProductSearch: [],
  totalPage: 0,
  isLoading: false,
  isError: false,
  productDetail: null,
  rate: [],
  countRate: 0,
  countStar: {},
};

export const fetchProductHome = createAsyncThunk(
  "product/fetchProductHome",
  async () => {
    try {
      const res = await axios.get(URL_API + `/products/home`);
      return res.data.products;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "product/getProductDetail",
  async (product_id) => {
    try {
      const res = await axios.get(URL_API + `/products/detail/${product_id}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductSearch = createAsyncThunk(
  "product/getProductSearch",
  async (data) => {
    try {
      const res = await axios.get(
        URL_API + `/search/${data.name}/${data.page}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const productSilce = createSlice({
  name: "customer/products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductHome.pending, (state, action) => {
        state.listProduct = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProductHome.fulfilled, (state, action) => {
        state.listProduct = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchProductHome.rejected, (state, action) => {
        state.listProduct = [];
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getProductDetail.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail = action.payload.product;
        state.rate = action.payload.rate;
        state.countRate = action.payload.countRate;
        state.countStar = action.payload.countStar;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })

      .addCase(getProductSearch.pending, (state, action) => {
        state.listProductSearch = [];
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getProductSearch.fulfilled, (state, action) => {
        state.listProductSearch = action.payload.products;
        state.totalPage = action.payload.total_page;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProductSearch.rejected, (state, action) => {
        state.listProductSearch = [];
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default productSilce.reducer;
