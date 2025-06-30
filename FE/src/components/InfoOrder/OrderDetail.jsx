import { Container, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Backdrop, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useUser } from "../../providers/user-provider";
import { useNavigate, useParams } from "react-router-dom";
import { formatImg } from "../../utils/imgHelpers";
import { apiGetOrderDetail } from "../../services/order";
import { formatDatetime } from "../../utils/stringHelpers";

const OrderDetail = () => {
  const {id} = useParams();
  const [orderDetails, setOrderDetails] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();
  //State tìm kiếm
  const [loadingBackdrop, setLoadingBackdrop] = useState(false);

  if (!user) {
    navigate("/FormLogin");
    window.scrollTo({
      top: 0,
    });
  }
   useEffect(() => {
     setLoadingBackdrop(true);
     setTimeout(() => {
       apiGetOrderDetail(id)
         .then((res) => {
           console.log(res?.data?.data);
           const data = res?.data?.data;
           setLoadingBackdrop(false);
          if (data && typeof data === "object") {
            setOrderDetails([data]); // Gán dữ liệu trong một mảng đối tượng
          } else {
            setOrderDetails([]); // Gán một mảng rỗng
          }
           console.log(orderDetails);
         })
         .catch((err) => {
           console.log(err);
           setLoadingBackdrop(false);
         });
     }, 500);
   }, [id]);
   
    const calculateTotal = (quantities, prices) => {
      // Chuyển đổi các mảng quantities và prices từ chuỗi sang số và tính tổng
      return quantities
        .split(", ")
        .map(
          (qty, idx) => parseFloat(qty) * parseFloat(prices.split(", ")[idx])
        )
        .reduce((acc, curr) => acc + curr, 0); // Cộng dồn các giá trị để nhận tổng
    };

    const getOrderStatusLabel = (status) => {
      const statusLabels = {
        0: "pending",
        1: "processing",
        2: "shipped",
        3: "delivered",
        4: "cancelled",
        5: "returned",
      };

      return statusLabels[status] || "Unknown Status"; // Trả về "Unknown Status" nếu không tìm thấy trạng thái
    };

  return (
    <StyledOrderDetail>
      {/* Loading */}
      <Backdrop
        open={loadingBackdrop}
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Stack direction="column" className="order-detail_page">
        <Header />
        <Container className="container-order_detail">
          <h1>Order Detail</h1>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="table_title">
                    Customer FullName
                  </TableCell>
                  <TableCell className="table_title">Customer Email</TableCell>
                  <TableCell className="table_title">Customer Phone</TableCell>
                  <TableCell className="table_title">
                    Shipping Address
                  </TableCell>
                  <TableCell className="table_title">Payment Status</TableCell>
                  <TableCell className="table_title"> Order Status</TableCell>
                  <TableCell className="table_title"> Payment Method</TableCell>
                  <TableCell className="table_title">Product Name</TableCell>
                  <TableCell className="table_title">Quantity</TableCell>
                  <TableCell className="table_title">Product Price</TableCell>
                  <TableCell className="table_title">Total</TableCell>
                  <TableCell className="table_title">Create Time</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {orderDetails.length === 0 ? (
                  <TableRow>
                    {/* Hiển thị một hàng */}
                    <TableCell colSpan={10} className="empty-text">
                      Trống
                    </TableCell>
                    {/* Sử dụng colSpan để chiếm hết các cột */}
                  </TableRow>
                ) : (
                  Array.isArray(orderDetails) &&
                  orderDetails.map((order, index) => (
                    <TableRow key={index}>
                      <TableCell>{order.customerFullname}</TableCell>
                      <TableCell>{order.customerEmail}</TableCell>
                      <TableCell>{order.customerPhone}</TableCell>
                      <TableCell>{order.shippingAddress}</TableCell>
                      <TableCell>{order.paymentStatus}</TableCell>
                      <TableCell>
                        {getOrderStatusLabel(order.orderStatus)}
                      </TableCell>
                      <TableCell>{order.paymentMethod}</TableCell>
                      <TableCell>
                        {order.productNames
                          .split(", ")
                          .map((productname, idx) => (
                            <div key={idx}>{productname}</div>
                          ))}
                      </TableCell>
                      <TableCell>
                        {order.quantities.split(", ").map((quantity, idx) => (
                          <div key={idx}>{quantity}</div>
                        ))}
                      </TableCell>
                      <TableCell>
                        {order.productPrices.split(", ").map((price, idx) => {
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
                          calculateTotal(order.quantities, order.productPrices)
                        )}
                      </TableCell>
                      <TableCell>{formatDatetime(order.createTime)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
        <Footer />
      </Stack>
    </StyledOrderDetail>
  );
};
const StyledOrderDetail = styled.div`
  height: 100vh;
  .order-detail_page {
    height: 100%;
  }
  .container-order_detail {
    margin-bottom: auto;
  }
  .product_img{
    width: 48px;
    height: 48px;
  }
  .table_title{
    text-align: center;
    white-space: nowrap;
  }
  .MuiTableCell-root{
    text-align: center;
  }
`;
export default OrderDetail;
