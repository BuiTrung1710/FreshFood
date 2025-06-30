// import {
//   Button,
//   Grid,
//   Stack,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";
// import React from "react";
// import Header from "../header/Header";
// import Footer from "../footer/Footer";
// import styled from "styled-components";
// import { useSelector } from "react-redux";

// const CheckOut = () => {
//   const cart = useSelector((state) => state?.cart?.cart) || [];
//   //Hàm tính giá tiền từng sản phẩm
//   const calculateSubtotal = (quantity, price) => {
//     return quantity * price;
//   };
//   //Hàm tính tổng tiền tất cả sản phẩm
//   const calculateSumPrice = () => {
//     let sumPrice = 0;
//     cart.forEach((product) => {
//       sumPrice += product?.quantity * parseFloat(product.productPrice);
//     });
//     return sumPrice;
//   };
//   return (
//     <StyledCheckOut>
//       <Stack direction="column" className="page_CheckOut">
//         <Header className="header" />
//         <Stack
//           direction="row"
//           className="block_form_Info--CheckOut"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <form>
//             <Typography>THÔNG TIN THANH TOÁN</Typography>
//             <TextField/>

            
//             {/* <div>
//               <label>Họ Tên</label>
//               <br />
//               <input type="text" />
//             </div> */}
//             {/* <div>
//               <label>Địa chỉ</label> <br />
//               <input type="text" />
//             </div> */}
//             {/* <div>
//               <label> Số Điện Thoại</label> <br />
//               <input type="text" />
//             </div> */}
//             {/* <div>
//               <label>Email</label> <br />
//               <input type="text" />
//             </div> */}
//             <div>
//               <Typography>THÔNG TIN BỔ SUNG</Typography>
//               <h3>Ghi chú đơn hàng (tùy chọn)</h3>
//               <textarea
//                 cols="30"
//                 rows="10"
//                 placeholder="Ghi chú về đơn hàng, ví dụ: thời gian hay chỉ dẫn địa điểm giao hàng chi tiết hơn."
//               />
//             </div>
//           </form>

//           <Stack style={{ border: "1px solid #ccc", width: "40%" }}>
//             <h2 className="title_checkout">ĐƠN HÀNG CỦA BẠN</h2>
//             <TableContainer className="table_data--cart">
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell className="title_info--sumPrice">
//                       <Grid container>
//                         <Grid item xs={6}>
//                           SẢN PHẨM
//                         </Grid>
//                         <Grid item xs={6} style={{ textAlign: "end" }}>
//                           TẠM TÍNH
//                         </Grid>
//                       </Grid>
//                     </TableCell>
//                   </TableRow>
//                 </TableHead>

//                 <TableBody>
//                   {cart.map((product, index) => (
//                     <TableRow key={index}>
//                       <TableCell>
//                         <Grid container>
//                           <Grid item xs={6}>
//                             {product?.productName} x {product?.quantity}
//                           </Grid>
//                           <Grid item xs={6} style={{ textAlign: "end" }}>
//                             {product &&
//                             parseFloat(
//                               calculateSubtotal(
//                                 product?.quantity,
//                                 product?.productPrice
//                               )
//                             )
//                               ? new Intl.NumberFormat("en-US", {
//                                   style: "currency",
//                                   currency: "USD",
//                                 }).format(
//                                   parseFloat(
//                                     calculateSubtotal(
//                                       product?.quantity,
//                                       product?.productPrice
//                                     )
//                                   )
//                                 )
//                               : 0}
//                           </Grid>
//                         </Grid>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                   <TableRow>
//                     <TableCell>
//                       <Grid container>
//                         <Grid
//                           item
//                           xs={6}
//                           className="title_info--sum"
//                           fontSize={17}
//                           fontWeight={600}
//                         >
//                           Tạm tính
//                         </Grid>
//                         <Grid
//                           item
//                           xs={6}
//                           textAlign="end"
//                           color={"red"}
//                           fontWeight={600}
//                         >
//                           {new Intl.NumberFormat("en-US", {
//                             style: "currency",
//                             currency: "USD",
//                           }).format(calculateSumPrice())}
//                         </Grid>
//                       </Grid>
//                     </TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell>
//                       <Grid container>
//                         <Grid
//                           item
//                           xs={6}
//                           className="title_info--sum"
//                           fontSize={17}
//                           fontWeight={600}
//                         >
//                           Tổng
//                         </Grid>
//                         <Grid
//                           item
//                           xs={6}
//                           textAlign="end"
//                           color={"red"}
//                           fontWeight={600}
//                         >
//                           {new Intl.NumberFormat("en-US", {
//                             style: "currency",
//                             currency: "USD",
//                           }).format(calculateSumPrice())}
//                         </Grid>
//                       </Grid>
//                     </TableCell>
//                   </TableRow>
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Stack>
//         </Stack>
//         <Footer />
//       </Stack>
//     </StyledCheckOut>
//   );
// };

// const StyledCheckOut = styled.div`
//   height: 100vh;
//   .page_CheckOut {
//     height: 100%;
//   }
//   .block_form_Info--CheckOut {
//     margin-bottom: auto;
//     margin-top: auto;
//     padding: 100px 0;
//     gap: 400px;
//   }
//   .title_checkout {
//     font-size: 15px;
//     text-align: center;
//   }
// `;
// export default CheckOut;
