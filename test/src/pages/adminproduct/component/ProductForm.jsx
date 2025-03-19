import {
  Backdrop,
  Box,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { useFormik } from "formik";
import { date, object, string, number } from "yup";
import { useEffect, useState } from "react";
import {
  apiCreateProduct,
  apiGetProductCategories,
  apiUpdateProduct,
} from "../../../services/product";
import { formatImg } from "../../../utils/imgHelpers";
import { AppButton } from "../../../components/AppButton/AppButton";
import { formatDateForInput } from "../../../utils/stringHelpers";
import * as yup from "yup";

//Validate form
let productSchema = object({
  productName: string().required("Yêu cầu điền đầy đủ thông tin tên sản phẩm!"),
  productPrice: number().required(
    "Yêu cầu điền đầy đủ thông tin giá sản phẩm!"
  ),
  productInfo: string(),
  productImage: string(),
  categoryId: string(),
  stock_quantity:number().required(),
  createDate: date().required("Yêu cầu chọn ngày tạo sản phẩm!"),
  //Sử dụng yup.ref("createDate") sẽ truy cập giá trị của trường createDate và so sánh nó với giá trị của trường exp_date.
  exp_date: date()
    .required("Yêu cầu chọn ngày hết hạn sản phẩm!")
    .min(
      yup.ref("createDate"),
      "Ngày hết hạn sản phẩm không được nhỏ hơn ngày tạo sản phẩm!"
    ),
});

const ProductForm = (props) => {
  const { selectedProduct, onClosePopup, refreshProducts, handleSnackbarOpen } =
    props;
  const [categories, setCategories] = useState([]);
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);

  //Call Api edit
  const onSubmitEditProduct = (values) => {
    setLoadingBackdrop(true);
    setTimeout(() => {
      apiUpdateProduct(selectedProduct?.productId, values)
        .then((res) => {
          onClosePopup();
          refreshProducts();
          handleSnackbarOpen();
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          setLoadingBackdrop(false);
          console.log(err);
        });
    }, 700);
  };
  //Nhận một đối số là values, đại diện cho dữ liệu của form.
  const onSubmitCreateProduct = (values) => {
    //nếu trong apiCreate không có {
    //     headers: {"Content-Type":"multipart/form-data"},
    //}); thì sẽ phải dùng formData
    //Tạo một đối tượng FormData mới để chứa dữ liệu form.
    //  const formData = new FormData();
    //  //Sử dụng phương thức append của FormData để thêm các trường dữ liệu vào đối tượng này.
    //  formData.append("productName", values.productName);
    //  formData.append("productPrice", values.productPrice);
    //  formData.append("productInfo", values.productInfo);
    //  formData.append("ratingStar", values.ratingStar);
    //  formData.append("productImage", values.productImage);
    //  formData.append("categoryId", values.categoryId);
    setLoadingBackdrop(true);
    setTimeout(() => {
      apiCreateProduct(values)
        .then((res) => {
          onClosePopup();
          refreshProducts();
          handleSnackbarOpen();
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          setLoadingBackdrop(false);
          console.log(err);
        });
    }, 700);
  };
  const onSubmitForm = (values) => {
    if (selectedProduct?.productId) {
      // Nếu có sản phẩm được chọn, gọi apiUpdateProduct
      onSubmitEditProduct(values);
    } else {
      // Nếu không có sản phẩm nào được chọn, gọi apiCreateProduct
      onSubmitCreateProduct(values);
    }
  };

  const formik = useFormik({
    //định nghĩa giá trị ban đầu cho các trường của form.
    initialValues: {
      //sử dụng dữ liệu từ selectedProduct, nếu có, hoặc là chuỗi rỗng nếu không có sản phẩm nào được chọn.
      //VD: khi click vào edit thì sẽ lấy ra được dữ liệu của sản phẩm (productName, productPrice,...) được chọn thông qua selectedProduct
      //Còn khi click vào nút "Thêm mới", không có sản phẩm nào được chọn trước đó, và form sẽ được khởi tạo với giá trị trống
      productName: selectedProduct?.productName || "",
      productPrice: selectedProduct?.productPrice || "",
      productInfo: selectedProduct?.productInfo || "",
      ratingStar: selectedProduct?.ratingStar || "",
      productImage: selectedProduct?.productImage || "",
      categoryId:
        selectedProduct?.categoryId !== 1 ? selectedProduct?.categoryId : "",
      stock_quantity: selectedProduct?.stock_quantity || "",
      createDate: selectedProduct?.createDate
        ? formatDateForInput(selectedProduct?.createDate)
        : "",
      exp_date: selectedProduct?.exp_date
        ? formatDateForInput(selectedProduct?.exp_date)
        : "",
    },
    // validate: validate,
    validationSchema: productSchema,
    onSubmit: onSubmitForm,
  });

  useEffect(() => {
    let productImg = document.getElementById("product-img-preview");
    productImg.setAttribute("src", formatImg(formik.values.productImage));
  }, []);

  //Call api lấy ra category:
  useEffect(() => {
    apiGetProductCategories()
      .then((res) => setCategories(res.data?.data || []))
      //.then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  const formatCategories = () => {
    const filteredCategories = categories.filter(
      (category) => category.categoryId !== 1
    );
    return filteredCategories.map((category) => ({
      value: category.categoryId,
      label: category.categoryName,
    }));
  };

  console.log("abc:", formik.values.categoryId);

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
          {selectedProduct?.productId ? (
            <h2 className="title_mockup">Update product </h2>
          ) : (
            <h2 className="title_mockup">Create new product</h2>
          )}
        </Typography>
        <TextField
          label="Product name"
          name="productName"
          placeholder="Enter product name"
          value={formik.values.productName}
          onChange={formik.handleChange}
          error={!!formik.errors.productName}
          helperText={formik.errors.productName}
        />
        <TextField
          label="Product price"
          name="productPrice"
          placeholder="Enter product price"
          value={formik.values.productPrice}
          onChange={formik.handleChange}
          error={!!formik.errors.productPrice}
          helperText={formik.errors.productPrice}
        />
        <TextField
          label="Product infor"
          name="productInfo"
          placeholder="Enter product infor"
          value={formik.values.productInfo}
          onChange={formik.handleChange}
          error={!!formik.errors.productInfo}
          helperText={formik.errors.productInfo}
        />

        <label className="product_img" htmlFor="product-img">
          <img alt="img" id="product-img-preview" />
        </label>

        <input
          type="file"
          id="product-img"
          onChange={(e) => {
            var reader = new FileReader();
            reader.onload = function (e) {
              let productImg = document.getElementById("product-img-preview");
              console.log(e.target.result);
              productImg.setAttribute("src", e.target.result);
            };

            reader.readAsDataURL(e.target?.files[0]);
            formik.setFieldValue("productImage", e.target?.files[0]);
          }}
        />
        <TextField
          label="CategoryName"
          name="categoryId"
          placeholder="Enter categoryName"
          select
          value={formik.values.categoryId}
          onChange={formik.handleChange}
          error={!!formik.errors.categoryId}
          helperText={formik.errors.categoryId}
        >
          {formatCategories().map((category, index) => (
            <MenuItem key={index} value={category.value}>
              {category.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Stock Quantity"
          name="stock_quantity"
          placeholder="Enter stock quantity"
          value={formik.values.stock_quantity}
          onChange={formik.handleChange}
          error={!!formik.errors.stock_quantity}
          helperText={formik.errors.stock_quantity}
        />
        {/*TextField của MUI yêu cầu định dạng "YYYY-MM-DD". Khi không format đúng dạng sẽ không tương thích và không lấy ra được giá trị. */}
        <TextField
          type="date"
          label="Create Date"
          name="createDate"
          value={formik.values.createDate}
          onChange={formik.handleChange}
          error={!!formik.errors.createDate}
          helperText={formik.errors.createDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          type="date"
          label="Exp Date"
          name="exp_date"
          value={formik.values.exp_date}
          onChange={formik.handleChange}
          error={!!formik.errors.exp_date}
          helperText={formik.errors.exp_date}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <AppButton type="submit">Submit</AppButton>
      </Stack>
    </StyledProductForm>
  );
};

const StyledProductForm = styled(Box)({
  padding: 32,
  ".product_img": {
    width: "100%",
    height: 248,
    img: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    cursor: "pointer",
  },
  "#product-img": {
    display: "none",
  },
  ".title_mockup": {
    fontFamily: "'Dancing Script'",
    fontSize: 40,
    color: "#664d42",
  },
});

export default ProductForm;
