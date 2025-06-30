import { ADD_INCREASE_ITEM_DETAIL, ADD_ITEM, CHANGE_INPUT_ITEM, CLEAR_ITEM, DECREASE_ITEM, INCREASE_ITEM, REMOVE_ITEM } from "./actionTypes";

//Hành động thêm sản phẩm vào giỏ hàng
export const onAddItem = (data) => {
  return { type: ADD_ITEM, payload: data };
};
//Hành động tăng số lượng sản phẩm ở detailproduct.
export const onAddIncreaseItemDetail = (data, quantity) => {
  return { type: ADD_INCREASE_ITEM_DETAIL, payload: { ...data, quantity } };
};
//Hành động cập nhật lại giỏ hàng
export const onChangeInputItem = (data, quantity) => {
  return {type: CHANGE_INPUT_ITEM, payload:{...data, quantity}};
}

//Hành động xóa sản phẩm khỏi giỏ hàng
export const onRemoveItem = (data) => {
  return { type: REMOVE_ITEM, payload: data };
};

//Hành động tăng số lượng sản phẩm
export const onIncreaseItem = (data) =>{
  return {type: INCREASE_ITEM, payload: data};
}
//Hành động giảm số lượng sản phẩm
export const onDecreaseItem = (data) =>{
  return {type: DECREASE_ITEM, payload: data};
}
//Hành động xáo toàn bộ sản phẩm trong giỏ hàng.
export const onClearItem = () =>{
  return {type: CLEAR_ITEM};
}
