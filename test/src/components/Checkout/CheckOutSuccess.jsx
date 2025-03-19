import React, { useEffect } from 'react';
import styled, {keyframes} from "styled-components";
import {Breadcrumbs, Container, Stack} from "@mui/material";
import { useDispatch } from 'react-redux';
import { onClearItem } from '../../redux/actions/cartActions';
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link, useNavigate } from 'react-router-dom';


const bounceAnimation = keyframes`
 0%, 100% {
    transform: scale(0);
    opacity: 1;
  }
  50%, 100% {  // Thay đổi ở đây để giữ scale ở 1 cho 100%
    transform: scale(1);
    opacity: 1;
  } 100% {
    transform: scale(1);
  }
`;

const AnimatedIcon = styled(FontAwesomeIcon)`
  animation: ${bounceAnimation} 1s forwards; // Sử dụng "forwards" để giữ trạng thái cuối cùng của animation
`;

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    dispatch(onClearItem());
  },[dispatch]);

  const onClickPrevProductPage = () =>{
    navigate("/product");
    window.scrollTo(({
      top: 0,
    }))
  }

  const breadcrumbs = [
    <Link
      style={{
        textDecoration: "none",
        fontFamily: "Dancing script",
        fontSize: 35,
        color: "#ccc",
      }}
      key="3"
      onClick={onClickPrevProductPage}
      className="Link_checkout"
    >
      <span className="style_number_breadcrums1">1</span>
      Shopping Cart
    </Link>,
    <Link
      style={{
        textDecoration: "none",
        color: "#ccc",
        fontFamily: "Dancing script",
        fontSize: 35,
      }}
      className="Link_checkout"
      key="1"
    >
      <span className="style_number_breadcrums2">2</span>
      Checkout Detail
    </Link>,
    <Link
      style={{
        textDecoration: "none",
        fontFamily: "Dancing script",
        fontSize: 35,
        cursor: "default",
        fontWeight: 600,
        color: "#000000",
      }}
      to="#"
      key="2"
    >
      <span className="style_number_breadcrums3">3</span>
      Order Complete
    </Link>,
  ];

    return (
      <StyledCheckOutSuccess>
        <Stack direction="column" className="page_checkout-success">
          <Header />
          {/*Breadcrums */}
          <Container
            style={{
              maxWidth: 1300,
              marginTop: 50,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Stack spacing={2}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                {breadcrumbs}
              </Breadcrumbs>
            </Stack>
          </Container>
          <Container className="container_checkout-success">
            <div
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <AnimatedIcon
                icon={faCircleCheck}
                style={{
                  color: "#21f24b",
                  fontSize: "60px",
                  paddingRight: "10px",
                }}
              />
              <h2>Checkout Successful</h2>
            </div>

            <p>Your order might take some time to process.</p>
            <p>Check your order status at your profile after about 10mins.</p>
            <p>
              Incase of any inqueries contact the support at
              <strong>support@onlineshop.com</strong>
            </p>
          </Container>
          <Footer />
        </Stack>
      </StyledCheckOutSuccess>
    );
};
const StyledCheckOutSuccess = styled.div`
  height: 100vh;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
  .page_checkout-success {
    width: 100%;
    height: 100%;
  }
  .container_checkout-success {
    margin-bottom: auto;
    margin-top: 60px;
    padding: 40px 0px 100px 0px;
    margin-left: 40%;
  }
  .style_number_breadcrums3 {
    display: inline-block;
    border-radius: 99px;
    width: 1.5em;
    font-size: 0.7em;
    text-align: center;
    color: #fff;
    height: 1.5em;
    line-height: 1.5em;
    margin: 0 0.5em;
    background-color: rgb(99, 175, 49);
  }
  .style_number_breadcrums2,
  .style_number_breadcrums1 {
    display: inline-block;
    border-radius: 99px;
    width: 1.5em;
    font-size: 0.7em;
    text-align: center;
    color: #fff;
    height: 1.5em;
    line-height: 1.5em;
    margin: 0 0.5em;
    background-color: #ccc;
  }
  .Link_checkout:hover {
    color: #000000 !important;
    font-weight: 600;
  }
`;
export default CheckOutSuccess;