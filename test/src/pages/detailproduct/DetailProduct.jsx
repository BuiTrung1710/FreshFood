import { Link, useParams, useNavigate } from "react-router-dom";
import { StyledDetailProduct } from "./DetailProduct.css";
import Header from "../../components/header/Header";
import {
  Backdrop,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  Grid,
  Rating,
  Stack,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { MdOutlineShoppingCart } from "react-icons/md";
import Footer from "../../components/footer/Footer";
import { useEffect, useState } from "react";
import {
  apiGetDetailProducts,
  apiGetProductCategories,
  apiGetProducts,
} from "../../services/product";
import { formatImg } from "../../utils/imgHelpers";
import { onAddIncreaseItemDetail } from "../../redux/actions/cartActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ProductReview from "../../components/ProductReview/ProductReview";
import { useDispatch, useSelector } from "react-redux";
import { useUser } from "../../providers/user-provider";
import { http } from "../../services/http";
import { formatDatetime } from "../../utils/stringHelpers";

const DetailProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state?.cart?.cart) || [];
  const [detailproducts, setDetailProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  const [products, setProducts] = useState([]);
  const [sortedProduct, setSortedProduct] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [showInfo, setShowInfo] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const toogleInfo = (isInfo) => {
    setShowInfo(isInfo);
  };

 const handleOpenSnackbar = (message, severity) => {
   setSnackbarMessage(message);
   setSnackbarSeverity(severity);
   setOpenSnackbar(true);
 };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const onClickAddProductToCart = () => {
    dispatch(onAddIncreaseItemDetail(detailproducts, quantity));
    handleOpenSnackbar("Thêm sản phẩm vào giỏ hàng thành công!", "success");
  };
  console.log("cartItem:", cartItems);

  const handleIncreaseQuatity = () => {
    if (quantity < detailproducts.stock_quantity) {
      setQuantity(quantity + 1);
    } else {
      // Hiển thị thông báo lỗi cho người dùng
      handleOpenSnackbar("Số lượng vượt quá số lượng tồn kho!", "error");
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  useEffect(() => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      apiGetDetailProducts(id)
        .then((res) => {
          console.log(res?.data?.data);
          const data = res?.data?.data;
          setLoadingBackdrop(false);
          setDetailProducts(data);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 500);
  }, [id]);

  useEffect(() => {
    apiGetProductCategories()
      .then((res) => {
        let newCategories = res?.data?.data || [];
        newCategories = newCategories.filter(
          (category) => category?.categoryId !== 1
        );
        setCategories(newCategories);
      })
      .catch((err) => console.log(err));
  }, []);

  const onClickToProductPage = (categoryId) => {
    navigate(`/product-category/${categoryId}`);
    window.scrollTo({
      top: 0,
    });
  };

  useEffect(() => {
    setTimeout(() => {
      apiGetProducts()
        .then((res) => {
          let data = res?.data;
          const counts = {};
          // Kiểm tra và sử dụng filter để lọc các category có CategoryId khác 1
          data?.metadata?.count
            .filter((category) => category.CategoryId !== 1)
            .forEach((category) => {
              counts[category.CategoryId] = category.count;
            });
          setCategoryCounts(counts);
          console.log(categoryCounts);
          setProducts(data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);

  //Thực hiện sắp xếp và lấy ra 8 sản phẩm có ngày tạo  mới nhất.
  useEffect(() => {
    if (Array.isArray(products)) {
      const sortedProducts = products.sort((a, b) => {
        return new Date(b.createDate) - new Date(a.createDate);
      });
      const topProducts = sortedProducts.slice(0, 8);
      setSortedProduct(sortedProducts);
      setTopProducts(topProducts);
    }
    console.log(topProducts);
  }, [products]);

  // Chuyển đổi product.productPrice thành kiểu số
  const price = parseFloat(detailproducts.productPrice);

  // Định dạng giá tiền
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  const onClickNextToDetailProduct = (productId) => {
    navigate(`/detail-product/${productId}`);
    window.scrollTo({
      top: 0,
    });
  };

  const handleBuyNow = () => {
    handleOpenDialog();
  };

 const proceedToCheckout = () => {
   // Bật trạng thái loading ngay khi bắt đầu hàm
   setLoadingButton(true);

   // Kiểm tra nếu user chưa đăng nhập
   if (!user) {
     // Hiện thông báo yêu cầu đăng nhập
     setTimeout(() => {
       handleOpenSnackbar("Bạn cần đăng nhập để thực hiện mua hàng", "warning");
       setLoadingButton(false); // Tắt loading ngay lập tức
       setLoadingBackdrop(true); //LoadingBackdrop
     }, 1000); // Cho phép hiển thị loading trong 0.2 giây
     setTimeout(() => {
       // Sau khi hiển thị thông báo, chuyển hướng đến trang đăng nhập
       navigate("/FormLogin");
       setLoadingBackdrop(false); // Tắt loading backdrop
     }, 2000); // Chờ 0.7 giây sau khi hiển thị thông báo
     return; // Ngăn không cho hàm thực thi tiếp
   }
   // Nếu đã đăng nhập, tiến hành tạo phiên thanh toán
   createStripeSession();
 };

 const createStripeSession = () => {
   http
     .post("/stripe/create-checkout-session", {
       cartItems: [
         {
           productName: detailproducts.productName,
           productId: detailproducts.productId,
           productPrice: detailproducts.productPrice,
           quantity,
         },
       ],
       accountId: user?.accountId,
     })
     .then((res) => {
       console.log("data", res.data);
       if (res.data.url) {
         window.location.href = res.data.url;
       }
     })
     .catch((err) => {
       console.error("Error during checkout:", err);
       // Hiển thị thông báo lỗi cho người dùng nếu cần
     });
 };


  return (
    <StyledDetailProduct>
      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>

      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack direction="column" className="trang_detail">
        <Header bgColor="rgba(54,46,41,1)" />
        <Container
          className="container_productdetail"
          style={{ maxWidth: 1300 }}
        >
          {/*BreadCrumbs */}
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link
              underline="hover"
              color="inherit"
              to="/"
              className="link_breadcrums"
            >
              TRANG CHỦ
            </Link>
            <Typography color="text.primary">
              {detailproducts.productName}
            </Typography>
          </Breadcrumbs>
          <Stack direction="row">
            <Stack direction="column" className="img_productdetail">
              <img src={formatImg(detailproducts?.productImage)} />
            </Stack>
            <Stack direction="column" className="info_productdetail">
              <h3 className="name_productdetail">
                {detailproducts?.productName}
              </h3>
              <Typography className="description_productdetail">
                {detailproducts.productInfo}
              </Typography>
              <Rating
                value={detailproducts?.ratingStar || 0}
                precision={0.25}
                readOnly
                style={{ marginTop: 20 }}
              />
              <h2 className="price_productdetail">{formattedPrice}</h2>
              <div>
                <span className="title_expDate">Ngày hết hạn:</span>
              <Typography>
                {formatDatetime(detailproducts.exp_date)}
                </Typography>
              </div>
              

              <div className="block_quantity">
                <label className="label_quantity">Số lượng:</label> <br />
                <button onClick={handleDecreaseQuantity} className="">
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button
                  onClick={handleIncreaseQuatity}
                  className="increase_quantity"
                >
                  +
                </button>
              </div>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={handleBuyNow}
                  className="buy_now"
                  disabled={loadingButton}
                  startIcon={
                    loadingButton ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : null
                  }
                >
                  {loadingButton ? "Processing..." : "Buy now"}
                </Button>
                <Button
                  onClick={onClickAddProductToCart}
                  className="add_yourcart"
                >
                  <span>
                    <MdOutlineShoppingCart className="icon_cart" />
                  </span>
                  Thêm vào giỏ hàng
                </Button>
              </Stack>
            </Stack>
            <Stack direction="column" width={"40%"}>
              {/*Category */}
              <Stack
                direction="column"
                spacing={2}
                className="sidebar-content2"
              >
                <div className="list-product">
                  <h3 className="label-list--product">LOẠI SẢN PHẨM</h3>
                </div>
                {categories.map((category, i) => (
                  <div
                    className={`list-product-child ${
                      `${category.categoryId}` ===
                      `${detailproducts.categoryId}`
                        ? "selected"
                        : ""
                    } `}
                    key={i}
                    onClick={() => onClickToProductPage(category?.categoryId)}
                  >
                    <Link
                      to={`/product-category/${category.categoryId}`}
                      className={`text-sidebar2 ${
                        `${category.categoryId}` ===
                        `${detailproducts.categoryId}`
                          ? "selected"
                          : ""
                      }`}
                    >
                      {category.categoryName}
                      {category.categoryId !== 1 && (
                        <span>({categoryCounts[category.categoryId]})</span>
                      )}
                    </Link>
                  </div>
                ))}
              </Stack>
              {/*Sản phẩm mới */}
            </Stack>
          </Stack>
          <Grid container>
            <Grid item xs={8} className="info_danhgia">
              <Breadcrumbs aria-label="breadcrumb" className="breadcrum_detail">
                <Link
                  style={{ textDecoration: "none" }}
                  className={showInfo ? "link_active" : "link_inactive"}
                  onClick={() => toogleInfo(true)}
                >
                  THÔNG TIN SẢN PHẨM
                </Link>

                <Link
                  style={{ textDecoration: "none" }}
                  className={!showInfo ? "link_active" : "link_inactive"}
                  onClick={() => toogleInfo(false)}
                >
                  ĐÁNH GIÁ
                </Link>
              </Breadcrumbs>
              {showInfo ? (
                <div>
                  <Typography className="description_productdetail css_description_productdetail">
                    {detailproducts.productInfo}
                  </Typography>
                </div>
              ) : null}
              {!showInfo ? (
                <div>
                  <ProductReview productId={detailproducts?.productId} />
                </div>
              ) : null}
            </Grid>
            <Grid item xs={4}>
              <Stack direction="column" className="block_newProducts">
                <TableContainer>
                  <Table>
                    <TableBody>
                      {topProducts?.map((productTop, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <img
                              src={formatImg(productTop?.productImage)}
                              className="img_product"
                              onClick={() =>
                                onClickNextToDetailProduct(
                                  productTop?.productId
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Stack direction="column">
                              <Typography
                                className="productName-productTop"
                                onClick={() =>
                                  onClickNextToDetailProduct(
                                    productTop?.productId
                                  )
                                }
                              >
                                {productTop?.productName}
                              </Typography>
                              <Typography
                                style={{ color: "red", fontWeight: 600 }}
                              >
                                {productTop &&
                                parseFloat(productTop.productPrice)
                                  ? new Intl.NumberFormat("en-US", {
                                      style: "currency",
                                      currency: "USD",
                                    }).format(
                                      parseFloat(productTop.productPrice)
                                    )
                                  : 0}
                              </Typography>
                              
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Stack>
            </Grid>
          </Grid>

          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Xác nhận thanh toán"}
            </DialogTitle>
            <DialogContent>
              Bạn có chắc chắn muốn thanh toán những sản phẩm này không?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
              <Button
                onClick={() => {
                  handleCloseDialog();
                  proceedToCheckout(); // Thực hiện chức năng thanh toán sau khi xác nhận
                }}
                autoFocus
              >
                Xác nhận
              </Button>
            </DialogActions>
          </Dialog>
        </Container>
        <Footer />
      </Stack>
    </StyledDetailProduct>
  );
};

export default DetailProduct;
