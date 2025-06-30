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
import { AppButton } from "../../../components/AppButton/AppButton";
import { deleteAccount, getAllAccounts } from "../../../services/account";
import AccountForm from "./AccountForm";
import { formatDatetime } from "../../../utils/stringHelpers";
import { useSearch } from "../../../hooks/useSearch";
const Accounts = () => {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
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
  const [selectedAccount, setSelectedAccount] = useState();
  const [reloadAccounts, setReloadAccounts] = useState(false);
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
      getAllAccounts(metaData.page, metaData.limit, metaData.search)
        .then((res) => {
          let data = res?.data;
          setAccounts(data?.data);
          setTotal(data?.metadata?.total || 0);
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 500);
  }, [metaData.page, metaData.limit, keySearch, reloadAccounts]);

  //Hàm xử lý pagination
  const onChangePagination = (value) => {
    setMetaData({ ...metaData, page: value });
  };
  //Hàm reload lại account mỗi khi sửa hoặc xóa hoặc thêm mới sản phẩm
  const refreshAccounts = () => {
    setReloadAccounts(!reloadAccounts);
  };
  //Hàm xử lý khi click vào nút thêm mới
  const onClickCreate = () => {
    setShowPopup(true);
    setPopupMode("create");
    setActionType("Create");
  };

  //Hàm xử lý khi click vào nút edit
  const onClickEdit = (account) => {
    // set trạng thái cửa sổ edit bật lên bằng true
    setShowPopup(true);
    setPopupMode("edit");
    setSelectedAccount(account);
    setActionType("Edit");
  };

  //Hàm đóng cửa sổ edit
  const onClosePopup = () => {
    setShowPopup(false);
  };
  //Hàm xử lý xóa account
  const onClickDelete = (account) => {
    // Hàm để xử lý chức năng xóa (call api)
    const handleDelete = () => {
      setLoadingBackdrop(true);
      setTimeout(() => {
        deleteAccount(account?.accountId)
          .then((res) => {
            setLoadingBackdrop(false);
            refreshAccounts();
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
      content: "Bạn có chắc chắn muốn xóa tài khoản này không?",
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
  const onChangeSearch = (e) => {
    let newSearch = e?.target?.value;
    setMetaData({ ...metaData, search: newSearch });
  };
  useEffect(() => {
    navigate({ search: `page=${metaData.page}&search=${metaData.search}` });
  }, [metaData]);

  return (
    <StyledAccounts>
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
              <TableCell className="table_title">ID</TableCell>
              <TableCell className="table_title">Email</TableCell>
              <TableCell className="table_title">User Name</TableCell>
              <TableCell className="table_title">Full Name </TableCell>
              <TableCell className="table_title">Is Admin </TableCell>
              <TableCell className="table_title">Create Date</TableCell>
              <TableCell className="table_title">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {accounts.length === 0 ? (
              <TableRow>
                {/* Hiển thị một hàng */}
                <TableCell colSpan={10} className="empty-text">
                  Trống
                </TableCell>
                {/* Sử dụng colSpan để chiếm hết các cột */}
              </TableRow>
            ) : (
              accounts.map((account, id) => (
                <TableRow key={id}>
                  <TableCell>{account?.accountId}</TableCell>
                  <TableCell>{account?.email}</TableCell>
                  <TableCell>{account?.username}</TableCell>
                  <TableCell>{account?.fullName}</TableCell>
                  <TableCell>
                    {account?.isAdmin === 1 ? "Admin" : "Customer"}
                  </TableCell>
                  <TableCell>{formatDatetime(account?.createDate)}</TableCell>

                  <TableCell>
                    <Stack spacing={2} direction="row">
                      <Tooltip title="Edit">
                        <IconButton
                          onClick={() => onClickEdit(account)}
                          className="edit-icon"
                        >
                          <MdModeEditOutline />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Delete">
                        <IconButton
                          onClick={() => onClickDelete(account)}
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
        {/* Sử dụng popupMode để xác định xem đang tạo mới hay chỉnh sửa */}
        {popupMode === "create" ? (
          <AccountForm
            {...{
              onClosePopup,
              refreshAccounts,
              handleSnackbarOpen,
              handleSnackbarClose,
            }}
          />
        ) : (
          <AccountForm
            {...{
              selectedAccount,
              onClosePopup,
              refreshAccounts,
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
    </StyledAccounts>
  );
};

const StyledAccounts = styled(Box)({
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

export default Accounts;
