import { Container, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ImageLogo from "../imgg/imgLogo";
import { StyledFooter } from "./Footer.css";
import {
  MdEmail,
  MdLocationOn,
  MdPhone,
  MdContactPhone,
  MdInfo,
  MdProductionQuantityLimits,
  MdAccountBox,
  MdShoppingCart,
  MdPlaylistAddCheck,
} from "react-icons/md";
import {AiOutlineArrowUp, AiTwotoneShop } from "react-icons/ai";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";
import styled from "styled-components";

const Footer = (props) => {
  //Animation scroll to top
  const handleTopClick = () => {
    animateScroll.scrollToTop();
  };
  //Thực hiện ẩn hiện btn scrollTop khi window < 250
  useEffect(() => {
    const handleScrollTop = () => {
      const scrollTopBtn = document.getElementById("scroll_top_btn");
      if (scrollTopBtn) {
        scrollTopBtn.style.display = window.scrollY < 250 ? "none" : "block";
      }
    };
    window.addEventListener("scroll", handleScrollTop);
    // Thêm dòng này để xử lý trường hợp đặc biệt
    handleScrollTop();
    //Cleanup Function để tránh rò rỉ bộ nhớ khi sử dụng addEventListener. Thực hiện khi chuyển sang trang khác thì scrollTop sẽ được gỡ sự kiện
    return () => {
      window.removeEventListener("scroll", handleScrollTop);
    };
  }, []);
  return (
    <>
      <StyledFooter>
        <Container className="container_footer">
          <Stack direction="row" spacing={5}>
            {/* Column 1 */}
            <Stack direction="column" spacing={2} className="footer_column1">
              <Stack spacing={2} alignItems="center">
                <Typography className="logo_text">
                  <Link to="/">
                    <ImageLogo />
                  </Link>
                </Typography>
              </Stack>

              <Stack
                direction="column"
                spacing={2}
                className="info_1"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center" className="address">
                  <MdLocationOn cursor="pointer" />
                  <Typography>: 139 Lê Thanh Nghị</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" className="phone">
                  <MdPhone cursor="pointer" />
                  <Typography cursor="pointer">: 0977-232-223</Typography>
                </Stack>

                <Stack direction="row" alignItems="center" className="email">
                  <MdEmail cursor="pointer" />
                  <Typography>:info@example.com</Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* Column 2 */}
            <Stack direction="column" spacing={2} className="footer_column2">
              <Stack direction="row" alignItems="center">
                <AiTwotoneShop className="icon_shop" />
                <Typography className="shop">Cửa hàng</Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <MdContactPhone className="icon2" />
                <Typography className="contact">Liên hệ</Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <MdInfo className="icon2" />
                <Typography className="info_me">
                  Thông tin về chúng tôi
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <MdProductionQuantityLimits className="icon2" />
                <Typography className="business_products">
                  Sản phẩm kinh doanh
                </Typography>
              </Stack>
            </Stack>

            {/* column 3 */}
            <Stack direction="column" spacing={2} className="footer_column3">
              <Stack direction="row" alignItems="center">
                <MdAccountBox className="icon3" />
                <Typography className="info_account">
                  Thông tin tài khoản
                </Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <MdShoppingCart className="icon3" />
                <Typography className="cart">Giỏ hàng</Typography>
              </Stack>

              <Stack direction="row" alignItems="center">
                <MdPlaylistAddCheck className="icon3" />
                <Typography className="favorites_list">
                  Danh sách ưa thích
                </Typography>
              </Stack>
            </Stack>

            {/* column 4 */}
            <Stack direction="column" spacing={2} className="footer_column4">
              <Typography className="shop">Khuyến mãi & ưu đãi</Typography>

              <Typography className="contact">
                Hãy đăng ký để cập nhập thông tin.
              </Typography>
            </Stack>
          </Stack>
        </Container>
        <Stack style={{padding:20, marginTop:42, borderTop:"1px solid #fff"}}>
          <Typography style={{color:"#fff", textAlign:"center"}}>
            Copyrights © 2023 - <span style={{color:"#ffb416"}}>Whole Foods</span>,
            All Rights Reserved.
          </Typography>
          </Stack>
        <StyledScrollToTopButton id="scroll_top_btn" onClick={handleTopClick}>
          <AiOutlineArrowUp />
        </StyledScrollToTopButton>
      </StyledFooter>
    </>
  );
};
const StyledScrollToTopButton = styled.div`
  position: fixed;
  right: 32px;
  bottom: 32px;
  font-size: 20px;
  border: 0px solid;
  border-radius: 50%;
  background-color: #ffb416;
  color: #fff;
  padding: 10px 12px;
  cursor: pointer;
  &:hover {
    background-color: #d79403;
  }
`;
export default Footer;
