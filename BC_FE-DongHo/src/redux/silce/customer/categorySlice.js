import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";

const URL_API = UrlApi();
const initialState = {
  categoriesList: [],
  listProductCategory: [],
  totalPage: 0,
  isLoading: false,
  isError: false,
};

export const fetchAllCategory = createAsyncThunk(
  "category/fetchAllCategory",
  async () => {
    try {
      const res = await axios.get(URL_API + `/categories`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAllProductCategory = createAsyncThunk(
  "category/fetchAllProductCategory",
  async (data) => {
    try {
      const res = await axios.get(
        URL_API + `/categories/${data.category_id}?page=${data.page}`
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const categorySlice = createSlice({
  name: "customer/categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategory.pending, (state, action) => {
        state.isLoading = true;
        state.categoriesList = [];
        state.isError = false;
      })
      .addCase(fetchAllCategory.fulfilled, (state, action) => {
        state.categoriesList = action.payload.data;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.categoriesList = [];
      })

      .addCase(fetchAllProductCategory.pending, (state, action) => {
        state.isLoading = true;
        state.listProductCategory = [];
        state.isError = false;
      })
      .addCase(fetchAllProductCategory.fulfilled, (state, action) => {
        state.listProductCategory = action.payload.products;
        state.totalPage = action.payload.total_page;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(fetchAllProductCategory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.listProductCategory = [];
      });
  },
});

export default categorySlice.reducer;
