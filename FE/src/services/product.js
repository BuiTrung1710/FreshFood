import axios from "axios";
import { http } from "./http";
import { API_DOMAIN } from "../constants/schema";

//Lấy ra danh sách sản phẩm
const apiGetProducts = (
  page = 1,
  limit = 10,
  search = "",
  categoryId = null,
  sortedProduct =""
) => {
  return http.get(`products`, { params: { page, limit, search, categoryId, sortedProduct } });
};

//Lấy ra danh mục sản phẩm
const apiGetProductCategories = () => {
  return http.get(`product-categories`);
};

//Lấy ra chi tiết sản phẩm
const apiGetDetailProducts = (id) => {
  return http.get(`products/${id}`);
};

//Create products
const apiCreateProduct = (data) => {
  return http.post(`products`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
//Update products
const apiUpdateProduct = (id, data) => {
  return http.put(`products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

//Xoá products
const apiDeleteProduct = (id) => {
  return http.delete(`products/${id}`);
};

//Đánh giá products
const productReview = (rating, productId, recommend) => {
  return http.post(`product-review`, { rating, productId, recommend });
};

//Lấy ra đánh giá người dùng
const productReviewById = (productId) => {
  return axios.get(`${API_DOMAIN}/product-review/review/${productId}`);
};


export {
  apiGetProducts,
  apiGetProductCategories,
  apiGetDetailProducts,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  productReview,
  productReviewById,
};
