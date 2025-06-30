import styled from "styled-components";
import {
  Backdrop,
  Breadcrumbs,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import EmailIcon from "@mui/icons-material/Email";
import CreateIcon from "@mui/icons-material/Create";
import { useFormik } from "formik";
import { object, string } from "yup";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { signup } from "../../services/account";
import { useEffect, useState } from "react";


const hasTwoOrMoreWordsStartingWithCapital = (value) => {
  const words = value.trim().split(/\s+/);
  if (words.length < 2) {
    return false; // Không đủ từ
  }
  for (const word of words) {
    if (!/^[A-Z][a-z]*$/.test(word)) {
      return false; // Một hoặc nhiều từ không bắt đầu bằng chữ cái in hoa
    }
  }
  return true; // Đủ từ và mỗi từ bắt đầu bằng chữ cái in hoa
};

let signupSchema = object({
  username: string()
    .required("Yêu cầu nhập đầy đủ thông tin Username")
    .test(
      "has-two-or-more-words-starting-with-capital",
      "Username cần phải có ít nhất hai từ và mỗi từ bắt đầu bằng một chữ cái in hoa!",
      hasTwoOrMoreWordsStartingWithCapital
    ),
  email: string().required("Yêu cầu nhập thông tin email!").email("Sai định dạng thông tin!"),
  fullName: string().required("Yêu cầu nhập thông tin họ tên!"),
  password: string().required("Yêu cầu nhập mật khẩu!"),
});

const FormSignup = ({ onSignupSuccess }) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [statusType, setStatusType] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loadingBackdrop, setLoadingBackdrop] = useState(false); // Thêm state loadingBackdrop
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  //Mở Snackbar:
  const handleSnackBarOpen = () => {
    setSnackBarOpen(true);
  };
  //Đóng Snackbar:
  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };
  useEffect(() => {
    if (snackbarOpen) {
      if (statusType === "success") {
        setTimeout(() => {
          navigate("/FormLogin");
        }, 1000);
      }
    }
  }, [snackbarOpen, statusType]);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      fullName: "",
      password: "",
      //createDate: "",
    },
    validationSchema: signupSchema,
    onSubmit: (values) => {
      console.log(values);
      setLoadingBackdrop(true); // Bắt đầu loading
      setTimeout(()=>{
        //gọi APi
        signup(values)
          .then((res) => {
            console.log(res);
            //onSignupSuccess();
            setStatusType("success");
            handleSnackBarOpen(); //Khi đăng ký thành công sẽ mở snackbar
            setLoadingBackdrop(false);
          })
          .catch((err) => {
            setStatusType("error");
            handleSnackBarOpen(); //Khi đăng ký thất bại sẽ mở snackbar
            formik.setErrors({ root: err?.response?.data?.message });
            setLoadingBackdrop(false);
          });
      },2000)
      
    },
  });

  return (
    <StyledFormSignup>
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
            ? "Đăng ký thành công!"
            : "Đăng ký thất bại"}
        </MuiAlert>
      </Snackbar>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Stack direction="column" className="signup_form">
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
            <Link
              underline="hover"
              color="inherit"
              to="/FormLogin"
              className="link_breadcrums"
            >
              LOGIN
            </Link>
            <Typography color="text.primary">SIGNUP</Typography>
          </Breadcrumbs>
        </Container>

        {/*FormSingUp */}
        <Container maxWidth="sm" className="container_signup">
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={2}>
              <Typography className="form_title">SignUp</Typography>
              <TextField
                className="text_field"
                placeholder="Press username"
                label="Username"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                error={!!formik.errors.username}
                helperText={formik.errors.username}
                autoComplete="off"
              />
              <TextField
                className="text_field"
                placeholder="Press email"
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={!!formik.errors.email}
                helperText={formik.errors.email}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="text_field"
                placeholder="Press fullname"
                label="Fullname"
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={!!formik.errors.fullName}
                helperText={formik.errors.fullName}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <CreateIcon />
                    </InputAdornment>
                  ),
                }}
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
              <Button type="submit" className="btn_submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Container>
        {/*Footer */}
        <Footer className="footer_login" />
      </Stack>
    </StyledFormSignup>
  );
};
const StyledFormSignup = styled.div`
  height: 100vh;
  .signup_form {
    height: 100%;
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
  .container_signup {
    margin-bottom: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 60px;
    padding-bottom: 200px;
  }
  .signup_form {
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
  .error_text {
    color: red;
  }
`;
export default FormSignup;
