import {Container, Rating, Stack, Card, CardMedia, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineLocalFireDepartment } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { apiGetProducts } from "../../../../services/product";
import { formatImg } from "../../../../utils/imgHelpers";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotContent = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const sliderRef = useRef(null); // Tham chiếu đến component Slider
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const res = await apiGetProducts();
    //     const data = res?.data; //toán tử ?. để tránh lỗi nếu response là undefined.
    //     const topRatedProducts = data?.data.filter(
    //       (product) => product.ratingStar === 5
    //     );
    //     const randomProducts = topRatedProducts.slice(0, 4);
    //     setProducts(randomProducts);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
    // // Chỉ gọi fetchData khi products rỗng (lần đầu mount) hoặc khi muốn làm mới dữ liệu
    // if (products.length === 0) {
    //   fetchData();
    // }
    setTimeout(() => {
      apiGetProducts()
        .then((res) => {
          let data = res?.data;
          const topRatedProducts = data?.data.filter(
            (product) => product.ratingStar >= 4
          );
          const randomProducts = topRatedProducts.slice(0, 8);
          setProducts(randomProducts);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 400);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const nextSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext(); // Gọi phương thức slickNext() để chuyển slide tiếp theo
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev(); // Gọi phương thức slickPrev() để chuyển slide trước đó
    }
  };

    const onClickNextToDetailProduct = (productId) => {
      navigate(`/detail-product/${productId}`);
      window.scrollTo({
        top: 0,
      });
    };

  return (
    <StyledSaleContent>
      <Container>
        <Link to="/" className="link_deal">
          <Stack direction="row" alignItems="center" className="Deals_Week">
            <MdOutlineLocalFireDepartment className="icon_deal" />
            <h2>Sản phẩm nổi bật</h2>
          </Stack>
        </Link>
        <Slider ref={sliderRef} {...settings}>
          {products.map((product, i) => (
            <Card sx={{ height: 400, maxWidth: 260 }} key={i}>
              <div style={{ overflow: "hidden" }}>
                <CardMedia
                  sx={{
                    width: "100%",
                    height: 250,
                    marginBottom: 0,
                    transition:
                      "filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s",
                  }}
                  image={formatImg(product.productImage)}
                  className="img_product"
                  onClick={() => onClickNextToDetailProduct(product?.productId)}
                />
              </div>

              <CardContent
                className="card_content"
                sx={{ height: 115, borderTop: "2px solid #9e5b4a " }}
              >
                <div className="price_product">{new Intl.NumberFormat("en-US", {
                                  style: "currency",
                                  currency: "USD",
                                }).format(
                                  parseFloat(product?.productPrice)
                                )}</div>
                <Link
                  className="name_product"
                  onClick={() => onClickNextToDetailProduct(product?.productId)}
                >
                  {product?.productName}
                </Link>
                <br />
                <Rating
                  value={product.ratingStar || 0}
                  precision={0.25}
                  readOnly
                />
                <br />
              </CardContent>
            </Card>
          ))}
        </Slider>
        <button
          className="prevButton"
          onClick={prevSlide}
          style={{ color: "brown" }}
        >
          Prev
        </button>
        {/* Nút prev */}
        <button className="nextButton" onClick={nextSlide}>
          Next
        </button>
        {/* Nút next */}
      </Container>
    </StyledSaleContent>
  );
};
const StyledSaleContent = styled(Container)`
  border: 2px solid red;
  margin-top: 100px;
  height: 500px;
  max-width: 1320px;
  border-radius: 50px;

  .link_deal {
    text-decoration: none;
    color: #555;
    font-family: "Dancing Script";
    font-weight: 600;
    font-size: 20px;
  }
  .icon_deal {
    width: 40px;
    height: 40px;
    color: red;
  }
  .Deals_Week {
    border: 0px solid;
    background-color: #fff;
    border-radius: 50px;
    max-width: 25%;
    margin-top: -40px;
    margin-bottom: 20px;
    box-shadow: 0px 0px 17px 8px rgb(0 0 0 / 5%);
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }
  .prevButton,
  .nextButton {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
  .slick-prev:before,
  .slick-next:before {
    color: brown;
  }
  .prevButton {
    left: 0;
  }
  .nextButton {
    right: 0;
  }
  .card_content {
    background-color: #97796c;
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
`;

export default HotContent;
