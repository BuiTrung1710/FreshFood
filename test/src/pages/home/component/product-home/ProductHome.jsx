import { Button, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { apiGetProducts } from "../../../../services/product";
import { ItemProduct } from "../../../product/Item-Product";

const moveFromBottomToTop = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;
const moveFromLeftToRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;
const ProductHome = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const handleTopToProduct = () => {
    window.scrollTo({
      top: 0,
    });
    navigate("/product");
  };
  useEffect(() => {
    const handelScroll = () => {
      const scroll_productHome = document.querySelectorAll(
        ".label_productHome, .btn_view_more"
      );
      scroll_productHome.forEach((item, index) => {
        const rect =item.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

        if (isVisible) {
          item.classList.add(`animate-label_productHome`);
          item.classList.add(`animate-btn_view_more`);
        }
      });
    };
    window.addEventListener("scroll", handelScroll);
    return () => {
      window.removeEventListener("scroll", handelScroll);
    };
  }, []);
  useEffect(() => {
    apiGetProducts()
      .then((res) => {
        let Data = res?.data;
        if (Array.isArray(Data?.data)) {
          //Lấy ra 8 sản phẩm đầu tiên từ mảng:
          let limitedProducts = Data?.data.slice(0, 8);
          setProducts(limitedProducts);
        } else {
          console.error("Lỗi: Phản hồi không chứa một mảng sản phẩm");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <StyledProductHome>
      <Container style={{ maxWidth: 1300 }}>
        <h1 className="label_productHome">Các Loại Sản Phẩm</h1>
        {/*product */}
        <Grid container spacing={4} style={{ margin: "auto" }}>
          {products.map((product, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={3}
              style={{ paddingLeft: 0 }}
              spacing={2}
            >
              <ItemProduct product={product} />
            </Grid>
          ))}
        </Grid>
        <Button className="btn_view_more" onClick={handleTopToProduct}>
          Xem Thêm
        </Button>
      </Container>
    </StyledProductHome>
  );
};
const StyledProductHome = styled.div`
  margin-top: 100px;
  .label_productHome {
    text-align: center;
    color: #334862;
    font-family: "Dancing Script";
    font-size: 40px;
    animation: ${moveFromBottomToTop} 2s ease-out;
  }
  .btn_view_more {
    background-color: #b4462a;
    color: #fff;
    padding: 15px 30px;
    border-radius: 0%;
    margin-top: 20px;
    margin-bottom: 50px;
    font-family: "Dancing Script";
    display: block;
    margin-left: auto;
    margin-right: auto;
    animation: ${moveFromLeftToRight} 2.5s ease-out;
  }
  .btn_view_more:hover {
    background-color: #8d4b39;
  }
`;
export default ProductHome;
