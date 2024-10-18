import axios from "axios";
import { UrlApi } from "../url";

const URL_API = UrlApi();

const getProductCategory = async (category_id, page) => {
  return await axios.get(URL_API + `/categories/${category_id}?page=${page}`);
};

const getProductSearch = async (name, page) => {
  return await axios.get(URL_API + `/search?name=${name}&page=${page}`);
};

const getOrderAdmin = async (page) => {
  return await axios.get(URL_API + `/admin/dashboard?page=${page}`, {
    withCredentials: true,
  });
};

const getOrder = async (page) => {
  return await axios.get(URL_API + `/admin/orders?page=${page}`, {
    withCredentials: true,
  });
};

const getProductAdmin = async (page) => {
  return await axios.get(URL_API + `/admin/products?page=${page}`, {
    withCredentials: true,
  });
};

export {
  getProductCategory,
  getProductSearch,
  getOrderAdmin,
  getOrder,
  getProductAdmin,
};
