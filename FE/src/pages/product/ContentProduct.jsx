import {
  Stack,
  Typography,
  Container,
  Grid,
  Pagination,
  Backdrop,
  CircularProgress,
  MenuItem,
  Select,
} from "@mui/material";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { StyledContentProduct } from "./ContentProduct.styles";
import { useEffect,useState } from "react";
import { apiGetProductCategories } from "../../services/product";
import { apiGetProducts } from "../../services/product";
import { ItemProduct } from "./Item-Product";
import Search from "../../components/search/Search";
import { useParams } from "react-router-dom";
import { useSearch } from "../../hooks/useSearch";
import ImgNature from "../../assets/imgs/100tunhien.jpg"
import ImgChungNhanVSATTP from "../../assets/imgs/chung-nhan-an-toan-thuc-pham.jpg";
import ImgFreshyFood from "../../assets/imgs/freshyfood.jpg";
import ImgATSK from "../../assets/imgs/antoánuckhoe.jpg";

const ContentProduct = () => {
  const { id } = useParams(); //Lấy ra id từ URL
  //console.log("id param:", id);
  const navigate = useNavigate();
  //State khi click vào Category
  const [selectedCategory, setSelectedCategory] = useState(id);
  //State tạo mảng trống Category để có thể đẩy data vào
  const [categories, setCategories] = useState([]);
  //State tạo đối tượng chứa số lượng sản phẩm của từng danh mục
  const [categoryCounts, setCategoryCounts] = useState({});
  //State tạo mảng trống Product để có thể đẩy data vào
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  // Thêm state loadingBackdrop
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const [sortedProduct, setSortedProduct] = useState("");
  //State tìm kiếm
  const [searchParams] = useSearchParams();

  const [metaData, setMetaData] = useState({
    page: searchParams.get("page") || 1,
    limit: 9,
    search: searchParams.get("search") || "",
  });
  //console.log("abc:",metaData.page)
  const keySearch = useSearch(metaData.search, 500);

  const onChangePagination = (value) => {
    setMetaData({ ...metaData, page: value });
  };

  const onClickCategory = (id) => {
    setSelectedCategory(`${id}`);  // Ép giá trị của selected category từ int trong database về string để cho đồng điệu với kiểu dữ liệu khi lấy từ URL thông qua useParams.
     navigate(`/product-category/${id}`);
     window.scrollTo(({
      top: 0
     }))
  };

  //Xử lý lấy ra categoryId và categoryName của category
  useEffect(() => {
    apiGetProductCategories()
      .then((res) => setCategories(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  //Sử dụng một useEffect() để lắng nghe sự thay đổi của id từ URL thông qua useParams().
  //Khi id từ URL thay đổi (ví dụ: do người dùng điều hướng qua các danh mục sản phẩm khác nhau), useEffect() sẽ được kích hoạt và cập nhật lại selectedCategory dựa trên giá trị mới của id từ URL.
  useEffect(() => {
    setSelectedCategory(id);  //Kiểu dữ liệu là string vì lấy từ chuỗi URL.
  }, [id]);

  //Call API lấy ra danh sách sản phẩm và xử lý lấy dữ liệu theo categoryId khi click vào từng mục category
  useEffect(() => {
    setLoadingBackdrop(true); // Bắt đầu loading
    setTimeout(() => {
      apiGetProducts(
        metaData.page,
        metaData.limit,
        metaData.search,
        selectedCategory === "1" ? undefined : selectedCategory,
        sortedProduct
      )
        .then((res) => {
          let data = res?.data;
          setProducts(data?.data);
          setTotal(data?.metadata?.total || 0);
          const counts = {};
          // Kiểm tra và sử dụng filter để lọc các category có CategoryId khác 1
          data?.metadata?.count
            .filter((category) => category.CategoryId !== 1)
            .forEach((category) => {
              counts[category.CategoryId] = category.count;
            });

          setCategoryCounts(counts);
          //console.log("mng", counts);
          setLoadingBackdrop(false);
        })
        .catch((err) => {
          console.log(err);
          setLoadingBackdrop(false); // Kết thúc loading
        });
    }, 500);
  }, [metaData.limit,metaData.page, keySearch, selectedCategory, sortedProduct]);
    console.log(selectedCategory, typeof selectedCategory)
  //Xử lý tìm kiếm
  useEffect(() => {
    navigate({ search: `page=${metaData.page}&search=${metaData.search}` });
  }, [metaData]);

  const onChangeSearch = (e) => {
    let newSearch = e?.target?.value;
    setMetaData({ ...metaData, search: newSearch });
  };
  
    console.log(categoryCounts);

 

  return (
    <StyledContentProduct>
      <Container style={{ maxWidth: 1320, padding: 0 }}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" className="header-content--product">
            <Link to="/" className="link-home">
              TRANG CHỦ
            </Link>
            /<Typography className="link-product">SHOP</Typography>
          </Stack>
          <Stack
            direction="row"
            spacing={2}
            style={{ marginTop: 45 }}
            alignItems="center"
          >
            <Typography>Sắp xếp theo giá:</Typography>
            <Select
              label="Sắp xếp"
              value={sortedProduct}
              onChange={(e) => setSortedProduct(e.target.value)}
              displayEmpty
              style={{ width: 200, height: 45 }}
            >
              <MenuItem value="">Mặc định</MenuItem>
              <MenuItem value="asc">Tăng dần</MenuItem>
              <MenuItem value="desc">Giảm dần</MenuItem>
            </Select>
            <Search
              value={metaData.search}
              onChange={onChangeSearch}
              className="search"
            />
          </Stack>
        </Stack>
        <Stack className="input-search"></Stack>

        {/* Loading */}
        <Backdrop
          open={loadingBackdrop}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Stack direction="row" className="content" spacing={4}>
          <Stack direction="column" className="sidebar">
            <Stack direction="column" spacing={2} className="sidebar-content2">
              <div className="list-product">
                <h3 className="label-list--product">LOẠI SẢN PHẨM</h3>
              </div>
              {categories.map((category, i) => (
                <div
                  className={`list-product-child ${
                    `${category.categoryId}` === id ? "selected" : ""
                  } `}
                  key={category.categoryId}
                >
                  <Link
                    
                    onClick={() => onClickCategory(category.categoryId)}
                    className={`text-sidebar2 ${
                      `${category.categoryId}` === id ? "selected" : ""
                    }`}
                  >
                    {category.categoryName}
                    {category.categoryId !== 1 && (
                      <span>({categoryCounts[category.categoryId]})</span>
                    )}
                  </Link>
                </div>
              ))}
              {/*  */}
            </Stack>
            <Stack spacing={2} className="sidebar-content1" alignItems="center">
              <img src={ImgNature} className="img-sidebar" />
              <Typography className="text-sidebar1">100% tự nhiên</Typography>

              <img src={ImgChungNhanVSATTP} className="img-sidebar" />
              <Typography className="text-sidebar1">Chứng nhận ATTP</Typography>

              <img src={ImgFreshyFood} className="img-sidebar" />
              <Typography className="text-sidebar1">
                Luôn luôn tươi mới
              </Typography>

              <img src={ImgATSK} className="img-sidebar" />
              <Typography className="text-sidebar1">
                An toàn cho sức khỏe
              </Typography>
            </Stack>
          </Stack>

          <Grid container style={{ width: "100%", marginTop: 40 }}>
            {products.map((product, i) => (
              <Grid
                key={i}
                item
                xs={12}
                md={4}
                style={{ padding: 0, marginBottom: 20 }}
              >
                <ItemProduct product={product} />
              </Grid>
            ))}
          </Grid>
        </Stack>
        <Stack>
          <Pagination
            count={Math.ceil(total / metaData.limit)}
            onChange={(e, value) => onChangePagination(value)}
          />
        </Stack>
      </Container>
    </StyledContentProduct>
  );
};

export default ContentProduct;
