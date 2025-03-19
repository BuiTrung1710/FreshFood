import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Pagination,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import Search from "../../../components/search/Search";
import { formatImg } from "../../../utils/imgHelpers";
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import ProductForm from "./ProductForm";
import { apiDeleteProduct, apiGetProducts } from "../../../services/product";
import { useNavigate, useSearchParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AppButton } from "../../../components/AppButton/AppButton";
import { formatDatetime } from "../../../utils/stringHelpers";
import { useSearch } from "../../../hooks/useSearch";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  //State tìm kiếm
  const [searchParams] = useSearchParams();
  const [metaData, setMetaData] = useState({
    page: searchParams.get("page") || 1,
    limit: 9,
    search: searchParams.get("search") || "",
  });
  const keySearch = useSearch(metaData.search, 500);
  const [total, setTotal] = useState(0);
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [actionType, setActionType] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();
  const [reloadProducts, setReloadProducts] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [deleteConfirmationDialog, setDeleteConfirmationDialog] = useState({
    open: false,
    title: "",
    content: "",
    onConfirm: () => {},
    onCancel: () => {},
  });
  //Mở Snackbar
  const handleSnackbarOpen = () => {
    setSnackbarOpen(true);
  };
  //Đóng Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  //Call api gọi ra danh sách sản phẩm
  useEffect(() => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      apiGetProducts(metaData.page, metaData.limit, metaData.search)
        .then((res) => {
          let data = res?.data;
          setProducts(data?.data);
          setTotal(data?.metadata?.total || 0);
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 700);
  }, [metaData.page, metaData.limit, keySearch, reloadProducts]);

  //Hàm xử lý pagination
  const onChangePagination = (value) => {
    setMetaData({ ...metaData, page: value });
  };
  //Hàm reload lại product mỗi khi sửa hoặc xóa hoặc thêm mới sản phẩm
  const refreshProducts = () => {
    setReloadProducts(!reloadProducts);
  };
  //Hàm xử lý khi click vào nút thêm mới
  const onClickCreate = () => {
    setShowPopup(true);
    setPopupMode("create");
    setActionType("Create");
  };

  //Hàm xử lý khi click vào nút edit
  const onClickEdit = (product) => {
    // set trạng thái cửa sổ edit bật lên bằng true
    setShowPopup(true);
    setPopupMode("edit");
    setSelectedProduct(product);
    setActionType("Edit");
    //console.log(selectedProduct);
  };

  //Hàm đóng cửa sổ edit
  const onClosePopup = () => {
    setShowPopup(false);
  };
  //Hàm xử lý xóa product
  const onClickDelete = (product) => {
    // Hàm để xử lý chức năng xóa (call api)
    const handleDelete = () => {
      setLoadingBackdrop(true);
      setTimeout(() => {
        apiDeleteProduct(product?.productId)
          .then((res) => {
            setLoadingBackdrop(false);
            refreshProducts();
            setActionType("Delete");
            // Mở Snackbar khi xóa thành công
            handleSnackbarOpen();
          })
          .catch((err) => {
            console.log(err);
            setLoadingBackdrop(false);
          });
      }, 700);
    };
    // set trạng thái khi click vào icon xóa sẽ hiện dialog hỏi muốn xóa sản phẩm không?
    setDeleteConfirmationDialog({
      open: true,
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa sản phẩm này không?",
      onConfirm: handleDelete,
      onCancel: handleCloseDeleteConfirmationDialog,
    });
  };
  // Hàm để đóng hộp thoại xác nhận xóa
  const handleCloseDeleteConfirmationDialog = () => {
    setDeleteConfirmationDialog({ ...deleteConfirmationDialog, open: false });
  };
  // Hàm để đóng hộp thoại xác nhận xóa và thực hiện xóa
  const handleConfirmDelete = () => {
    // Thực hiện xóa
    deleteConfirmationDialog.onConfirm();
    // Đóng hộp thoại khi xóa thành công
    handleCloseDeleteConfirmationDialog();
  };
  //Xử lý tìm kiếm
  //Làm thay đổi trên URL
  useEffect(() => {
    navigate({ search: `page=${metaData.page}&search=${metaData.search}` });
  }, [metaData]);

  const 
  onChangeSearch = (e) => {
    let newSearch = e?.target?.value;
    setMetaData({ ...metaData, search: newSearch });
  };

  return (
    <StyledProducts>
      {/* MUI Snackbar hiển thị xóa thành công */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Thời gian tự động đóng sau 3 giây (hoặc bạn có thể điều chỉnh theo mong muốn)
        onClose={handleSnackbarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity="success"
        >
          {actionType === "Create" && "Thêm mới thành công!"}
          {actionType === "Edit" && "Sửa thành công!"}
          {actionType === "Delete" && "Xóa thành công!"}
        </MuiAlert>
      </Snackbar>
      <Stack direction="row">
        <AppButton onClick={onClickCreate} className="btn_create">
          Create
        </AppButton>
        {/* Search */}
        <div className="search">
          <Search value={metaData.search} onChange={onChangeSearch} />
        </div>
      </Stack>
      <TableContainer className="table_data">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table_title">ID</TableCell>
              <TableCell className="table_title">Product name</TableCell>
              <TableCell className="table_title">Product price</TableCell>
              <TableCell className="table_title">Product Info</TableCell>
              <TableCell className="table_title">Rating star</TableCell>
              <TableCell className="table_title">Product image</TableCell>
              <TableCell className="table_title">Category name</TableCell>
              <TableCell className="table_title">Stock Quantity</TableCell>
              <TableCell className="table_title">Create date</TableCell>
              <TableCell className="table_title">Exp date</TableCell>
              <TableCell className="table_title">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                {/* Hiển thị một hàng */}
                <TableCell colSpan={10} className="empty-text">
                  Trống
                </TableCell>
                {/* Sử dụng colSpan để chiếm hết các cột */}
              </TableRow>
            ) : (
              products.map((product, id) => (
                <TableRow key={id}>
                  <TableCell className="table_data">
                    {product?.productId}
                  </TableCell>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>
                    {product && parseFloat(product.productPrice)
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(parseFloat(product.productPrice))
                      : "0.00$"}
                  </TableCell>
                  <TableCell>{product?.productInfo}</TableCell>
                  <TableCell>
                    <Rating value={product?.ratingStar}  precision={0.25}  readOnly />
                  </TableCell>
                  <TableCell>
                    <img
                      src={formatImg(product?.productImage)}
                      className="product_img"
                    />
                  </TableCell>
                  <TableCell>{product?.categoryName}</TableCell>
                  <TableCell>{product?.stock_quantity}</TableCell>
                  <TableCell>{formatDatetime(product?.createDate)}</TableCell>
                  <TableCell>{formatDatetime(product?.exp_date)}</TableCell>
                  <TableCell>
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => onClickEdit(product)}
                          className="edit-icon"
                        >
                          <MdModeEditOutline />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => onClickDelete(product)}
                          className="delete-icon"
                        >
                          <MdDelete />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {/* Pagination */}
      <Stack justifyContent="center" className="pagination">
        <Pagination
          count={Math.ceil(total / metaData.limit)}
          onChange={(e, value) => onChangePagination(value)}
        />
      </Stack>
      {/* Dialog sửa sản phẩm */}
      <Dialog
        open={showPopup}
        onClose={onClosePopup}
        PaperProps={{ sx: { width: "100%" } }}
      >
        {/* Sử dụng popupMode để xác định xem đang tạo mới hay chỉnh sửa */}
        {popupMode === "create" ? (
          <ProductForm
            {...{
              onClosePopup,
              refreshProducts,
              handleSnackbarOpen,
              handleSnackbarClose,
            }}
          />
        ) : (
          <ProductForm
            {...{
              selectedProduct,
              onClosePopup,
              refreshProducts,
              handleSnackbarOpen,
              handleSnackbarClose,
            }}
          />
        )}
      </Dialog>
      {/* Dialog xác nhận xóa hay không? */}
      <Dialog
        open={deleteConfirmationDialog.open}
        onClose={handleCloseDeleteConfirmationDialog}
        PaperProps={{ sx: { width: "100%" } }}
      >
        <Box p={2}>
          <Typography variant="h6">{deleteConfirmationDialog.title}</Typography>
          <Typography>{deleteConfirmationDialog.content}</Typography>
          <Box mt={2} display="flex" justifyContent="flex-end">
            <Button onClick={deleteConfirmationDialog.onCancel} color="primary">
              Hủy
            </Button>
            <Button onClick={handleConfirmDelete} color="success">
              Xác nhận
            </Button>
          </Box>
        </Box>
      </Dialog>
    </StyledProducts>
  );
};

const StyledProducts = styled(Box)({
  ".product_img": {
    width: 48,
    height: 48,
    objectFit: "cover",
  },
  ".btn_create": {
    marginRight: "auto",
    width: 80,
    height: 40,
    marginTop: 50,
  },
  ".table_title": {
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  ".MuiTableCell-root": {
    textAlign: "center",
  },

  ".ant-input-group-wrapper": {
    width: "auto",
    marginTop: 50,
  },

  ".MuiPagination-ul": {
    justifyContent: "center",
  },
  ".MuiStack-root": {
    justifyContent: "center",
    padding: 10,
  },
  ".search": {
    marginTop: 23,
  },
  ".edit-icon": {
    color: "blue",
  },
  ".delete-icon": {
    color: "red",
  },
  // ".table_data": {
  //   overflowX: "hidden",
  // },
});

export default Products;
