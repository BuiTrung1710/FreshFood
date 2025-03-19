import styled from "styled-components";
import Logo from "../../assets/imgs/logo_shop.jpg"

const ImageLogo = () => {
  // const imgStyle = {
  //   width: "100%",
  // height: "auto",
  // maxWidth: "100%",
  // };
  return (
    <StyledLogo>
      <img
        src={Logo}
        alt="Logo"
         className="logo"
        // style={imgStyle}
      />
    </StyledLogo>
  );
};
const StyledLogo = styled.div`
  width: 100%; /* Đặt chiều rộng của container */
  max-width: 1200px; /* Giới hạn chiều rộng tối đa nếu cần */
  margin: 0 auto; /* Canh giữa container */
  
  .logo {
    width: 65%; /* Hình ảnh có chiều rộng 100% của container */
    height: 108px; /* Chiều cao tự động để giữ tỉ lệ khung hình */
    max-width: 200px; /* Giới hạn chiều rộng tối đa nếu cần */
    display: block; /* Loại bỏ khoảng trắng dư thừa dưới hình ảnh */
    margin: 0 auto; /* Canh giữa hình ảnh trong container */
  }
`
export default ImageLogo;
