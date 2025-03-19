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
import { useUser } from "../../../providers/user-provider";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { apiUpdateOrder } from "../../../services/order";


//Validate form
let orderEditSchema = object({
  order_status: string()
    .required("Yêu cầu chọn trạng thái đơn hàng!")
});
//1.Khi Người Dùng Gửi Biểu Mẫu: Khi người dùng gửi biểu mẫu (bằng cách nhấn nút submit), sự kiện onSubmit của biểu mẫu được kích hoạt.
//2.Gọi Hàm onSubmit: Hàm onSubmit được định nghĩa trong hook useFormik được gọi. Trong trường hợp này, đó là hàm onSubmitForm.
//3.Tham số values: Hàm onSubmitForm sẽ nhận tham số values. Trong Formik, tham số này chính là giá trị của các trường trong biểu mẫu. Cụ thể, giá trị này được lưu trữ trong đối tượng formik.values.

const OrderForm = (props) => {
  const { selectedOrder, onClosePopup, refreshOrders, handleSnackbarOpen } = props;
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);


  const onSubmitEditOrder = (values) => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      apiUpdateOrder(selectedOrder?.orderId, values)
        .then((res) => {
          setLoadingBackdrop(false);
          onClosePopup();
          refreshOrders();
          handleSnackbarOpen();
          //console.log("gtri edit", values);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false);
        });
    }, 700);
  };
 
  const onSubmitForm = (values) => {
    console.log("giá trị khi onSubmit:", values);
    if (selectedOrder?.orderId) {
      // Nếu có sản phẩm được chọn theo Id, gọi apiUpdateProduct
      onSubmitEditOrder(values);
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
      order_status: selectedOrder?.orderStatus,
    },
    //validate: validate,
    validationSchema: orderEditSchema ,
    onSubmit: onSubmitForm, //onSubmit: Xác định hàm sẽ được gọi khi biểu mẫu được gửi đi. Trong trường hợp này, đó là onSubmitForm
  });

  const formatOrderStatus = () => {
     const statusLabels = {
       "0": "pending",
       "1": "processing",
       "2": "shipped",
       "3": "delivered",
       "4": "cancelled",
       "5": "returned",
     };
    return ["0", "1", "2", "3", "4", "5"].map((status) => ({
      value: status,
      label: statusLabels[status],
    }));
  };


  return (
    <StyledOrderForm>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack spacing={2} component="form" onSubmit={formik.handleSubmit}>
        <Typography align="center">
          <h2 className="title_mockup">Update Order </h2>
        </Typography>
        <TextField
          label=" Order Status"
          name="order_status"
          select
          placeholder="Enter OderStatus "
          value={formik.values.order_status}
          onChange={formik.handleChange}
          error={!!formik.errors.order_status}
          helperText={formik.errors.order_status}
        >
          {formatOrderStatus().map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <AppButton type="submit">Submit</AppButton>
      </Stack>
    </StyledOrderForm>
  );
};

const StyledOrderForm = styled(Box)({
  padding: 32,
  ".title_mockup": {
    fontFamily: "'Dancing Script'",
    fontSize: 40,
    color: "#664d42",
  },
});

export default OrderForm;
