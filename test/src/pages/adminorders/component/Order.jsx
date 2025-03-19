import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
  Pagination,
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
import { MdModeEditOutline, MdDelete } from "react-icons/md";
import { useNavigate, useSearchParams } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { formatDatetime } from "../../../utils/stringHelpers";
import { useSearch } from "../../../hooks/useSearch";
import { apiDeleteOrder, apiGetOrders } from "../../../services/order";
import OrderForm from "./OrderForm";


const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
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
  const [selectedOrder, setSelectedOrder] = useState();
  const [reloadOrders, setReloadOrders] = useState(false);
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
  //Call api gọi ra danh sách account
  useEffect(() => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      apiGetOrders(metaData.page, metaData.limit, metaData.search)
        .then((res) => {
          let data = res?.data;
          setOrders(data?.data);
          setTotal(data?.metadata?.total || 0);
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 500);
  }, [metaData.page, metaData.limit, keySearch, reloadOrders]);

  //Hàm xử lý pagination
  const onChangePagination = (value) => {
    setMetaData({ ...metaData, page: value });
  };
  //Hàm reload lại account mỗi khi sửa hoặc xóa hoặc thêm mới sản phẩm
  const refreshOrders = () => {
    setReloadOrders(!reloadOrders);
  };

  //Hàm xử lý khi click vào nút edit
  const onClickEdit = (order) => {
    // set trạng thái cửa sổ edit bật lên bằng true
    setShowPopup(true);
    setPopupMode("edit");
    setSelectedOrder(order);
    setActionType("Edit");
  };

  //Hàm đóng cửa sổ edit
  const onClosePopup = () => {
    setShowPopup(false);
  };
//   //Hàm xử lý xóa account
  const onClickDelete = (order) => {
    // Hàm để xử lý chức năng xóa (call api)
    const handleDelete = () => {
      setLoadingBackdrop(true);
      setTimeout(() => {
        apiDeleteOrder(order?.orderId)
          .then((res) => {
            setLoadingBackdrop(false);
            refreshOrders();
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
    // set trạng thái khi click vào icon xóa sẽ hiện dialog hỏi muốn xóa tài khoản không?
    setDeleteConfirmationDialog({
      open: true,
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa đơn hàng này không?",
      onConfirm: handleDelete,
      onCancel: handleCloseDeleteConfirmationDialog,
    });
  };
//   Hàm để đóng hộp thoại xác nhận xóa
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
  const onChangeSearch = (e) => {
    let newSearch = e?.target?.value;
    setMetaData({ ...metaData, search: newSearch });
  };
  useEffect(() => {
    navigate({ search: `page=${metaData.page}&search=${metaData.search}` });
  }, [metaData]);

  const getOrderStatusLabel = (status) => {
    const statusLabels = {
      0: "pending",
      1: "processing",
      2: "shipped",
      3: "delivered",
      4: "cancelled",
      5: "returned",
    };

    return statusLabels[status] || "Unknown Status"; // Trả về "Unknown Status" nếu không tìm thấy trạng thái
  };


  return (
    <StyledOrders>
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
          {actionType === "Edit" && "Cập nhật đơn hàng thành công!"}
          {actionType === "Delete" && "Xóa đơn hàng thành công!"}
        </MuiAlert>
      </Snackbar>
      <Stack direction="row">
        {/* Search */}
        <div className="search">
          <Search
            value={metaData.search}
            onChange={onChangeSearch}
            className="search"
          />
        </div>
      </Stack>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="table_title">Order ID</TableCell>
              <TableCell className="table_title">Account ID</TableCell>
              <TableCell className="table_title">Customer FullName</TableCell>
              <TableCell className="table_title">Shipping Address</TableCell>
              <TableCell className="table_title">Customer Phone </TableCell>
              <TableCell className="table_title">Customer Email </TableCell>
              <TableCell className="table_title">Payment Status</TableCell>
              <TableCell className="table_title">Order Status</TableCell>
              <TableCell className="table_title">Payment Method</TableCell>
              <TableCell className="table_title">Product Name</TableCell>
              <TableCell className="table_title">Quantity</TableCell>
              <TableCell className="table_title">Price</TableCell>
              <TableCell className="table_title">Create Time</TableCell>
              <TableCell className="table_title">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                {/* Hiển thị một hàng */}
                <TableCell colSpan={10} className="empty-text">
                  Trống
                </TableCell>
                {/* Sử dụng colSpan để chiếm hết các cột */}
              </TableRow>
            ) : (
              orders.map((order, id) => (
                <TableRow key={id}>
                  <TableCell>{order?.orderId}</TableCell>
                  <TableCell>{order?.accountId}</TableCell>
                  <TableCell>{order?.customerFullname}</TableCell>
                  <TableCell>{order?.shippingAddress}</TableCell>
                  <TableCell>{order.customerPhone}</TableCell>
                  <TableCell>{order.customerEmail}</TableCell>
                  <TableCell>{order.paymentStatus}</TableCell>
                  <TableCell>
                    {getOrderStatusLabel(order.orderStatus)}
                  </TableCell>
                  <TableCell>{order.paymentMethod}</TableCell>
                  <TableCell>
                    {order.ProductNames.split(", ").map((productname, idx) => (
                      <div key={idx}>{productname}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {order.Quantities.split(", ").map((quantity, idx) => (
                      <div key={idx}>{quantity}</div>
                    ))}
                  </TableCell>
                  <TableCell>
                    {order.Prices.split(", ").map((price, idx) => {
                      const formattedPrice = new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(parseFloat(price));
                      return <div key={idx}>{formattedPrice}</div>;
                    })}
                  </TableCell>
                  <TableCell>{formatDatetime(order?.createTime)}</TableCell>

                  <TableCell>
                    <Stack spacing={2} direction="row">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => onClickEdit(order)}
                          className="edit-icon"
                        >
                          <MdModeEditOutline />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => onClickDelete(order)}
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
      <Stack justifyContent="center" p={5}>
        <Pagination
          count={Math.ceil(total / metaData.limit)}
          onChange={(e, value) => onChangePagination(value)}
        />
      </Stack>
      {/* Dialog thêm, sửa sản phẩm */}
      <Dialog
        open={showPopup}
        onClose={onClosePopup}
        PaperProps={{ sx: { width: "100%" } }}
      >
        {popupMode === "edit" && (
          <OrderForm
            {...{
              selectedOrder,
              onClosePopup,
              refreshOrders,
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
    </StyledOrders>
  );
};

const StyledOrders = styled(Box)({
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
});

export default Orders;
