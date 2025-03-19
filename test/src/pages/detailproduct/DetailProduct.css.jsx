import styled from "styled-components";

export const StyledDetailProduct = styled.div`
  height: 100vh;
  .trang_detail {
    height: 100%;
  }
  .breadcrumbs {
    margin-top: 30px;
    background-color: #ebebeb;
    width: 100%;
    padding: 10px;
    margin-bottom: 50px;
  }
  .container_productdetail {
    margin-top: 50px;
    margin-bottom: auto;
    padding-bottom: 200px;
  }
  .link_breadcrums {
    text-decoration: none;
    color: #dc8068;
  }
  .link_breadcrums:hover {
    color: #b4462a;
  }
  .img_productdetail {
    width: 326px;
    height: 540px;
    padding: 0 66px;
  }
  .info_productdetail {
    width: 653px;
    height: 320px;
    padding: 0 15px;
  }
  .add_yourcart {
    width: fit-content;
    background-color: #5c4543;
    color: #fff;
    margin-top: 20px;
  }
  .add_yourcart:hover {
    background-color: #3d2e2d;
  }
  .icon_cart {
    width: 16px;
    height: 16px;
    margin-top: 5px;
  }
  .buy_now {
    width: fit-content;
    background-color: #dc8068;
    color: #fff;
    margin-top: 20px;
  }
  .buy_now:hover {
    background-color: #b4462a;
  }
  .name_productdetail {
    font-size: 25px;
    font-weight: 400;
    text-transform: none;
    margin-top: 0px;
  }
  .description_productdetail {
    color: #838c8c;
    font-size: 15px;
  }
  .price_productdetail {
    font-size: 30px;
    //line-height: 48px;
    font-weight: 400;
  }
  .label_quantity {
    font-weight: 700;
    margin-bottom: 10px;
  }
  .block_quantity {
    padding: 15px 0;
    border-bottom: 1px solid #333333;
    width: fit-content;
  }
  .quantity {
    padding: 0 20px 20px 20px;
  }
  .info {
    font-weight: 600;
    color: black;
  }
  .link_active {
    color: #000000;
    font-weight: 600;
    font-size: 20px;
  }

  .link_inactive {
    color: #838c8c;
  }
  .breadcrum_detail {
    border-bottom: 1px solid #838c8c;
    padding-bottom: 10px;
    width: 100%;
  }
  .css_description_productdetail {
    padding-top: 10px;
  }
  .block_total {
    display: flex;
  }
  .label_total {
    font-weight: 700;
    color: black;
    margin-right: 5px;
  }
  .img1,
  .img2 {
    width: 100px;
    height: 100px;
  }
  .sidebar-content2 {
    margin-top: 40px;
    border: 1px solid rgba(231, 229, 229, 0.7);
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .list-product {
    background-color: #4ca85f;
    text-align: center;
    color: #ffff;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }
  .label-list--product {
    font-family: "Dancing Script";
    font-size: 25px;
  }
  .list-product-child {
    border-top: 1px solid rgba(231, 229, 229, 0.7);
    padding: 12px;
    text-align: center;
    margin-top: auto;
    margin-bottom: auto;
  }
  .list-product-child.selected {
    background-color: #ffb416;
  }
  .text-sidebar2 {
    text-decoration: none;
    color: #403f3f;
  }
  .text-sidebar2:hover {
    color: #000;
  }
  .text-sidebar2.selected {
    color: #fff;
  }
  .block_newProducts {
    border: 1px solid #afbaba;
    margin-left: 85px;
  }
  .block_newProducts::before {
    content: "Sản phẩm mới";
    width: 200px;
    height: 40px;
    background-color: #5c4543;
    color: #fff;
    font-family: "Dancing Script";
    font-size: 30px;
    text-align: center;
    margin-top: -20px;
    margin-left: 66px;
    border-radius: 50px;
  }
  .block_newProducts:hover::before {
    background-color: #dc8068;
  }
  .img_product {
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .productName-productTop:hover {
    color: #b4462a;
    cursor: pointer;
  }
  .info_danhgia {
    margin-right: auto;
  }
  .title_expDate{
    font-weight: 600;
    font-size: 20px
  }
`;
