import { Stack, styled } from "@mui/material";
export const StyledFooter = styled(Stack)`
  background-color: #3ba66b;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid gray;
  & .container_footer {
    padding: 0px;
    max-width: 1320px;
  }
  & .footer_column1 {
    flex: 1;
    align-items: start;
    margin-left: 15px;
    color: #ffff;
  }

  & .info_1 {
    text-align: center;
  }

  & .phone {
    margin-right: 37px;
  }

  & .footer_column2,
  & .footer_column3,
  & .footer_column4 {
    flex: 1; /* Chia đều không gian cho các cột còn lại */
    margin-left: 20px; /* Để có khoảng cách giữa các cột */
    margin-top: 30px;
    color: #ffff;
  }

  & .shop {
    font-weight: 600;
    font-size: 20px;
  }

  & .icon_shop,
  & .icon2,
  & .icon3 {
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 5px;
  }

  & .container_email {
    position: relative;
  }
  & .field_email {
    background-color: #ffff;
    padding: 10px;
    border-radius: 20px;
    border: 0px solid;
    width: 250px;
  }
  & .subcribe {
    display: inline;
    padding: 0 20px;
    border-radius: 0;
    background-color: #ffb416;
    margin-left: 0px;
    color: #fff;
    border: solid 1px #ffb416;
    position: absolute;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    height: 34px;
    margin-left: -98px;
    margin-top: 0.5px;
  }
  & .btn_dki {
    height: 33px;
    padding: 0;
    width: max-content;
    border: none;
    color: #fff;
  }
`;
