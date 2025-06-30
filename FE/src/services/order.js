import { http } from "./http";


//Lấy ra thông tin đơn hàng
const apiGetOrders = (page = 1, limit = 10, search = "", accountId = null) =>{
    return http.get(`/orders`, { params: { page, limit, search, accountId} });
}
//Xoá đơn hàng
const apiDeleteOrder = (id) => {
  return http.delete(`orders/${id}`);
};
//Cập nhật đơn hàng
const apiUpdateOrder = (id, data) => {
  return http.put(`orders/${id}`, data);
};
//Lấy ra chi tiết sản phẩm
const apiGetOrderDetail = (id) => {
  return http.get(`orders/${id}`);
};


export {apiGetOrders, apiDeleteOrder,apiUpdateOrder,apiGetOrderDetail};