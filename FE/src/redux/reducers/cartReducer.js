import {
  ADD_INCREASE_ITEM_DETAIL,
  ADD_ITEM,
  CHANGE_INPUT_ITEM,
  CLEAR_ITEM,
  DECREASE_ITEM,
  INCREASE_ITEM,
  REMOVE_ITEM,
} from "../actions/actionTypes";

const initialState = {
  //Muốn khi load lại không bị mất sản phẩm trong giỏ hàng thì không để cart là mảng trống nữa ("Vì khi load lại sẽ khởi tạo cart = []") mà sẽ lấy ra từ localstorage
  cart: JSON.parse(localStorage.getItem("cart") || "[]"),
};
const saveCartTOStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM:
      //Lấy dữ liệu sản phẩm được truyền vào action thông qua "payload"
      let newItem = action?.payload;
      //Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng hay chưa.
      //B1: truy cập vào mảng cart thông qua state.cart .
      //B2: sử dụng findIndex để kiểm tra xem item?.productId của từng phần tử ở trong mảng cart có bằng với newItem?.productId của sản phẩm mới hay không.
      //item?.productId: Truy cập vào thuộc tính "productId của mỗi phần tử trong mảng state.cart".
      //newItem?.productId: Truy cập vào thuộc tính "productId của sản phẩm mới được thêm vào giỏ hàng".
      //B3: Khi một phần tử trong mảng state.cart được tìm thấy khi item?.productId === newItem?.productId, "findIndex" sẽ trả về chỉ số(index) của phần tử đó trong mảng.
      //B4: Nếu không tìm thấy phần tử nào thỏa mãn, "findIndex" trả về -1.

      let isExits =
        state.cart.findIndex((item) => item?.productId === newItem?.productId) >
        -1;
      //VD:
      //TH1: Khi thêm sản phẩm có productId = 1, sau đó lại thêm tiếp sản phẩm productId = 1, lúc này "findIndex" đã tìm thấy sản phẩm đã tồn tại trong giỏ hàng => trả về vị trí index của sản phẩm đó (ở đây index là 0). Sau đó so sánh với -1 => Lớn hớn và biểu thức là "true" => thục hiện lệnh if
      //Khi là "true" sẽ sử dụng hàm "map" để lặp qua từng phần tử trong mảng và kiểm tra những sản phẩm nào trong mảng có productId === productId sản phẩm mới thêm vào sẽ tăng lên 1.
      if (isExits) {
        let newCart = state.cart.map((item) =>
          item?.productId === newItem?.productId
            ? { ...item, quantity: item?.quantity + 1 } // ...item là giữ nguyên các thành phần khác của item và chỉ cập nhật quantity
            : item
        );
        saveCartTOStorage(newCart);
        return {
          ...state,
          cart: newCart,
        };
      }

      //TH2: Khi thêm sản phẩm có productId khác với productid = 1, lúc này "findIndex" thấy rằng productId của sản phẩm mới chưa tồn tại trong giỏ hàng thì sẽ trả về -1 => so sánh với -1 thì trả về "false" vì -1 không lớn hơn -1.
      //Khi là "false" thì quantity sẽ bằng 1
      else {
        //...state: sử dụng " cú pháp spread" để sảo chép lại toàn bộ đối tượng state. Điều này đảm bảo rằng tất cả các thuộc tính của state (không chỉ cart) được sao chép vào đối tượng mới.
        //[...state.cart]: sẽ sao chép lại những đối tượng cũ trong mảng.
        //{ ...newItem, quantity: 1 }: Thêm một phần tử mới vào mảng cart với thuộc tính quantity được thiết lập thành 1. { ...newItem } sao chép tất cả các thuộc tính của newItem, và ghi đè thuộc tính quantity thành 1.
        //VD: Giả sử state.cart ban đầu là [item1, item2] và newItem là { productId: 'item3', name: 'Item 3' },sau đó, { ...state } sẽ sao chép toàn bộ state ban đầu, và [...state.cart] sẽ sao chép state.cart ban đầu ("Tức là item1, item 2").
        // Cuối cùng, { ...newItem, quantity: 1 } sẽ tạo ra một đối tượng mới { productId: 'item3', name: 'Item 3', quantity: 1 }, và kết hợp với mảng [item1, item2] để tạo thành [item1, item2, { productId: 'item3', name: 'Item 3', quantity: 1 }].
        let newCart = [...state.cart, { ...newItem, quantity: 1 }];
        saveCartTOStorage(newCart);
        return { ...state, cart: newCart };
      }

    case REMOVE_ITEM: {
      let newItem = action?.payload; //Dữ liệu ở đây chính là thông tin sản phẩm khi mình thực hiện action xóa.
      let updateCart = state.cart?.filter(
        (item) => item?.productId !== newItem?.productId
      );
      saveCartTOStorage(updateCart);
      return {
        //Trả về trạng thái mới
        ...state,
        //Cập nhật giỏ hàng (cart) trong trạng thái mới bằng cách lọc ra các sản phẩm mà productId không giống với newItem.productId.
        //Mục đích của filter() là lọc ra các phần tử trong mảng cart mà có productId khác với newItem.productId, tức là loại bỏ sản phẩm có productId giống với newItem.productId.
        //Điều này giúp chúng ta loại bỏ sản phẩm khỏi giỏ hàng khi người dùng thực hiện hành động loại bỏ sản phẩm.
        cart: updateCart,
      };
    }
    case ADD_INCREASE_ITEM_DETAIL: {
      let newItem = action?.payload;
      let isExits = state.cart.findIndex((item) => item?.productId === newItem?.productId) > -1;
      if (isExits) {
        let newCart = state.cart.map((item) =>
          item?.productId === newItem?.productId
            ? { ...item, quantity: item?.quantity + newItem?.quantity } // ...item là giữ nguyên các thành phần khác của item và chỉ cập nhật quantity
            : item
        );
        saveCartTOStorage(newCart);
        return {
          ...state,
          cart: newCart,
        };
      } else {
        let newCart = [
          ...state.cart,
          { ...newItem, quantity: newItem?.quantity },
        ];
        saveCartTOStorage(newCart);
        return { ...state, cart: newCart };
      }
    }
    
    case CHANGE_INPUT_ITEM:{
      let newItemm = action?.payload;
      //tạo biến giỏ hàng mới
      let newCart = state.cart.map((item) =>
        item?.productId === newItemm?.productId
          ? { ...item, quantity: newItemm?.quantity } // ...item là giữ nguyên các thành phần khác của item và chỉ cập nhật quantity
          : item
      );
      //Kiểm tra nếu số lượng của sản phẩm giảm xuống 0, thì loại bỏ nó khỏi giỏ hàng
     // newCart = newCart.filter((item) => item.quantity > 0);
      saveCartTOStorage(newCart); // Lưu giỏ hàng vào localStorage
      return {
        ...state,
        cart: newCart,
      };
    }
    case INCREASE_ITEM:
      let newItemm = action?.payload;
      let newCart = state.cart.map((item) =>
        item?.productId === newItemm?.productId
          ? { ...item, quantity: item?.quantity + 1 } // ...item là giữ nguyên các thành phần khác của item và chỉ cập nhật quantity
          : item
      );
      saveCartTOStorage(newCart); // Lưu giỏ hàng vào localStorage
      return {
        ...state,
        cart: newCart,
      };
    case DECREASE_ITEM: {
      let newItemm = action?.payload;
      let newCart = state.cart.map((item) =>
        item?.productId === newItemm?.productId
          ? { ...item, quantity: item?.quantity - 1 } // ...item là giữ nguyên các thành phần khác của item và chỉ cập nhật quantity
          : item
      );
      //Kiểm tra nếu số lượng của sản phẩm giảm xuống 0, thì loại bỏ nó khỏi giỏ hàng
      newCart = newCart.filter((item) => item.quantity > 0);
      saveCartTOStorage(newCart); // Lưu giỏ hàng vào localStorage
      return {
        ...state,
        cart: newCart,
      };
    }
    case CLEAR_ITEM:{
      let newCart = [];
      saveCartTOStorage(newCart);
      return {
        ...state,
        cart: newCart,
      }
    }
    default:
      return state;
  }
};

export default cartReducer;
