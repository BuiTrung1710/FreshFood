import { Stack} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { MdHome,MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/account";
import { useUser } from "../../../providers/user-provider";
const Header = () => {
  const navigate = useNavigate();
  const {setUser} = useUser();
    const onClickLogOut = () => {
      logout()
        .then((res) => {
          setUser();
          navigate("/FormLogin");
        })
        .catch((err) => console.log(err));
    };
  return (
    <StyledHeaderAdmin>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center" // Thêm dòng này để căn giữa các thành phần trong Stack
      >
        <Stack direction="row" className="stack1" justifyContent="center">
          <MdHome className="icon" onClick={() => navigate("/")} />
          <Link className="link1" to="/">
            Trang chủ
          </Link>
        </Stack>

        <Stack direction="row" className="stack2" justifyContent="center">
          <Link onClick={onClickLogOut} className="link2">
            Logout
          </Link>
          {/* <MdLogout className="icon" onClick={onClickLogOut}/> */}
        </Stack>
      </Stack>
    </StyledHeaderAdmin>
  );
};
const StyledHeaderAdmin = styled.div`
  background-color: #3ba66b;
  height: 75px;
  border: 1px solid #fff;

  .stack1 {
    width: 200px;
  }
  .link1, .link2 {
    text-decoration: none;
    color: #fff;
    font-size: 17px;
    line-height: 75px;
  }
  .link1:hover, .link2:hover {
    color: #ffb416;
  }
  .icon {
    width: 20px;
    height: 20px;
    color: #fff;
    height: auto;
  }
  .icon:hover {
    color: #ffb416;
  }
  .stack2 {
    width: 300px;
  }
  .link2{
    padding-right: 5px
  }
  
`;
export default Header;
