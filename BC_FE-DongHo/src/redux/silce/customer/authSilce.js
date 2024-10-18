import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UrlApi } from "../../../url";

const URL_API = UrlApi();

const initialState = {
  isLoadingRegister: false,
  isErrorRegister: null,
  isSuccessRegister: null,
  isLoadingLogin: false,
  isSuccessLogin: null,
  isErrorLogin: null,
  dataUser: null,
  isAuthSucess: null,
  isAuthError: null,
  isSuccessLogout: null,
};

export const register = createAsyncThunk(
  "auth/regiserUser",
  async (data_user, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/register`, data_user);
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/loginUser",
  async (data_user, { rejectWithValue }) => {
    try {
      const res = await axios.post(URL_API + `/login`, data_user, {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const authLogin = createAsyncThunk("auth/authLogin", async () => {
  try {
    const res = await axios.get(URL_API + `/authentication`, {
      withCredentials: true,
    });
    return await res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const authLoginToken = createAsyncThunk(
  "auth/authLoginToken",
  async () => {
    try {
      const res = await axios.get(URL_API + `/authentication`, {
        withCredentials: true,
      });
      return await res.data;
    } catch (error) {
      console.log(error);
      return error.response.data;
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const res = await axios.get(URL_API + `/logout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
});

export const authSilce = createSlice({
  name: "customer/auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.isLoadingRegister = true;
        state.isSuccessRegister = null;
        state.isErrorRegister = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccessRegister = action.payload;
        state.isLoadingRegister = false;
        state.isErrorRegister = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isErrorRegister = action.payload;
        state.isLoadingRegister = false;
        state.isSuccessRegister = null;
      })

      .addCase(login.pending, (state, action) => {
        state.isLoadingLogin = true;
        state.isSuccessLogin = null;
        state.isErrorLogin = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccessLogin = action.payload;
        state.isLoadingLogin = false;
        state.isErrorLogin = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isErrorLogin = action.payload;
        state.isLoadingLogin = false;
        state.isSuccessLogin = null;
      })
      // Auth
      .addCase(authLogin.fulfilled, (state, action) => {
        if (action.payload.detail) {
          state.isAuthError = action.payload;
          state.isAuthSucess = null;
        } else {
          state.isAuthSucess = action.payload;
          state.dataUser = action.payload.user;
          state.isAuthError = null;
        }
      })
      // Auth Token
      .addCase(authLoginToken.fulfilled, (state, action) => {
        if (action.payload.detail) {
          state.isAuthError = action.payload;
          state.isAuthSucess = null;
        } else {
          state.isAuthSucess = action.payload;
          state.dataUser = action.payload.user;
          state.isAuthError = null;
        }
      })

      .addCase(logout.fulfilled, (state, action) => {
        state.isSuccessLogout = action.payload;
        state.isAuthSucess = null;
        state.isSuccessLogin = null;
        state.dataUser = null;
      });
  },
});

export default authSilce.reducer;
