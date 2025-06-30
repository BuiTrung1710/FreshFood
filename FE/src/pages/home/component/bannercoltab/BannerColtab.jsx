import { Container, Stack} from "@mui/material";
import { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import BannerColtab1 from "../../../../assets/icons/banner_coltab3_1.png"
import BannerColtab2 from "../../../../assets/icons/banner_coltab3_2.png";

const moveFromLeftToRight = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
`;
const moveFromRightToLeft = keyframes`
  0% {
    transform: translateX(100%);
  }
  100%{
    transform: translateX(0%);
  }
`;
export const BannerColTab = () => {
   useEffect(() => {
     //Hàm kiểm tra người dùng khi cuộn trang
     //Kiểm tra khi người dùng đã kéo xuống đến vị trí mong muốn
     const handleScroll = () => {
       //lấy ra các class:
       const images = document.querySelectorAll(".imgBC1, .imgBC2");
       // Duyệt qua từng images để kiểm tra xem chúng có nằm trong tầm nhìn không
       images.forEach((img, index) => {
         // Kiểm tra xem phần tử DOM có tồn tại không
         if (img) {
           //Lấy kích thước và vị trí của img trong không gian màn hình
           const rect = img.getBoundingClientRect();
           // Kiểm tra xem img có nằm trong tầm nhìn không:
           const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

           if (isVisible) {
             // Nếu img nằm trong tầm nhìn, thêm class để kích hoạt animation:
             img.classList.add(`animate-imgBC${index + 1}`);
           }
         }
       });
     };
     // Thêm một sự kiện lắng nghe khi người dùng cuộn trang
     window.addEventListener("scroll", handleScroll);

     // Loại bỏ sự kiện lắng nghe khi component unmount (khi component bị hủy)
     return () => {
       window.removeEventListener("scroll", handleScroll);
     };
   }, []);
  return (
    <StyledBannerColTab>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
        >
          <div className="img_container">
            <img src={BannerColtab1} className="imgBC1" />
          </div>
          <div className="img_container">
            <img src={BannerColtab2} className="imgBC2" />
          </div>
        </Stack>
      </Container>
    </StyledBannerColTab>
  );
};
const StyledBannerColTab = styled(Container)`
  margin-top: 100px;
  margin-bottom: 100px;
  .MuiContainer-root {
    max-width: 100%; //class MuiContainer-root. Max-width của container được thiết lập là 100%, giúp nó mở rộng đến tối đa theo chiều rộng của cha.
  }
  .img_container {
    overflow: hidden; //overflow: hidden; để ảnh không bị tràn ra ngoài khung.
    width: 555px;
    height: 160px;
    border-radius: 10px;
  }
  .animate-imgBC1 {
    animation: ${moveFromLeftToRight} 1s ease-out;
  }
  .animate-imgBC2 {
    animation: ${moveFromRightToLeft} 1s ease-out;
  }
  .imgBC1,
  .imgBC2 {
    width: 100%;
    height: 100%;
    transition: filter 0.6s, opacity 0.6s, transform 0.6s, box-shadow 0.3s;
  }
  .imgBC1:hover {
    transform: scale(1.1);
  }
  .imgBC2:hover {
    transform: scale(1.1);
  }
`;
