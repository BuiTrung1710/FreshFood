import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { deepOrange, deepPurple } from "@mui/material/colors";
import {
  Button,
  Rating,
  Typography,
  Snackbar,
  Avatar,
  Stack,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { productReview, productReviewById } from "../../services/product";
import { useUser } from "../../providers/user-provider";
import { MdOutlineSend } from "react-icons/md";

const ProductReview = ({ productId }) => {
  const [value, setValue] = useState(0);
  const [recommend, setRecommend] = useState("");
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [statusType, setStatusType] = useState("");
  const [productReviews, setProductReviews] = useState([]);
  const [reviewSuccess, setReviewSuccess] = useState(false); // Thêm state mới để kiểm tra việc đánh giá đã thành công hay chưa
  const { user } = useUser();

  const onSubmitReview = (event) => {
    event.preventDefault();
    if (value < 1 || value > 5) {
      setSnackbarMessage("Bạn chưa đánh giá sao cho sản phẩm!");
      setStatusType("error");
      handleSnackBarOpen();
      return;
    }
    if (recommend.trim() === "") {
      setSnackbarMessage("Bạn chưa nhận xét sản phẩm!");
      setStatusType("error");
      handleSnackBarOpen();
      return;
    }
    //Call api để gửi đánh giá
    productReview(value, productId, recommend)
      .then((res) => {
        setSnackbarMessage("Đã gửi đánh giá thành công");
        setStatusType("success");
        setReviewSuccess(true); // Đánh giá thành công, cập nhật state
        handleSnackBarOpen();
      })
      .catch((err) => {
        if (!user) {
          setSnackbarMessage("Bạn cần đăng nhập mới có thể đánh giá sản phẩm!");
        }
        else{
          setSnackbarMessage("Xảy ra lỗi trong quá trình đánh giá sản phẩm!");
        }
        setStatusType("error");
        handleSnackBarOpen();
      });
  };
  //Hàm mở snackbar:
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };
  //Hàm đóng snackbar:
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  // useEffect để lắng nghe việc đánh giá thành công, sau đó reload lại trang
  useEffect(() => {
    if (reviewSuccess) {
      setTimeout(() => {
        window.location.reload();
      }, 700); // Delay 2 giây trước khi reload lại trang
    }
  }, [reviewSuccess]);

  useEffect(() => {
    //Call api để lấy ra thông tin đánh giá từ người dùng
    productReviewById(productId)
      .then((res) => {
        console.log(res?.data);
        setProductReviews(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const stringAvatar = (username) => {
    if (!username) return { firstUpperCase: "", lastUpperCase: "" }; // Kiểm tra xem username có tồn tại không
    let firstUpperCase = null;
    let lastUpperCase = null;

    // Kiểm tra xem username có nhiều hơn một từ không
    const words = username.trim().split(/\s+/);

    if (words.length > 1) {
      // Nếu username có nhiều hơn một từ, thực hiện logic để lấy ký tự in hoa đầu và cuối cùng
      for (let i = 0; i < username.length; i++) {
        const char = username[i];
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
          if (firstUpperCase === null) {
            firstUpperCase = char;
          }
          lastUpperCase = char;
        }
      }
    }

    return { firstUpperCase, lastUpperCase };
  };

  return (
    <StyledProductReview>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackBarClose}
          severity={statusType}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
      <h3>Đánh giá</h3>
      {productReviews.length === 0 ? (
        <Typography className="info_noRecommend">
          Hiện tại chưa có đánh giá nào
        </Typography>
      ) : (
        <>
          <div className="block_getReview">
            {productReviews.map((review, i) => (
              <div key={i} style={{ padding: "10px 10px 30px 10px" }}>
                <Stack direction="row" spacing={2}>
                  <Avatar
                    sx={{
                      bgcolor:
                        review?.isAdmin === 1
                          ? deepPurple[500]
                          : deepOrange[500],
                    }}
                  >
                    {stringAvatar(review.username).firstUpperCase}
                    {stringAvatar(review.username).lastUpperCase}
                  </Avatar>
                  <Rating value={review?.rating} readOnly precision={0.25} />
                </Stack>
                <Typography style={{ marginLeft: 60 }}>
                  {review?.recommend}
                </Typography>
              </div>
            ))}
          </div>
        </>
      )}

      <form onSubmit={onSubmitReview} className="form_recommend">
        <h4>Đánh giá của bạn*</h4>
        <Rating
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          precision={0.5}
        />
        <h4>Nhận xét của bạn*</h4>
        <textarea
          cols="30"
          rows="10"
          className="recommend"
          value={recommend}
          onChange={(event) => {
            setRecommend(event.target.value);
          }}
        />
        <br />
        <Button type="submit" className="btn_sendRecommend">
          <div style={{display:"flex", alignItems:"center",width:"100%"}}>
            <p style={{padding: "0px 10px 0px 0px"}}>Gửi đi</p>
              <MdOutlineSend />
          </div>
        </Button>
      </form>
    </StyledProductReview>
  );
};

const StyledProductReview = styled.div`
  border: 1px solid #acb5b5;
  padding: 20px;
  margin-top: 30px;
  border-radius: 10px;

  .block_getReview {
    overflow-y: auto; /* Tự động xuất hiện thanh cuộn dọc */
    max-height: 400px; /* Đặt chiều cao cố định */
  }
  .form_recommend {
    border: 1px solid #742f1c;
    padding: 10px 30px;
  }
  .recommend {
    width: 100%;
    height: 200px;
  }
  .btn_sendRecommend {
    background-color: #742f1c;
    color: #fff;
    border-radius: 0%;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .btn_sendRecommend:hover {
    background-color: #582517;
  }
  .info_noRecommend {
    font-family: "Dancing Script";
    font-size: 25px;
    font-weight: 600;
    padding: 10px 10px 20px 0px;
  }
`;

export default ProductReview;
