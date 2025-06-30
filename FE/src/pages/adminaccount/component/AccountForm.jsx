import {
  Backdrop,
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { object, string, number } from "yup";
import { AppButton } from "../../../components/AppButton/AppButton";
import { createAccount, editAccount } from "../../../services/account";
import { useUser } from "../../../providers/user-provider";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";


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

//Validate form
let accountCreateSchema = object({
  email: string().required("Yêu cầu nhập thông tin email!").email("Sai định dạng thông tin!"),
  username: string()
    .required("Yêu cầu nhập đầy đủ thông tin Username!")
    .test(
      "has-two-or-more-words-starting-with-capital",
      "Username cần phải có ít nhất hai từ và mỗi từ bắt đầu bằng một chữ cái in hoa!",
      hasTwoOrMoreWordsStartingWithCapital
    ),
  fullName: string().required("Yêu cầu nhập thông tin họ tên!"),
  password: string().required("Yêu cầu nhập thông tin mật khẩu!"),
  isAdmin: number(),
});
let accountEditSchema = object({
  email: string()
    .required("Yêu cầu nhập thông tin email!")
    .email("Sai định dạng thông tin!"),
  username: string()
    .required("Yêu cầu nhập đầy đủ thông tin Username")
    .test(
      "has-two-or-more-words-starting-with-capital",
      "Username cần phải có ít nhất hai từ và mỗi từ bắt đầu bằng một chữ cái in hoa!",
      hasTwoOrMoreWordsStartingWithCapital
    ),
  fullName: string().required("Yêu cầu nhập thông tin họ tên!"),
  isAdmin: number(),
});
//1.Khi Người Dùng Gửi Biểu Mẫu: Khi người dùng gửi biểu mẫu (bằng cách nhấn nút submit), sự kiện onSubmit của biểu mẫu được kích hoạt.
//2.Gọi Hàm onSubmit: Hàm onSubmit được định nghĩa trong hook useFormik được gọi. Trong trường hợp này, đó là hàm onSubmitForm.
//3.Tham số values: Hàm onSubmitForm sẽ nhận tham số values. Trong Formik, tham số này chính là giá trị của các trường trong biểu mẫu. Cụ thể, giá trị này được lưu trữ trong đối tượng formik.values.

const AccountForm = (props) => {
  const { selectedAccount, onClosePopup, refreshAccounts, handleSnackbarOpen } =
    props;
  const { user } = useUser();
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [showPassWord, setShowPassWord] = useState(false);
  const handleClickShowPassword = () =>{
    setShowPassWord(!showPassWord);
  }

  const onSubmitEditAccount = (values) => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      editAccount(selectedAccount?.accountId, values)
        .then((res) => {
          setLoadingBackdrop(false);
          onClosePopup();
          refreshAccounts();
          handleSnackbarOpen();
          //console.log("gtri edit", values);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 700);
  };
  //Nhận một đối số là values, đại diện cho dữ liệu của form.
  const onSubmitCreateAccount = (values) => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      createAccount(values)
        .then((res) => {
          setLoadingBackdrop(false);
          onClosePopup();
          refreshAccounts();
          handleSnackbarOpen();
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 700);
  };
  const onSubmitForm = (values) => {
    console.log("giá trị khi onSubmit:", values);
    if (selectedAccount?.accountId) {
      // Nếu có sản phẩm được chọn theo Id, gọi apiUpdateProduct
      onSubmitEditAccount(values);
    } else {
      // Nếu không có sản phẩm nào được chọn theo Id, gọi apiCreateProduct
      onSubmitCreateAccount(values);
    }
  };

  //Trong đối tượng formik, các thuộc tính quan trọng bao gồm:
  //values: Là một đối tượng chứa giá trị của các trường trong biểu mẫu. Đây chính là đối số được truyền vào hàm onSubmit khi bạn gửi biểu mẫu. (ở đây chính là tham số values trong hàm onSubmitForm)
  //errors: Là một đối tượng chứa thông tin về các lỗi của các trường. Các trường lỗi sẽ có cùng các key với values, và giá trị của mỗi key sẽ là thông báo lỗi tương ứng.
  //handleChange(): Là một hàm để xử lý sự kiện thay đổi giá trị của các trường. Nó sẽ cập nhật giá trị mới vào formik.values.
  //handleSubmit(): Là một hàm để xử lý sự kiện gửi biểu mẫu. Nó sẽ gọi hàm onSubmit mà bạn đã định nghĩa (ở đây là gọi đến thuộc tính onSubmit: onSubmitForm), và truyền vào đối tượng formik.values.
  //Các phương thức và thuộc tính khác để kiểm tra tính hợp lệ của dữ liệu và xử lý các sự kiện liên quan đến biểu mẫu.
  const formik = useFormik({
    //Định nghĩa giá trị ban đầu cho các trường của form.
    initialValues: {
      // Các giá trị này được lấy từ các thuộc tính của selectedAccount nếu selectedAccount tồn tại khi là form edit, nếu không, các trường sẽ có giá trị rỗng khi là form create.
      email: selectedAccount?.email || "",
      username: selectedAccount?.username || "",
      fullName: selectedAccount?.fullName || "",
      isAdmin:
        selectedAccount?.isAdmin !== undefined
          ? Number(selectedAccount.isAdmin)
          : 0,
    },
    //validate: validate,
    validationSchema: selectedAccount?.accountId
      ? accountEditSchema
      : accountCreateSchema,
    onSubmit: onSubmitForm, //onSubmit: Xác định hàm sẽ được gọi khi biểu mẫu được gửi đi. Trong trường hợp này, đó là onSubmitForm
  });
  //console.log("test isAdmin:",formik.initialValues.isAdmin);
  //console.log("test :", formik.initialValues);
  const formatIsAdmin = () => {
    return [0, 1].map((isAdmin) => ({
      value: isAdmin,
      label: isAdmin === 1 ? "Admin" : "Customer",
    }));
  };
  //console.log(formik.values, selectedAccount);

  return (
    <StyledProductForm>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
        <Typography align="center">
          {selectedAccount?.accountId ? (
            <h2 className="title_mockup">Update account </h2>
          ) : (
            <h2 className="title_mockup">Create new account</h2>
          )}
        </Typography>
        <TextField
          label="Email"
          name="email"
          placeholder="Enter Email "
          value={formik.values.email}
          onChange={formik.handleChange}
          error={!!formik.errors.email}
          helperText={formik.errors.email}
        />
        <TextField
          label="User Name "
          name="username"
          placeholder="Enter User name"
          value={formik.values.username}
          onChange={formik.handleChange}
          error={!!formik.errors.username}
          helperText={formik.errors.username}
        />
        <TextField
          label="Full Name "
          name="fullName"
          placeholder="Enter Full name"
          value={formik.values.fullName}
          onChange={formik.handleChange}
          error={!!formik.errors.fullName}
          helperText={formik.errors.fullName}
        />
        {!selectedAccount?.accountId && (
          <TextField
            label=" Password"
            name="password"
            placeholder="Enter Password "
            value={formik.values.password}
            onChange={formik.handleChange}
            type={showPassWord ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassWord ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={!!formik.errors.password}
            helperText={formik.errors.password}
          />
        )}

        {user?.isAdmin === 1 && (
          <TextField
            label=" Is Admin"
            name="isAdmin"
            select
            placeholder="Enter IsAdmin "
            value={formik.values.isAdmin}
            onChange={formik.handleChange}
            error={!!formik.errors.isAdmin}
            helperText={formik.errors.isAdmin}
          >
            {formatIsAdmin().map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )}
        {/* <TextField
          type="date"
          name="createDate"
          value={formik.values.createDate}
          //value={formik.values.createDate}
          onChange={formik.handleChange}
          error={!!formik.errors.createDate}
          helperText={formik.errors.createDate}
        /> */}

        <AppButton type="submit">Submit</AppButton>
      </Stack>
    </StyledProductForm>
  );
};

const StyledProductForm = styled(Box)({
  padding: 32,
  ".title_mockup": {
    fontFamily: "'Dancing Script'",
    fontSize: 40,
    color: "#664d42",
  },
});

export default AccountForm;
