import {
  Container,
  Grid,
  Hidden,
  Badge,
  MenuItem,
  IconButton,
  MenuList,
  Avatar,
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StyledHeader } from "./Header.css";
import ImageLogo from "../imgg/imgLogo";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineShoppingCart, MdLogout } from "react-icons/md";
import Popover from "@mui/material/Popover";
import { useUser } from "../../providers/user-provider";
import { logout } from "../../services/account";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import CartPopOver from "../Cart/CartPopOver";
import { deepOrange, deepPurple } from "@mui/material/colors";

const Header = (props) => {
  const navigate = useNavigate();
  const location = useLocation(); //Để lấy ra vị trí hiện tại của ứng dụng
  const cart = useSelector((state) => state?.cart?.cart) || [];
  //console.log("cart:", cart);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const { user, setUser } = useUser();
  const navRef = useRef(0);
  const [visible, setVisible] = useState(true);
  //Call Api Logout
  const onClickLogOut = () => {
    logout()
      .then((res) => {
        setUser();
        navigate("/");
      })
      .catch((err) => console.log(err));
  };
  //Function chuyển trang admin
  const onClickNextToPageAdmin = () => {
    navigate("/admin");
    window.scrollTo({
      top: 0,
    });
  };
  //Function chuyển trang home
  const handleScrollToTopHome = () => {
    navigate("/");
    window.scrollTo({
      top: 0,
    });
  };
  //Function chuyển trang product
  const handleScrollToTopProduct = () => {
    navigate("/product");
    window.scrollTo({
      top: 0,
    });
  };
  //Function chuyển trang login
  const handleScrollToTopLogin = () => {
    navigate("/FormLogin");
    window.scrollTo({
      top: 0,
    });
  };
  //Funciton hiển thị cart, và mở PopOver
  const onClickCart = (event) => {
    setShowCart(true);
    //"event.currentTarget" xác định phần tử Popover sẽ "gắn" vào và hiển thị từ đó. Điều này giúp xác định vị trí và hướng của Popover trên giao diện người dùng.
    //Trong trường hợp này khi click vào icon giỏ hàng sẽ kích hoạt onClickCart và truyền event?.currentTarget vào setAnchorEl
    //và ở Popover sẽ có thuộc tính anchorEl = {anChorEl} giúp Popover hiển thị xung quanh icon Cart  với hướng và vị trí được xác định bởi anchorOrigin và transformOrigin.
    setAnchorEl(event?.currentTarget);
  };
  const onCloseCart = () => {
    setShowCart(false);
  };

  const openUserAnchorEl = Boolean(anchorElUser);

  const handleClickOpenUserAnchorEl = (event) => {
    setAnchorElUser(event?.currentTarget);
  };

  const handleCloseUserAnchorEl = () => {
    setAnchorElUser(null);
  };

  const stringAvatar = (username) => {
    if (!username) return { firstUpperCase: "", lastUpperCase: "" }; // Kiểm tra xem username có tồn tại không
    let firstUpperCase = null;
    let lastUpperCase = null;

    // Kiểm tra xem username có nhiều hơn một từ không
    const words = username.trim().split(/\s+/);

    if (words.length > 1) {
      // Nếu username có nhiều hơn một từ, thực hiện logic để lấy ký tự in hoa đầu và cuối cùng
      for (let i = 0; i < username.length; i++) {
        const char = username[i];
        if (char === char.toUpperCase() && char !== char.toLowerCase()) {
          if (firstUpperCase === null) {
            firstUpperCase = char;
          }
          lastUpperCase = char;
        }
      }
    }

    return { firstUpperCase, lastUpperCase };
  };
  const { firstUpperCase, lastUpperCase } = stringAvatar(user?.username || ""); // Thêm || '' để đảm bảo username luôn là một chuỗi

  const avatarText =
    firstUpperCase && lastUpperCase ? `${firstUpperCase}${lastUpperCase}` : "";

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop; //Lấy ra vị trí scrol hiện tại của trang
      if (scrollTop === 0) {
        return; // Trả về ngay lập tức nếu vị trí scroll là 0 (đầu trang)
      }
      const isScrollUp = scrollTop < navRef.current;

      setVisible(isScrollUp);
      navRef.current = scrollTop; //thực hiện gán giá trị của vị trí scroll hiện tại để so sánh đợt scroll sau.
    };

    document.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onClickNexToInfoOderPage = () =>{
    navigate("/info-order");
    window.scrollTo(({
      top: 0,
    }))
  }

  return (
    <StyledHeader className={visible ? "block" : "hidden"}>
      <Container className="container_header">
        <Grid container spacing={2} className="header">
          <Hidden mdDown>
            <Grid item xs={5} className="column1">
              <ul className="list_header">
                <li>
                  <Link
                    onClick={handleScrollToTopHome}
                    className={`link ${
                      location.pathname === "/" ? "active" : ""
                    }`}
                  >
                    Trang chủ
                  </Link>
                </li>
                <li>
                  <Link className="link">Giới thiệu</Link>
                </li>
                <li>
                  <Link
                    onClick={handleScrollToTopProduct}
                    className={`link ${
                      location.pathname.indexOf("/product") > -1 ? "active" : ""
                    }`}
                  >
                    Sản phẩm
                  </Link>
                </li>
                <li>
                  <Link className="link">Tin tức</Link>
                </li>
                <li>
                  <Link className="link">Liên hệ</Link>
                </li>
              </ul>
            </Grid>
          </Hidden>

          <Grid item xs={2} className="column2">
            <ImageLogo className="logo_header" />
          </Grid>
          <Hidden mdDown>
            <Grid container item xs={5} className="column3">
              <Grid
                xs={5}
                item
                alignItems="center"
                marginLeft="auto"
                marginRight="auto"
                marginTop="5px"
                container
              >
                {/* Nếu như user =1 tức là admin thì sẽ hiện link admin */}
                {user?.isAdmin === 1 ? (
                  <>
                    <IconButton
                      className="customer"
                      id="basic-button"
                      aria-controls={
                        openUserAnchorEl ? "basic-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={openUserAnchorEl ? "true" : undefined}
                      onClick={handleClickOpenUserAnchorEl}
                    >
                      <StyledBadgeAvatar
                        overlap="circular"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>
                          {avatarText}
                        </Avatar>
                      </StyledBadgeAvatar>
                    </IconButton>
                    {/* Popover for the menu */}
                    <Popover
                      id="basic-menu"
                      anchorEl={anchorElUser}
                      open={openUserAnchorEl}
                      onClose={handleCloseUserAnchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <MenuList>
                        <MenuItem onClick={onClickNexToInfoOderPage}>
                          My Order
                        </MenuItem>
                        <MenuItem onClick={onClickNextToPageAdmin}>
                          Trang Quản Lý
                        </MenuItem>
                        <MenuItem onClick={onClickLogOut}>
                          Logout
                          <MdLogout
                            className="user_logout"
                            style={{ padding: 4 }}
                          />
                        </MenuItem>
                      </MenuList>
                    </Popover>
                    <IconButton onClick={onClickCart}>
                      <StyledBadge
                        badgeContent={cart?.length}
                        color="secondary"
                      >
                        <MdOutlineShoppingCart className="user_cart" />
                      </StyledBadge>
                    </IconButton>

                    <Popover
                      open={showCart}
                      anchorEl={anchorEl}
                      onClose={onCloseCart}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <CartPopOver />
                    </Popover>
                  </>
                ) : (
                  <>
                    {user?.isAdmin === 0 && (
                      <>
                        {/* Button "customer" */}
                        <IconButton
                          className="customer"
                          id="basic-button"
                          aria-controls={
                            openUserAnchorEl ? "basic-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={openUserAnchorEl ? "true" : undefined}
                          onClick={handleClickOpenUserAnchorEl}
                        >
                          <StyledBadgeAvatar
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            variant="dot"
                          >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>
                              {avatarText}
                            </Avatar>
                          </StyledBadgeAvatar>
                        </IconButton>

                        {/* Popover for the menu */}
                        <Popover
                          id="basic-menu"
                          anchorEl={anchorElUser}
                          open={openUserAnchorEl}
                          onClose={handleCloseUserAnchorEl}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <MenuList>
                            <MenuItem onClick={handleCloseUserAnchorEl}>
                              Profile
                            </MenuItem>
                            <MenuItem onClick={onClickNexToInfoOderPage}>
                              My Order
                            </MenuItem>
                            <MenuItem onClick={onClickLogOut}>
                              Logout
                              <MdLogout
                                className="user_logout"
                                style={{ padding: 4 }}
                              />
                            </MenuItem>
                          </MenuList>
                        </Popover>
                      </>
                    )}
                  </>
                )}
                {/* Nếu user chưa đăng nhập: TH1 nếu đúng chưa login thì sẽ hiện icon user và icon giỏ hàng */}
                {/*TH2: nếu sai kiểm tra xem user có phải admin (=1) không nếu là admin sẽ hiện thêm icon logout, còn user là tài khoản khách hàng(=0) thì hiện icon giỏ hàng và icon logout */}
                {!user ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <AiOutlineUser
                      className="user_icon"
                      onClick={handleScrollToTopLogin}
                    />
                    <IconButton onClick={onClickCart}>
                      <StyledBadge
                        badgeContent={cart?.length}
                        color="secondary"
                      >
                        <MdOutlineShoppingCart className="user_cart" />
                      </StyledBadge>
                    </IconButton>

                    <Popover
                      open={showCart}
                      anchorEl={anchorEl}
                      onClose={onCloseCart}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                    >
                      <CartPopOver />
                    </Popover>
                  </div>
                ) : (
                  <>
                    {user?.isAdmin === 0 && (
                      <>
                        <IconButton onClick={onClickCart}>
                          <StyledBadge
                            badgeContent={cart?.length}
                            color="secondary"
                          >
                            <MdOutlineShoppingCart className="user_cart" />
                          </StyledBadge>
                        </IconButton>

                        <Popover
                          open={showCart}
                          anchorEl={anchorEl}
                          onClose={onCloseCart}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <CartPopOver />
                        </Popover>
                      </>
                    )}
                  </>
                )}
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </Container>
    </StyledHeader>
  );
};
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 5,
    top: 2,
    backgroundColor: "#fff",
    padding: "0 4px",
    fontWeight: 600,
    color: "var(--app-color)",
  },
}));
const StyledBadgeAvatar = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#71de32",
    color: "#44b700",
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default Header;
