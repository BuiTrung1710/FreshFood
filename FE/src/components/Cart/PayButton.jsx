import {http} from "../../services/http";
import { useUser } from "../../providers/user-provider";
import {Button, Snackbar, Alert, Backdrop, CircularProgress, DialogActions, Dialog, DialogTitle, DialogContent} from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const PayButton = ({cartItems}) =>{
  const navigate = useNavigate();
    const {user} = useUser();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const [loadingBackdrop, setLoadingBackdrop] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
      setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
    };

    const handleCheckout = () =>{
      handleOpenDialog();
      // Bật trạng thái loading ngay khi bắt đầu hàm 
    };
    const proceedToCheckout = () => {
      // Các bước tiếp theo để tiến hành thanh toán
      setLoadingButton(true);
      // Bắt đầu các bước thanh toán
      // Kiểm tra nếu user chưa đăng nhập
      if (!user) {
        // Hiện thông báo bằng Snackbar sau một thời gian ngắn
        setTimeout(() => {
          setOpenSnackbar(true);
          setLoadingButton(false); // Tắt loading ngay lập tức
          setLoadingBackdrop(true); //LoadingBackdrop
        }, 200); // Cho phép hiển thị loading trong 0.2 giây
        return; // Ngăn không cho hàm thực thi tiếp
      }
      // Nếu đã đăng nhập, tiến hành tạo phiên thanh toán
      http
        .post("/stripe/create-checkout-session", {
          cartItems,
          accountId: user.accountId,
        })
        .then((res) => {
          console.log("data", res.data);
          if (res.data.url) {
            window.location.href = res.data.url;
          }
        })
        .catch((err) => {
          console.error("Error during checkout:", err);
          setErrorMessage(
            "Lỗi trong quá trình xử lý thanh toán. Vui lòng thử lại."
          );
          setLoadingButton(false);
          setLoadingBackdrop(false);
        })
        .finally(() => {
          setLoadingButton(false); // Tắt trạng thái loading khi hoàn thành hoặc có lỗi
        });
    };


     const handleCloseSnackbar = () => {
       setOpenSnackbar(false);
       
       setTimeout(()=>{
         // Chuyển người dùng đến trang đăng nhập
         navigate("/FormLogin");
         window.scrollTo({
           top: 0,
           behavior: "smooth",
         });
       },300);
       
     };

    return (
      <StyledButtonPayment>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={errorMessage ? "error" : "warning"}
            sx={{ width: "100%" }}
          >
            {errorMessage || "Bạn cần đăng nhập để tiếp tục thanh toán!"}
          </Alert>
        </Snackbar>

        {/* Loading */}
        <Backdrop
          open={loadingBackdrop}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Button
          className="btn_nextTo_checkout"
          onClick={handleCheckout}
          disabled={loadingButton}
          startIcon={
            loadingButton ? (
              <CircularProgress size={24} color="inherit" />
            ) : null
          }
        >
          {loadingButton ? "Processing..." : "Check out"}
        </Button>
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
      </StyledButtonPayment>
    );
}
const StyledButtonPayment = styled.div`
  .btn_nextTo_checkout {
    background-color: #dc8068;
    color: #fff;
    border-radius: 0%;
    margin-top: 30px;
    width: 100%;
  }
  .btn_nextTo_checkout:hover {
    background-color: #b4462a;
  }
`;
export default PayButton;