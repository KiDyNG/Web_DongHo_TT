import { configureStore, combineReducers } from "@reduxjs/toolkit";
import productReducer from "./silce/customer/productSilce";
import authReducer from "./silce/customer/authSilce";
import cartReducer from "./silce/customer/cartSlice";
import orderReducer from "./silce/customer/orderSlice";
import categoryReducer from "./silce/customer/categorySlice";
import rateReducer from "./silce/customer/rateSlice";
import orderAdminReducer from "./silce/admin/orderSlice";
import productAdminReducer from "./silce/admin/productSlice";
import authAdminReducer from "./silce/admin/authSlice";

const rootReducer = combineReducers({
  customer: combineReducers({
    product: productReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    category: categoryReducer,
    rate: rateReducer,
  }),
  admin: combineReducers({
    order: orderAdminReducer,
    product: productAdminReducer,
    auth: authAdminReducer,
  }),
});

export const store = configureStore({
  reducer: rootReducer,
});
