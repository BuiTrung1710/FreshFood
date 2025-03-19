import styled from "styled-components";
export const StyledContentProduct = styled.div`
  margin-bottom: 200px;
  .header-content--product {
    margin-top: 50px;
  }
  .link-home,
  .link-product {
    text-decoration: none;
  }
  .link-home {
    color: rgba(102, 102, 102, 0.7);
  }
  .link-home:hover {
    color: #000;
  }

  .link-product {
    color: #000;
    font-weight: 700;
  }
  .sidebar-content1 {
    width: 340px;
    height: 450px;
    border: 1px solid #61c5dc;
    border-radius: 8px;
    padding: 10px;
    margin-top: 40px;
  }
  .img-sidebar {
    width: 60px;
    height: 64px;
  }
  .text-sidebar1 {
    color: rgba(102, 102, 102, 0.7);
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
  .label-list--product{
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
  .list-product-child.selected{
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
  .product-1:hover {
    border: 1px solid #4ca85f;
  }
  .input-search {
    margin-top: 45px;
  }
  .MuiPagination-ul{
    justify-content: center;
    padding-top: 30px;
  }
`;
