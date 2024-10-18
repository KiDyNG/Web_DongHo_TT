import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";

const URL_API = UrlApi();

const initialState = {
  isLoadingRate: false,
  isSuccessRate: null,
  isErrorRate: false,
  ProductRate: null,
};

export const getProductRate = createAsyncThunk(
  "rate/getProductRate",
  async (data_rate, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        URL_API +
          `/rate/${data_rate.order_id}/${data_rate.product_id}/${data_rate.user_id}`,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const handleRate = createAsyncThunk(
  "rate/handleRate",
  async (data_rate, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/rate`, data_rate, {
        withCredentials: true,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const rateSlice = createSlice({
  name: "customer/rate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductRate.pending, (state, action) => {
        state.isLoadingRate = true;
        state.ProductRate = null;
        state.isErrorRate = null;
      })
      .addCase(getProductRate.fulfilled, (state, action) => {
        state.isLoadingRate = true;
        state.ProductRate = action.payload;
        state.isErrorRate = false;
      })
      .addCase(getProductRate.rejected, (state, action) => {
        state.isLoadingRate = false;
        state.isSuccessRate = null;
        state.isErrorRate = true;
      })

      .addCase(handleRate.pending, (state, action) => {
        state.isLoadingRate = true;
        state.ProductRate = null;
        state.isErrorRate = null;
      })
      .addCase(handleRate.fulfilled, (state, action) => {
        state.isLoadingRate = true;
        state.isSuccessRate = action.payload;
        state.isErrorRate = false;
      })
      .addCase(handleRate.rejected, (state, action) => {
        state.isLoadingRate = false;
        state.isSuccessRate = null;
        state.isErrorRate = true;
      });
  },
});

export default rateSlice.reducer;
