import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import {
  Container,
  Stack,
  Breadcrumbs,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Grid,
  Button,
  Snackbar,
  Backdrop,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { MdArrowBack } from "react-icons/md";
import MuiAlert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useDispatch, useSelector } from "react-redux";
import {
  onChangeInputItem,
  onClearItem,
  onDecreaseItem,
  onIncreaseItem,
  onRemoveItem,
} from "../../redux/actions/cartActions";
import { formatImg } from "../../utils/imgHelpers";
import { useEffect, useState } from "react";
import EmptyCart from "../../assets/imgs/empty-cart.jpg";
import PayButton from "./PayButton";

const Cart = () => {
  const cart = useSelector((state) => state?.cart?.cart) || [];
  const [quantities, setQuantities] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [statusType, setStatusType] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //UseEffect theo dõi cart để lấy ra quantity và cập nhật mảng quantity
  useEffect(() => {
    // Lấy mảng các quantity từ mảng cart và cập nhật vào state của quantities
    const quantitiesArray = cart.map((item) => item.quantity);
    setQuantities(quantitiesArray);
  }, [cart]); // Theo dõi sự thay đổi của cart

  console.log("cart:",cart);
  //Hàm mở snackbar:
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };
  //Hàm đóng snackbar:
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  //Action tăng số lượng sản phẩm
  const onClickIncreaseItem = (product) => {
    setLoadingTable(true);
    setTimeout(() => {
      // dispatch(onIncreaseItem(product)); // Gửi action
      // setStatusType("update");
      // handleSnackBarOpen();
      if (product.quantity >= product.stock_quantity) {
        // Hiển thị thông báo lỗi cho người dùng
        alert("Số lượng sản phẩm đã đạt tối đa!");
        setLoadingTable(false);
      } else {
        dispatch(onIncreaseItem(product)); // Gửi action
        setStatusType("update");
        handleSnackBarOpen();
      }
    }, 1000);
  };
  //Action giảm số lượng sản phẩm
  const onClickDecreaseItem = (product) => {
    setLoadingTable(true);
    setTimeout(() => {
      dispatch(onDecreaseItem(product));
      setStatusType("update");
      handleSnackBarOpen();
    }, 1000);
  };
  //Action xóa sản phẩm
  const onClickDeleteItem = (product) => {
    setLoadingTable(true);
    setTimeout(() => {
      dispatch(onRemoveItem(product));
      setStatusType("delete");
      handleSnackBarOpen();
    }, 1000);
  };
  //Action xóa toàn bộ sản phẩm
  const onClickClearCart = () => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      dispatch(onClearItem());
      setLoadingBackdrop(false);
    }, 200);
  };

  //UseEffect theo dõi thay đổi cart khi kết thúc action để đóng loading
  useEffect(() => {
    // Đặt loading thành false khi action hoàn thành
    setLoadingTable(false);
  }, [cart]); // Theo dõi sự thay đổi của cart để trigger useEffect

  //Hàm xử lý onchange input
  const handleQuantityChange = (event, index, product) => {
    const value = event?.target?.value;
    const newQuantities = [...quantities];
    // Kiểm tra nếu giá trị của input là chuỗi rỗng, thì cập nhật thành 0
    if (value === "") {
      newQuantities[index] = "";
    } else if (parseInt(value) === 0) {
      setLoadingTable(true);
      setTimeout(() => {
        dispatch(onRemoveItem(product));
        setStatusType("delete");
        handleSnackBarOpen();
      }, 1000);
    }
    else if (parseInt(value) > product.stock_quantity){
     // Hiển thị thông báo lỗi cho người dùng
     alert("Số lượng nhập vào vượt quá số lượng tồn kho!");
     return; // Không cập nhật giá trị số lượng
    } else {
      newQuantities[index] = parseInt(value);
    }
    setQuantities(newQuantities);
  };

  //Hàm xử lý sự kiện không focus vào input
  const handleInputBlur = (index, product) => {
    //gán value = giá trị quantity hiện tại đang focus
    const value = quantities[index];
    console.log("value:", value)
    const newQuantities = [...quantities];
    // Kiểm tra nếu giá trị của input là chuỗi rỗng, thì gửi action để xóa sản phẩm khỏi giỏ hàng
    if (value === "") {
      setLoadingTable(true);
      setTimeout(() => {
        dispatch(onRemoveItem(product));
        setStatusType("delete");
        handleSnackBarOpen();
      }, 1000);
    }
    else {
      setLoadingTable(true);
      setTimeout(() => {
        dispatch(onChangeInputItem(product, newQuantities[index]));
        setStatusType("update");
        handleSnackBarOpen();
      }, 1000);
    }
  };

  //Hàm tính giá tiền từng sản phẩm
  const calculateSubtotal = (quantity, price) => {
    return quantity * parseFloat(price);
  };

  //Hàm tính tổng tiền tất cả sản phẩm
  const calculateSumPrice = () => {
    let sumPrice = 0;
    cart.forEach((product) => {
      sumPrice += product?.quantity * parseFloat(product.productPrice);
    });
    // Định dạng tổng giá trị về dạng tiền tệ
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(sumPrice);
  };

  //Hàm chuyển về đầu trang sản phẩm:
  const onClickPrevToProduct = () => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      navigate("/product");
      window.scrollTo({
        top: 0,
      });
    }, 400);
  };

  const breadcrumbs = [
    <Link
      style={{
        textDecoration: "none",
        fontFamily: "Dancing script",
        fontSize: 35,
        color: "#000000",
        fontWeight: 600,
      }}
      key="3"
    >
      <span className="style_number_breadcrums1">1</span>
      Shopping Cart
    </Link>,
    <Link
      style={{
        textDecoration: "none",
        color: "#ccc",
        fontFamily: "Dancing script",
        fontSize: 35,
      }}
      className="Link_checkout"
      to="/check-out"
      key="1"
    >
      <span className="style_number_breadcrums2">2</span>
      Checkout Detail
    </Link>,
    <Link
      style={{
        textDecoration: "none",
        fontFamily: "Dancing script",
        fontSize: 35,
        cursor: "default",
        color: "#ccc",
      }}
      to="#"
      key="2"
    >
      <span className="style_number_breadcrums3">3</span>
      Order Complete
    </Link>,
  ];
  return (
    <StyledCart>
      <Stack direction="column" className="cart">
        {/*Alert */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000} // Thời gian tự động đóng sau 3 giây (hoặc bạn có thể điều chỉnh theo mong muốn)
          onClose={handleSnackBarClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MuiAlert
            elevation={6}
            variant="filled"
            onClose={handleSnackBarClose}
            severity={statusType && "success"}
          >
            {statusType === "update"
              ? "Cập nhật giỏ hàng thành công!"
              : "Sản phẩm đã xóa khỏi giỏ hàng!"}
          </MuiAlert>
        </Snackbar>

        {/* Loading */}
        <Backdrop
          open={loadingBackdrop}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Header />
        {/*Breadcrums */}
        <Container
          style={{
            maxWidth: 1300,
            marginTop: 50,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Stack spacing={2}>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              {breadcrumbs}
            </Breadcrumbs>
          </Stack>
        </Container>

        {/*Cart */}
        {cart.length === 0 ? (
          <div className="empty-cart">
            <img src={EmptyCart} alt="Empty Cart" className="img_emptyCart" />
            <Button className="btn_prevShop" onClick={onClickPrevToProduct}>
              Quay lại cửa hàng
            </Button>
          </div>
        ) : (
          <Container
            style={{ maxWidth: 1300, marginTop: 30 }}
            className="container_cart"
          >
            <Stack direction="row" style={{ gap: 30, marginBottom: 200 }}>
              {/*danh sách sản phẩm */}
              <Stack>
                <TableContainer
                  className={`table_data--cart ${
                    loadingTable === true && "opacity_table--data---cart"
                  }`}
                >
                  {/* CircularProgress */}
                  {loadingTable && (
                    <CircularProgress className="loading-spinner" />
                  )}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="title_info--cart">
                          Sản phẩm
                        </TableCell>
                        <TableCell className="title_info--cart">Giá</TableCell>
                        <TableCell className="title_info--cart">
                          Số lượng
                        </TableCell>
                        <TableCell className="title_info--cart">
                          Tạm tính
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart?.map((product, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Stack
                              direction="row"
                              spacing={2}
                              alignItems="center"
                            >
                              <IconButton
                                onClick={() => onClickDeleteItem(product)}
                                className="icon_delete_item"
                              >
                                x
                              </IconButton>
                              <img
                                src={formatImg(product?.productImage)}
                                className="img_product"
                              />
                              <Typography>{product?.productName}</Typography>
                            </Stack>
                          </TableCell>
                          <TableCell>
                          {product &&
                            parseFloat(                                                       
                                product?.productPrice   
                            )
                              ? new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(
                                  parseFloat(                                 
                                      product?.productPrice                                    
                                  )
                                )
                              : "0"} 
                          </TableCell>
                          <TableCell>
                            <Stack direction="row">
                              <button
                                className="decrease_item"
                                onClick={() => onClickDecreaseItem(product)}
                              >
                                -
                              </button>
                              {/*sử dụng hàm onBlur để thực hiện khi input không được focus */}
                              <input
                                type="number"
                                min="0"
                                value={quantities[index]}
                                className="input_quantity"
                                onChange={(event) =>
                                  handleQuantityChange(event, index, product)
                                }
                                onBlur={() => handleInputBlur(index, product)}
                              />
                              <button
                                className="increase_item"
                                onClick={() => onClickIncreaseItem(product)}
                              >
                                +
                              </button>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            {product &&
                            parseFloat(
                              calculateSubtotal(
                                product?.quantity,
                                product?.productPrice
                              )
                            )
                              ? new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(
                                  parseFloat(
                                    calculateSubtotal(
                                      product?.quantity,
                                      product?.productPrice
                                    )
                                  )
                                )
                              : "0.0$"}
                          </TableCell>
                        </TableRow>
                      ))}
                      <Stack direction="row">
                        <Button
                          className="continue_viewProduct"
                          onClick={onClickPrevToProduct}
                        >
                          <span>
                            <MdArrowBack />
                          </span>
                          Tiếp tục xem sản phẩm
                        </Button>
                        <Button
                          className="clear_cart"
                          onClick={onClickClearCart}
                        >
                          Xóa toàn bộ sản phẩm
                        </Button>
                      </Stack>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>

              {/*Gía tiền */}
              <Stack style={{ borderLeft: "1px solid #ccc", width: "40%" }}>
                <TableContainer
                  style={{ marginLeft: 13 }}
                  className={`table_data--cart ${
                    loadingTable === true && "opacity_table--data---cart"
                  }`}
                >
                  {/* CircularProgress */}
                  {loadingTable && (
                    <CircularProgress className="loading-spinner" />
                  )}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell className="title_info--sumPrice">
                          Cộng giỏ hàng
                        </TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      <TableRow>
                        <TableCell>
                          <Grid container>
                            <Grid item xs={6} className="title_info--sum">
                              Tạm tính
                            </Grid>
                            <Grid item xs={6} textAlign="end">
                              {calculateSumPrice()}
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <Grid container>
                            <Grid item xs={6} className="title_info--sum">
                              Tổng
                            </Grid>
                            <Grid item xs={6} textAlign="end">
                              {calculateSumPrice()}
                            </Grid>
                          </Grid>
                        </TableCell>
                      </TableRow>
                      {/* <Button className="btn_nextTo_checkout" onClick={onClickNextToCheckOut}>
                        Tiến hành thanh toán
                      </Button> */}
                      <PayButton cartItems={cart} />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </Stack>
          </Container>
        )}

        <Footer />
      </Stack>
    </StyledCart>
  );
};
const StyledCart = styled.div`
  height: 100vh;
  .cart {
    height: 100%;
  }
  .style_number_breadcrums1 {
    display: inline-block;
    border-radius: 99px;
    width: 1.5em;
    font-size: 0.7em;
    text-align: center;
    color: #fff;
    height: 1.5em;
    line-height: 1.5em;
    margin: 0 0.5em;
    background-color: rgb(99, 175, 49);
  }
  .style_number_breadcrums2,
  .style_number_breadcrums3 {
    display: inline-block;
    border-radius: 99px;
    width: 1.5em;
    font-size: 0.7em;
    text-align: center;
    color: #fff;
    height: 1.5em;
    line-height: 1.5em;
    margin: 0 0.5em;
    background-color: #ccc;
  }
  .Link_checkout:hover {
    color: #000000 !important;
    font-weight: 600;
  }
  .container_cart {
    margin-bottom: auto;
    width: 100vw;
  }
  .title_info--cart {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
  }
  .title_info--sumPrice {
    font-size: 16px;
    font-weight: 600;
  }
  .title_info--sum {
    font-weight: 600;
  }
  .img_product {
    width: 48px;
    height: 48px;
  }
  .icon_delete_item {
    border-radius: 99px;
    background-color: #e8e8e8;
    width: 1.2em;
    height: 1.2em;
  }
  .input_quantity {
    width: 60px;
    text-align: center;
  }
  .btn_update--cart {
    background-color: green;
    color: #fff;
  }
  .btn_update--cart:hover {
    background-color: #0bd40b;
  }
  .table_data--cart {
    position: relative;
  }
  .loading-spinner {
    position: absolute; /* Đặt vị trí tuyệt đối cho CircularProgress */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #ffb416;
  }
  .opacity_table--data---cart {
    opacity: 0.5;
  }
  .continue_viewProduct {
    margin-top: 25px;
    background-color: #fff;
    border: 2px solid #3ba66b;
    border-radius: 0%;
    color: #19874b;
    width: 220px;
    padding: 7px;
    height: 40px;
  }
  .continue_viewProduct:hover {
    background-color: #ffb416;
    color: #fff;
  }

  .empty-cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    margin-bottom: auto;
  }
  .img_emptyCart {
    width: 250px;
    height: 200px;
  }
  .btn_prevShop {
    border-radius: 0%;
    background-color: #dc8068;
    color: #fff;
    width: 250px;
    margin: 20px 0 50px 0;
  }
  .btn_prevShop:hover {
    background-color: #b4462a;
  }
  .clear_cart {
    margin-top: 25px;
    margin-left: 10px;
    background-color: #fff;
    border: 2px solid #a6643b;
    border-radius: 0%;
    color: #873c19;
    width: 220px;
    height: 40px;
    padding: 7px;
  }
  .clear_cart:hover {
    background-color: #ff3d16;
    color: #fff;
  }
`;
export default Cart;
