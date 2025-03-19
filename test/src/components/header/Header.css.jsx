import { Grid } from "@mui/material";
import styled from "styled-components";
export const StyledHeader = styled(Grid)`
  background-color: #3ba66b;
  width: 100%;
  padding: 0px;
  position: sticky; /* Thay đổi từ 'fixed' thành 'sticky' */
  top: 0;
  z-index: 1000;
  transition: transform 0.3s; /* Thêm hiệu ứng chuyển động */

  &.hidden {
    transform: translateY(-100%);
  }
  & .container_header {
    padding: 0px;
    max-width: 1320px;
  }
  & .list_header {
    display: flex;
    list-style: none;
    line-height: 60px;
    //margin-left: 35px;
    justify-content: space-evenly;
    padding: 0px;
  }
  & li {
    padding: 8px;
  }
  & a {
    color: #ffff;
    text-decoration: none;
  }
  & .column3 {
    display: flex;
  }
  & .user_icon {
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid;
    margin-right: 15px;
    cursor: pointer;
  }
  & .user_icon:hover {
    border: hidden;
    color: #ffb416;
  }

  & .user_cart {
    color: #fff;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid;
    cursor: pointer;
  }
  & .user_cart:hover {
    border: hidden;
    color: #ffb416;
  }
  /* & .user_logout {
    color: #fff;
    width: 30px;
    height: 30px;
    padding: 20px;
    cursor: pointer;
    padding: 5px;
  } */
  & .user_logout:hover {
    border: hidden;
    color: #ffb416;
  }
  & .link:hover {
    color: #ffb416;
  }

  & .text_login {
    color: #fff;
  }
  & .text_login:hover {
    color: #ffb416;
  }
  & .admin {
    margin-right: 15px;
  }
  & .admin:hover {
    color: #ffb416;
  }
  & .customer {
    margin-right: 15px;
    color: #fff;
    font-size: 17px;
  }
  & .active {
    border-bottom: 6px solid #ffb416;
    padding: 5px 12px;
    transition: 1s;
  }
  & .active:hover {
    color: #fff;
  }
`;
