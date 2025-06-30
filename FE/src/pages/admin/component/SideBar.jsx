import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
const SideBar = ({setCurrentPage }) => {
  const [activepage, setActivePage] = useState(1);
  const handelCurrentPage = (values) => {
    setCurrentPage(values);
    setActivePage(values);
  };
  return (
    <StyledSideBar>
      <Stack direction="column" className="sidebar">
        <h2 className="title_sidebar">Quản lý FreshMart</h2>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
              onClick={() => handelCurrentPage(1)}
              className={`${activepage === 1 ? "active" : ""}`}
            >
              <ListItemText primary="Quản lý Tài Khoản" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handelCurrentPage(2)}
              className={`${activepage === 2 ? "active" : ""}`}
            >
              <ListItemText primary="Quản lý Sản Phẩm" />
            </ListItemButton>
            <ListItemButton
              onClick={() => handelCurrentPage(3)}
              className={`${activepage === 3 ? "active" : ""}`}
            >
              <ListItemText primary="Quản lý Đơn Hàng" />
            </ListItemButton>
          </List>
        </Box>
        <div className="footer_Sidebar">
          <Typography className="text_footer_sidebar">
            Copyrights © 2023 -<span className="footer_color">Whole Foods</span>
            , All Rights Reserved.
          </Typography>
        </div>
      </Stack>
    </StyledSideBar>
  );
};
const StyledSideBar = styled.div`
  color: #fff;
  //width: 359px;
  height: 100%;
  .title_sidebar {
    border-bottom: 1px solid white;
    padding-bottom: 20px;
    font-family: "Dancing Script";
    font-size: 30px;
  }
  .sidebar {
    background-color: #3ba66b;
    text-align: center;

    border: 1px solid #fff;
  }
  .MuiButtonBase-root {
    text-align: center;
    border: 1px solid;
  }
  .MuiButtonBase-root:hover {
    background-color: #ffb416;
  }
  .footer_Sidebar {
    border-top: 1px solid #fff;
  }
  .text_footer_sidebar {
    margin-top: 30px;
  }
  .footer_color {
    color: #ffb416;
  }
  .active {
    background-color: #ffb416;
  }
`;
export default SideBar;
