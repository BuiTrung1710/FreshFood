import { useEffect, useState } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { object, string } from "yup";
import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { login } from "../../services/account";
import { useUser } from "../../providers/user-provider";
import { AppButton } from "../../components/AppButton/AppButton";

let loginSchema = object({
  email: string().required("Yêu cầu nhập thông tin email!").email("Sai định dạng thông tin!"),
  password: string().required("Yêu cầu nhập thông tin mật khẩu!"),
});
const FormLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [loadingBackdrop, setLoadingBackdrop] = useState(false); // Thêm state loadingBackdrop

  //Mở snackbar
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };
  //Đóng snackbar
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  useEffect(() => {
    if (snackbarOpen) {
      if (statusType === "success") {
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    }
  }, [snackbarOpen, statusType]);
  //
  const onSubmitLogin = (values) => {
    setLoadingBackdrop(true); // Bắt đầu loading
    setTimeout(() => {
      login(values)
        .then((res) => {
          console.log("login:",res);
          setStatusType("success");
          handleSnackBarOpen(); // Khi đăng nhập thành công, mở snackbar
          setUser(res.data?.data);
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          console.log(err);
          setStatusType("error");
          handleSnackBarOpen(); // Khi đăng nhập thất bại, mở snackbar
          formik.setErrors({ root: err?.response?.data?.msg });
          setLoadingBackdrop(false);
        });
    }, 2000);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validate: validate,
    validationSchema: loginSchema,
    onSubmit: onSubmitLogin,
    // initialTouched: {
    //   username: true,
    // },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <StyledLogin>
      {/*Alert */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // Thời gian tự động đóng sau 3 giây (hoặc bạn có thể điều chỉnh theo mong muốn)
        onClose={handleSnackBarClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackBarClose}
          severity={statusType}
        >
          {statusType === "success"
            ? "Đăng nhập thành công!"
            : "Đăng nhập thất bại"}
        </MuiAlert>
      </Snackbar>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack direction="column" className="login_form">
        {/*Header */}
        <Header />
        {/*BreadCrumbs */}
        <Container style={{ maxWidth: 1300, marginTop: 50 }}>
          <Breadcrumbs aria-label="breadcrumb" className="breadcrumbs">
            <Link
              underline="hover"
              color="inherit"
              to="/"
              className="link_breadcrums"
            >
              TRANG CHỦ
            </Link>
            <Typography color="text.primary">LOGIN</Typography>
          </Breadcrumbs>
        </Container>

        {/*FormLogin */}
        <Container maxWidth="sm" className="container_login">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography className="form_title">Login</Typography>
              <TextField
                className="text_field"
                placeholder="Press email"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                autoComplete="off"
              />

              <TextField
                className="text_field"
                placeholder="Press password"
                label="Password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                error={!!formik.errors.password}
                helperText={formik.errors.password}
              />
              {formik.errors.root && (
                <Typography className="error_text">
                  {formik.errors.root}
                </Typography>
              )}
              <AppButton type="submit" className="btn_submit">
                Submit
              </AppButton>
              <Typography>
                Bạn chưa có tài khoản?
                <Link to="/FormSignUp" style={{ textDecoration: 0 }}>
                  <span className="signup_now">Signup now</span>
                </Link>
              </Typography>
            </Stack>
          </form>
        </Container>
        {/*Footer */}
        <Footer className="footer_login" />
      </Stack>
    </StyledLogin>
  );
};
const StyledLogin = styled.div`
  height: 100vh;
  .login_form {
    height: 100%;
  }
  .container_login {
    margin-bottom: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    padding-bottom: 200px;
  }
  .breadcrumbs {
    background-color: #ebebeb;
    width: 100%;
    padding: 10px;
  }
  .link_breadcrums {
    text-decoration: none;
    color: #dc8068;
  }
  .link_breadcrums:hover {
    color: #b4462a;
  }
  .login_form {
    width: 100%;
    border: 0px solid;
    border-radius: 20px;
  }
  .form_title {
    text-align: center;
    font-size: 80px;
    font-family: "Dancing Script";
    font-weight: 600;
    color: #664d42;
  }
  .text_field {
    width: 500px;
  }
  .btn_submit {
    background-color: #dc8068;
    border-radius: 0%;
    padding: 12px;
    color: #fff;
  }
  .btn_submit:hover {
    background-color: #b4462a;
  }
  .signup_now {
    color: #664d42;
    margin-left: 5px;
  }
  .signup_now:hover {
    color: #b4462a;
    cursor: pointer;
  }
  .error_text {
    color: red;
  }
`;
export default FormLogin;
