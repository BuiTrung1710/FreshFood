import { Stack } from '@mui/system';
import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Des1 from "../../../../assets/icons/banner1.png"
import Des2 from "../../../../assets/icons/banner2.png";
import Des3 from "../../../../assets/icons/banner3.png";
import { Container, Typography } from '@mui/material';

const moveFromLeftToRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;
const moveFromRightToLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100%{
    transform: translateX(0%);
  }
`;
const moveFromBottomToTop = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
`;
const DescriptionShop = () => {

  useEffect(()=>{
    const handleScroll =() =>{
      const blockDes = document.querySelectorAll(".blockDes1, .blockDes2, .blockDes3");
      blockDes.forEach((des, index) =>{
          if(des) {
            const rect = des.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;


            if(isVisible){
              des.classList.add(`animate-des${index+1}`);
            }
          }
      });
    };
    window.addEventListener("scroll", handleScroll);

    return () =>{
      window.removeEventListener("scroll", handleScroll);
    }
  },[])


    return (
      <StyledDescriptionShop>
        <Container className="container_Des">
          <Stack direction="row" spacing={2} justifyContent="space-between">
            <Stack className="blockDes1">
              <div className="block_imgDes">
                <img src={Des1} className="imgDes" />
              </div>
              <h3 style={{ margin: "auto", height: 0 }}>
                Quy trình thuận tự nhiên
              </h3>
              <Typography style={{ height: 120 }}>
                Thuận tự nhiên là tôn chỉ của chúng tôi trong quá trình chăn
                nuôi, trồng cấy các sản phẩm để cung cấp đến người dùng tại hệ
                thống chuỗi thực phẩm sạch Whole Foods.
              </Typography>
            </Stack>

            <Stack className="blockDes2">
              <div className="block_imgDes">
                <img src={Des2} className="imgDes" />
              </div>
              <h3 style={{ margin: "auto", height: 0 }}>
                Chuỗi cung ứng tiêu chuẩn
              </h3>
              <Typography style={{ height: 120 }}>
                Bộ phận kỹ sư thực địa tại Whole Foods luôn giám sát nghiêm ngặt
                đối với các Hợp tác xã , đối tác tham gia trong chuỗi cung ứng
                tiêu chuẩn của chúng tôi.
              </Typography>
            </Stack>

            <Stack className="blockDes3">
              <div className="block_imgDes">
                <img src={Des3} className="imgDes" />
              </div>
              <h3 style={{ margin: "auto", height: 0 }}>Nguồn gốc minh bạch</h3>
              <Typography style={{ height: 120 }}>
                Sản phẩm thuận tự nhiên phải có thông tin nguồn gốc, quá trình
                nuôi trồng, sản phẩm được công khai minh bạch theo thời gian
                thực trên từng sản phẩm.
              </Typography>
            </Stack>
          </Stack>
        </Container>
      </StyledDescriptionShop>
    );
};
const StyledDescriptionShop = styled.div`
  .container_Des {
    display: table;
    margin-top: 120px;
  }
  .blockDes1,
  .blockDes2,
  .blockDes3 {
    border: 1px solid #742f1d;
    width: 360px;
    height: 231px;
    padding: 0px 15px;
    text-align: center;
    position: relative;
    font-family: "Dancing Script";
    font-weight: 600;
    font-size: 25px;
  }
  .animate-des1 {
    animation: ${moveFromLeftToRight} 1s ease-out;
  }
  .animate-des2 {
    animation: ${moveFromBottomToTop} 1s ease-out;
  }
  .animate-des3{
    animation: ${moveFromRightToLeft} 1s ease-out;
  }

  .block_imgDes {
    border: 2px solid #742f1d;
    border-radius: 99%;
    width: 60px;
    height: 60px;
    padding: 15px;
    background-color: #fff;
    position: absolute;
    top: -50px;
    left: 140px;
  }
  .imgDes {
    width: 60px;
    height: 60px;
  }
`;
export default DescriptionShop;