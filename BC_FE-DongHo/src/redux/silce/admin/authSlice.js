import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";

const URL_API = UrlApi();

const initialState = {
  isLoadingLogin: false,
  isSuccessLogin: null,
  isErrorLogin: null,
  dataAdmin: null,
  isAuth: null,
  isLogout: null,
};

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (data, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/admin/login`, data, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authLoginAdmin = createAsyncThunk(
  "auth/authLoginAdmin",
  async () => {
    try {
      const res = await axios.get(URL_API + `/admin/authentication`, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  try {
    const res = await axios.get(URL_API + `/admin/logout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const authSilce = createSlice({
  name: "admin/auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state, action) => {
        state.isLoadingLogin = true;
        state.isSuccessLogin = null;
        state.isErrorLogin = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isSuccessLogin = action.payload;
        state.isLoadingLogin = false;
        state.isErrorLogin = null;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isErrorLogin = action.payload;
        state.isLoadingLogin = false;
        state.isSuccessLogin = null;
      })

      .addCase(authLoginAdmin.fulfilled, (state, action) => {
        if (action.payload.detail) {
          state.isAuth = action.payload;
        } else {
          state.isAuth = action.payload;
          state.dataAdmin = action.payload.user;
        }
      })

      .addCase(logoutAdmin.fulfilled, (state, action) => {
        state.isLogout = action.payload;
        state.isAuth = null;
        state.isSuccessLogin = null;
        state.dataAdmin = null;
      });
  },
});

export default authSilce.reducer;
