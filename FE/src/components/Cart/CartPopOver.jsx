import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { onRemoveItem } from "../../redux/actions/cartActions";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  CircularProgress,
  Backdrop
} from "@mui/material";
import { formatImg } from "../../utils/imgHelpers";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import EmptyCart from"../../assets/imgs/empty-cart.jpg"

const CartPopOver = () => {
  const cart = useSelector((state) => state?.cart?.cart) || [];
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);

  const onClickDelete = (product) => {
    dispatch(onRemoveItem(product));
  };
  const onClickNextToCart = () =>{
    setLoadingBackdrop(true);
    setTimeout(()=>{
      navigate("/cart");   
      window.scrollTo({
        top:0
      });
    },700)
    
  }
  return (
    <StyledCartPopOver>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <img
            src={EmptyCart}
            alt="Empty Cart"
            className="empty-cart-image"
          />
          <Link className="link_next_to_cart">
            <Typography className="text_next">Next To Cart</Typography>
            <MdArrowForward className="icon_arrow" />
          </Link>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableBody>
              {cart?.map((product, index) => (
                <TableRow key={index}>
                  <TableCell>{product?.productName}</TableCell>
                  <TableCell>
                    <img
                      src={formatImg(product?.productImage)}
                      className="img_product"
                      alt={product?.productName}
                    />
                  </TableCell>
                  <TableCell>
                    {product?.quantity} 
                    x
                    {product && parseFloat(product.productPrice)
                      ? new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(parseFloat(product.productPrice))
                      : 0}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onClickDelete(product)}>
                      x
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <Link onClick={onClickNextToCart} className="link_next_to_cart">
                  <Typography className="text_next">Next To Cart</Typography>
                  <MdArrowForward className="icon_arrow" />
                </Link>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </StyledCartPopOver>
  );
};

const StyledCartPopOver = styled.div`
  padding: 24px;
  .img_product {
    width: 48px;
    height: 48px;
  }
  /* .MuiTableCell-root {
    text-align: center;
  } */
  .link_next_to_cart {
    display: flex;
    text-decoration: none;
    margin-top: 15px;
    width: 110px;
  }
  .text_next {
    margin-right: auto;
    color: #5c4543;
  }
  .text_next:hover {
    color: #8d4b39;
  }
  .icon_arrow {
    margin-top: 3px;
    color: #5c4543;
  }
  .icon_arrow:hover {
    color: #8d4b39;
  }
  .empty-cart {
    text-align: center;
  }
  .empty-cart-image {
    width: 200px; // Kích thước ảnh thông báo giỏ hàng trống
    height: auto;
    margin-bottom: 20px;
  }
  .empty-cart-text {
    color: #5c4543;
  }
`;

export default CartPopOver;
