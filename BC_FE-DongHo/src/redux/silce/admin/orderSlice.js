import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";
import { toast } from "react-toastify";

const URL_API = UrlApi();

const initialState = {
  isLoadingOrder: false,
  isSuccessOrder: null,
  isErrorOrder: false,
  listOrderHome: null,
  orderDetail: null,
  isSuccessConfirmOrder: null,
  isSuccessDeleteOrder: null,
};

export const getOrderHome = createAsyncThunk(
  "order/orderDashBoard",
  async () => {
    try {
      const res = await axios.get(URL_API + `/admin/dashboard`, {
        withCredentials: true,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrderDetail = createAsyncThunk(
  "order/getOrderDetail",
  async (order_id) => {
    try {
      const res = await axios.get(URL_API + `/admin/orders/${order_id}`, {
        withCredentials: true,
      });
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleConfirmOrder = createAsyncThunk(
  "order/handleConfirmOrder",
  async (order_id) => {
    try {
      const res = await axios.put(
        URL_API + `/admin/orders/confirm/${order_id}`,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const handleDeleteOrder = createAsyncThunk(
  "order/handleDeleteOrder",
  async (order_id) => {
    try {
      const res = await axios.delete(
        URL_API + `/admin/orders/delete/${order_id}`,
        {
          withCredentials: true,
        }
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const orderSlice = createSlice({
  name: "admin/order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderHome.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.listOrderHome = null;
        state.isErrorOrder = null;
      })
      .addCase(getOrderHome.fulfilled, (state, action) => {
        state.isLoadingOrder = true;
        state.listOrderHome = action.payload;
        state.isErrorOrder = null;
      })
      .addCase(getOrderHome.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.listOrderHome = null;
        state.isErrorOrder = true;
      })

      .addCase(getOrderDetail.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.orderDetail = null;
        state.isErrorOrder = null;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.isLoadingOrder = true;
        state.orderDetail = action.payload;
        state.isErrorOrder = null;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.orderDetail = null;
        state.isErrorOrder = true;
      })

      .addCase(handleConfirmOrder.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.isSuccessConfirmOrder = null;
        state.isErrorOrder = null;
      })
      .addCase(handleConfirmOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = true;
        state.isSuccessConfirmOrder = action.payload;
        state.isErrorOrder = null;
        if (
          state.isSuccessConfirmOrder &&
          state.isSuccessConfirmOrder.success === true
        ) {
          toast.success("Duyệt đơn hàng thành công");
        }
      })
      .addCase(handleConfirmOrder.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.isSuccessConfirmOrder = null;
        state.isErrorOrder = true;
      })

      .addCase(handleDeleteOrder.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.isSuccessDeleteOrder = null;
        state.isErrorOrder = null;
      })
      .addCase(handleDeleteOrder.fulfilled, (state, action) => {
        state.isLoadingOrder = true;
        state.isSuccessDeleteOrder = action.payload;
        state.isErrorOrder = null;
        if (
          state.isSuccessDeleteOrder &&
          state.isSuccessDeleteOrder.success === true
        ) {
          toast.success("Xóa đơn hàng thành công");
        }
      })
      .addCase(handleDeleteOrder.rejected, (state, action) => {
        state.isLoadingOrder = false;
        state.isSuccessDeleteOrder = null;
        state.isErrorOrder = true;
      });
  },
});

export default orderSlice.reducer;
