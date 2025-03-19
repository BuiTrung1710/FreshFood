import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  Backdrop,
  CircularProgress,
  Container,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import styled from "styled-components";
import { apiGetOrders } from "../../services/order";
import { formatImg } from "../../utils/imgHelpers";
import {MdRemoveRedEye } from "react-icons/md";
import { useUser } from "../../providers/user-provider";
import { useSearch } from "../../hooks/useSearch";
import {useNavigate, useSearchParams } from "react-router-dom";
import Search from "../search/Search";

const InfoOrder = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  //State tìm kiếm
  const [searchParams] = useSearchParams();
  const [metaData, setMetaData] = useState({
    page: searchParams.get("page") || 1,
    limit: 9,
    search: searchParams.get("search") || "",
  });
  const [total, setTotal] = useState(0);
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);
  const keySearch = useSearch(metaData.search, 500);

  if (!user) {
    navigate("/FormLogin");
    window.scrollTo({
      top: 0,
    });
  }

  useEffect(() => {
    if (user) {
      setLoadingBackdrop(true);
      setTimeout(() => {
        apiGetOrders(
          metaData.page,
          metaData.limit,
          metaData.search,
          user.accountId
        )
          .then((res) => {
            let data = res?.data;
            setOrders(data?.data);
            setTotal(data?.metadata?.total || 0);
            setLoadingBackdrop(false);
          })
          .catch((err) => {
            console.log(err);
            setLoadingBackdrop(false);
          });
      }, 700);
    }
  }, [metaData.page, metaData.limit, keySearch, user]);

  //Hàm xử lý pagination
  const onChangePagination = (value) => {
    setMetaData({ ...metaData, page: value });
  };
  //Xử lý tìm kiếm
  const onChangeSearch = (e) => {
    let newSearch = e?.target?.value;
    setMetaData({ ...metaData, search: newSearch });
  };
  useEffect(() => {
    navigate({ search: `page=${metaData.page}&search=${metaData.search}` });
  }, [metaData]);

 const calculateTotal = (quantities, prices) => {
   // Chuyển đổi các mảng quantities và prices từ chuỗi sang số và tính tổng
   return quantities
     .split(", ")
     .map((qty, idx) => parseFloat(qty) * parseFloat(prices.split(", ")[idx]))
     .reduce((acc, curr) => acc + curr, 0); // Cộng dồn các giá trị để nhận tổng
 };


    const onClickOrderDetail = (orderId) => {
      navigate(`/order-detail/${orderId}`);
      window.scrollTo({
        top: 0,
      });
    };

  return (
    <StyledInfoOrder>
      <Stack direction="column" className="info-Order_page">
        <Header />
        <Container className="container_info-order">
          <h1>My Order</h1>
          <Stack direction="row" justifyContent="end">
            {/* Search */}
            <div className="search">
              <Search
                value={metaData.search}
                onChange={onChangeSearch}
                className="search"
              />
            </div>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table_title">Product Name</TableCell>
                  <TableCell className="table_title">Quantity</TableCell>
                  <TableCell className="table_title">Price</TableCell>
                  <TableCell className="table_title">Total Price</TableCell>
                  <TableCell className="table_title">Payment Status</TableCell>
                  <TableCell className="table_title">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    {/* Hiển thị một hàng */}
                    <TableCell colSpan={10} className="empty-text">
                      Trống
                    </TableCell>
                    {/* Sử dụng colSpan để chiếm hết các cột */}
                  </TableRow>
                ) : (
                  orders.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {order.ProductNames.split(", ").map(
                          (productname, idx) => (
                            <div key={idx}>{productname}</div>
                          )
                        )}
                      </TableCell>
                      {/* <TableCell>
                        {order.Images.split(", ").map((img, idx) => (
                          <img
                            src={formatImg(img)}
                            alt={`Product Image ${idx}`}
                            key={idx}
                            style={{ width: "100px", height: "auto" }}
                          />
                        ))}
                      </TableCell> */}

                      <TableCell>
                        {order.Quantities.split(", ").map((quantity, idx) => (
                          <div key={idx}>{quantity}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {order.Prices.split(", ").map((price, idx) => {
                          const formattedPrice = new Intl.NumberFormat(
                            "en-US",
                            {
                              style: "currency",
                              currency: "USD",
                            }
                          ).format(parseFloat(price));
                          return <div key={idx}>{formattedPrice}</div>;
                        })}
                      </TableCell>

                      <TableCell>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(
                          calculateTotal(order.Quantities, order.Prices)
                        )}
                      </TableCell>

                      <TableCell>{order.paymentStatus}</TableCell>               
                      <TableCell>
                        <Stack
                          spacing={2}
                          direction="row"
                          justifyContent="center"
                        >
                          <Tooltip title="Chi tiết đơn hàng">
                            <IconButton
                              className="detail"
                              onClick={() => onClickOrderDetail(order?.orderId)}
                            >
                              <MdRemoveRedEye />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          {/* Loading */}
          <Backdrop
            open={loadingBackdrop}
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {/* Pagination */}
          <Stack justifyContent="center" p={5}>
            <Pagination
              count={Math.ceil(total / metaData.limit)}
              onChange={(e, value) => onChangePagination(value)}
            />
          </Stack>
        </Container>
        <Footer className="footerPage" />
      </Stack>
    </StyledInfoOrder>
  );
};

const StyledInfoOrder = styled.div`
  height: 100vh;
  .info-Order_page {
    height: 100%;
  }
  .container_info-order {
    margin-bottom: auto;
  }
  .table_title {
    text-align: center;
    white-space: nowrap;
  }
  .MuiTableCell-root {
    text-align: center;
  }
  .MuiPagination-ul {
    justify-content: center;
  }
  .product_img {
    width: 48px;
    height: 48px;
    object-fit: cover;
  }
  .footerPage {
    margin-top: 100px;
  }
`;

export default InfoOrder;
