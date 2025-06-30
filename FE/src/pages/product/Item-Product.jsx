import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { formatImg } from "../../utils/imgHelpers";
import { FaCartPlus } from "react-icons/fa";
import styled, { keyframes } from "styled-components";
import { useDispatch } from "react-redux";
import { onAddItem } from "../../redux/actions/cartActions";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useState } from "react";

const colorChange = keyframes`
    0% {
      color: #00ff00; /* Màu ban đầu */
    }
    50% {
      color: #ffccff; /* Màu thứ hai */
    }
    100% {
      color: #00ff00; /* Quay lại màu ban đầu */
    }
`;

export const ItemProduct = ({ product }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const onClickProduct = () => {
    //Gửi hành động để thêm sản phẩm vào giỏ hàng
    dispath(onAddItem(product));
    handleOpenSnackbar();
  };
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const onClickNextToDetailProduct = () => {
    navigate(`/detail-product/${product.productId}`);
    window.scrollTo({
      top: 0,
    });
  };
  // Chuyển đổi product.productPrice thành kiểu số
  const price = parseFloat(product.productPrice);

  // Định dạng giá tiền
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

  return (
    <StyledItemPrroduct>
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
          severity="success"
        >
          Thêm sản phẩm vào giỏ hàng thành công!
        </MuiAlert>
      </Snackbar>
      <Card sx={{ width: "fit-content", maxWidth: 300, overflow: "hidden" }}>
        <div style={{ overflow: "hidden" }}>
          <CardMedia
            sx={{
              width: 300,
              height: 300,
              marginBottom: 0,
              transition:
                "filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s",
            }}
            image={formatImg(product.productImage)}
            onClick={onClickNextToDetailProduct}
            className="img_product"
          />
        </div>

        <CardContent
          className="card_content"
          sx={{ height: 115, borderTop: "2px solid #9e5b4a " }}
        >
          <div className="price_product">{formattedPrice}</div>

          <Rating value={product.ratingStar || 0} precision={0.25} readOnly />
          <br />
          <Link className="name_product" onClick={onClickNextToDetailProduct}>
            {product.productName}
          </Link>
          <br />
          <Typography className="blink-text">
            {product.stock_quantity > 0 ? "Còn hàng" : "Hết hàng"}
          </Typography>
        </CardContent>
        <CardActions className="card_action" style={{ padding: 0 }}>
          <Grid item xs={6} className="block_description">
            <Link>
              <Button
                onClick={onClickNextToDetailProduct}
                size="small"
                className="description"
              >
                Chi tiết
              </Button>
            </Link>
          </Grid>
          <Grid item xs={6} style={{ marginLeft: 0 }}>
            <Link>
              <Button
                size="small"
                className="add_to_cart"
                onClick={onClickProduct}
              >
                Add to cart
                <FaCartPlus className="icon_cart" />
              </Button>
            </Link>
          </Grid>
        </CardActions>
      </Card>
    </StyledItemPrroduct>
  );
};
const StyledItemPrroduct = styled.div`
  .card_content {
    background-color: #97796c;
    height: 190px;
  }
  .img_product:before {
    position: absolute;
    top: 0;
    left: -70px;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 100%
    );
    transform: skewX(-25deg) translateX(-100%); /* Di chuyển background sang trái bên ngoài khung hình */
    transition: transform 0.6s; /* Áp dụng transition cho thuộc tính transform */
  }

  .img_product:hover:before {
    transform: skewX(-25deg) translateX(220%); /* Di chuyển background sang phải để hoàn thành hiệu ứng */
  }

  .img_product:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
  /* Hủy transition cho background khi không hover */
  .img_product:not(:hover):before {
    transition: none;
  }

  .price_product {
    font-size: 25px;
    font-weight: 600;
    color: #fff;
    font-family: "Dancing Script";
  }
  .name_product {
    font-size: 23px;
    text-decoration: none;
    color: #fff;
    font-family: "Dancing Script";
  }
  .name_product:hover {
    color: #09414b;
  }
  .description {
    background-color: #dc8068;
    width: 100%;
    padding: 15px;
    color: #fff;
    border-radius: 0%;
  }
  .description:hover {
    background-color: #b4462a;
  }
  .add_to_cart {
    background-color: #5c4543;
    width: 100%;
    padding: 15px;
    color: #fff;
    border-radius: 0%;
  }
  .add_to_cart:hover {
    background-color: #8d4b39;
  }
  .icon_cart {
    font-size: 20px;
    margin-left: 5px;
    line-height: auto;
  }

  .blink-text {
    animation: ${colorChange} 2s infinite; /* Thời gian chuyển đổi màu sắc và lặp lại */
    font-size: 30px;
    font-family: "Dancing Script";
    font-weight: 600;
  }
`;
