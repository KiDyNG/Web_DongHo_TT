import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";
import { toast } from "react-toastify";

const URL_API = UrlApi();

const initialState = {
  isLoadingOrder: false,
  isSuccessOrder: null,
  isErrorOrder: null,
  orderWait: [],
  orderShip: [],
  orderComplete: [],
  orderCancel: [],
  handleOrderCancel: null,
  handleOrderConfirm: null,
  orderRate: [],
};

export const addOrderOff = createAsyncThunk(
  "add/order_off",
  async (data_order, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/order_off`, data_order, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const addOrderOnl = createAsyncThunk(
  "add/order_onl",
  async (data_order, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/order_onl`, data_order, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getOrderWait = createAsyncThunk(
  "order/orderWait",
  async (user_id) => {
    try {
      const res = await axios.get(URL_API + `/order_wait/${user_id}`, {
        withCredentials: true,
      });
      return res.data.orders;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const getOrderShip = createAsyncThunk(
  "order/orderShip",
  async (user_id) => {
    try {
      const res = await axios.get(URL_API + `/order_ship/${user_id}`, {
        withCredentials: true,
      });
      return res.data.orders;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const getOrderComplete = createAsyncThunk(
  "order/orderComplete",
  async (user_id) => {
    try {
      const res = await axios.get(URL_API + `/order_complete/${user_id}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const getOrderCancel = createAsyncThunk(
  "order/orderCancel",
  async (user_id) => {
    try {
      const res = await axios.get(URL_API + `/order_cancel/${user_id}`, {
        withCredentials: true,
      });
      return res.data.orders;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const orderCancelAction = createAsyncThunk(
  "order/orderCancelAction",
  async (order_id) => {
    try {
      const res = await axios.put(
        URL_API + `/order_cancel_action/${order_id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const orderConfirmAction = createAsyncThunk(
  "order/orderConfirmAction",
  async (order_id) => {
    try {
      const res = await axios.put(
        URL_API + `/order_confirm_action/${order_id}`,
        {
          withCredentials: true,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const orderSlice = createSlice({
  name: "customer/order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Order Off
      .addCase(addOrderOff.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.isSuccessOrder = null;
        state.isErrorOrder = null;
      })
      .addCase(addOrderOff.fulfilled, (state, action) => {
        state.isSuccessOrder = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
      })
      .addCase(addOrderOff.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.isSuccessOrder = null;
        state.isLoadingOrder = false;
      })
      //Order Onl
      .addCase(addOrderOnl.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.isSuccessOrder = null;
        state.isErrorOrder = null;
      })
      .addCase(addOrderOnl.fulfilled, (state, action) => {
        state.isSuccessOrder = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
      })
      .addCase(addOrderOnl.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.isSuccessOrder = null;
        state.isLoadingOrder = false;
      })
      //Order Wait
      .addCase(getOrderWait.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.orderWait = [];
        state.isErrorOrder = null;
      })
      .addCase(getOrderWait.fulfilled, (state, action) => {
        state.orderWait = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
      })
      .addCase(getOrderWait.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.orderWait = [];
        state.isLoadingOrder = false;
      })
      //Order Ship
      .addCase(getOrderShip.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.orderShip = [];
        state.isErrorOrder = null;
      })
      .addCase(getOrderShip.fulfilled, (state, action) => {
        state.orderShip = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
      })
      .addCase(getOrderShip.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.orderShip = [];
        state.isLoadingOrder = false;
      })
      //Order Complete
      .addCase(getOrderComplete.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.orderRate = [];
        state.orderComplete = [];
        state.isErrorOrder = null;
      })
      .addCase(getOrderComplete.fulfilled, (state, action) => {
        state.orderComplete = action.payload.orders;
        state.orderRate = action.payload.rates;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
      })
      .addCase(getOrderComplete.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.orderRate = [];
        state.orderComplete = [];
        state.isLoadingOrder = false;
      })
      //Order Cancel
      .addCase(getOrderCancel.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.orderCancel = [];
        state.isErrorOrder = null;
      })
      .addCase(getOrderCancel.fulfilled, (state, action) => {
        state.orderCancel = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
      })
      .addCase(getOrderCancel.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.orderCancel = [];
        state.isLoadingOrder = false;
      })

      //Order Cancel Action
      .addCase(orderCancelAction.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.handleOrderCancel = {};
        state.isErrorOrder = null;
      })
      .addCase(orderCancelAction.fulfilled, (state, action) => {
        state.handleOrderCancel = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
        toast.success("Hủy đơn hàng thành thành công");
      })
      .addCase(orderCancelAction.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.handleOrderCancel = null;
        state.isLoadingOrder = false;
      })

      //Order Confirm
      .addCase(orderConfirmAction.pending, (state, action) => {
        state.isLoadingOrder = true;
        state.handleOrderConfirm = {};
        state.isErrorOrder = null;
      })
      .addCase(orderConfirmAction.fulfilled, (state, action) => {
        state.handleOrderConfirm = action.payload;
        state.isLoadingOrder = false;
        state.isErrorOrder = null;
        toast.success("Xác nhận đã nhận hàng thành công");
      })
      .addCase(orderConfirmAction.rejected, (state, action) => {
        state.isErrorOrder = action.payload;
        state.handleOrderConfirm = null;
        state.isLoadingOrder = false;
      });
  },
});

export default orderSlice.reducer;
