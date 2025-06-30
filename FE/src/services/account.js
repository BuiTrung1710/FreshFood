import axios from "axios";
import { API_DOMAIN } from "../constants/schema";
import { http } from "./http";


//Lấy toàn bộ danh sách accounts
const getAllAccounts = (page = 1, limit = 10, search = "") => {
  return axios(
    `${API_DOMAIN}/accounts?page=${page}&limit=${limit}&search=${search}`
  );
};
//Xóa accounts
const deleteAccount = (id) => {
    return axios.delete(`${API_DOMAIN}/accounts/${id}`);
};
//Thêm mới accounts
const createAccount = (data) => {
    return http
      .post(`${API_DOMAIN}/accounts`, data)
}
//Sửa accounts
const editAccount = (id,data) =>{
    return axios
      .put(`${API_DOMAIN}/accounts/${id}`,data)
}
//Login

const login = (data) => {
  return http.post(`/accounts/auth`, data);
};

//Signup
const signup = (data) => {
  return axios.post(`${API_DOMAIN}/accounts`, data);
};
//lấy ra profile người dùng:
const getProfile = () => {
  return http.get(`${API_DOMAIN}/accounts/profile`);
};
//logout:
const logout = () => {
  return http.post(`/accounts/logout`);
};
export{getAllAccounts,deleteAccount,createAccount,editAccount,signup,login,getProfile,logout}

