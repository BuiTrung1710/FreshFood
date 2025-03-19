import {Container} from "@mui/material";
import { Grid, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneVolume } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

export const Delivery = () => {
  return (
    <Container style={{ maxWidth: 1225 }}>
      <StyledDelivery>
        <Grid container className="block_callship">
          <Grid
            item
            xs={6}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            className="block1"
          >
            <div>
              <Typography className="delivery_to_the_place">
                Gọi điện giao hàng tận nơi
              </Typography>
            </div>
            <div className="telephone">
              <RingingPhoneIcon icon={faPhoneVolume} />
              1900 6750
            </div>
          </Grid>
          <Grid item xs={6} className="block2">
            <img
              src="//bizweb.dktcdn.net/100/159/843/themes/211392/assets/takeaway.png?1676862153214"
              className="img_shipper"
            />
          </Grid>
        </Grid>
      </StyledDelivery>
    </Container>
  );
};

const ringAnimation = keyframes`  // keyframes được sử dụng để định nghĩa animation với các giai đoạn khác nhau
  0% { transform: rotate(0deg); }
  25% { transform: rotate(10deg); }
  50% { transform: rotate(-10deg); }
  75% { transform: rotate(5deg); }
  100% { transform: rotate(0deg); }
`;

const StyledDelivery = styled(Container)`
  background-color: #50aecc;
  width: 100%;
  height: 250px;
  margin-top: 40px;
  .block_callship {
    padding: 30px 0px;
    height: 100%;
  }
  .delivery_to_the_place {
    font-size: 30px;
    font-family: serif;
    color: #fff;
  }
  .block1,
  .block2 {
    padding: 0px 15px;
  }
  .telephone {
    color: #fff;
    font-size: 50px;
    display: flex;
    align-items: center;
  }
  /* Cách 1 xử lý animation rung chuông điện thoại
    svg {
      //svg Là một phần tử trong HTML, đại diện cho các hình vẽ vector và biểu tượng.
      //Trong trường hợp này, đang áp dụng animation cho phần tử <svg> chứa icon điện thoại.
        animation: ${ringAnimation} 1s infinite;
      //animation Là thuộc tính trong CSS được sử dụng để áp dụng animation cho một phần tử.
      //Giá trị của animation bao gồm thông số animation được đặt ra (ở đây là ${ringAnimation}),
      //thời gian mỗi chu kỳ (ở đây là 1s cho 1 giây), và kiểu lặp (ở đây là infinite để lặp vô hạn).
      //${ringAnimation} Là biến template string trong JavaScript, giúp chèn giá trị của biến ringAnimation vào trong chuỗi CSS.
      //Biến này trỏ đến keyframes đã được định nghĩa trước đó, cụ thể là chuỗi các giai đoạn và thuộc tính của animation.
    } */
  .img_shipper {
    width: 100%;
    height: 100%;
  }
`;

const RingingPhoneIcon = styled(FontAwesomeIcon)`
  margin-right: 10px;
  //Cách 2 xử lý animation rung chuông điện thoại (thêm css trực tiếp vào trong phần tử cần định nghĩa animation)
  animation: ${ringAnimation} 1s infinite;
`;
