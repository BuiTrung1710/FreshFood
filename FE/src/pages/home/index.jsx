import styled from "styled-components";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import Content from "./component/content-home/Content";

const Home = () => {
  return (
    <StyledHome>
      <Header className="header_home"/>
      <div className="content">
        <Content />
      </div>
      <Footer className="footer" />
    </StyledHome>
  );
};
const StyledHome = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; //Đảm bảo chiều cao tối thiểu của toàn bộ trang chiếm 100% viewport ngay cả khi nội dung trong container không đủ dài
  .content {
    margin-bottom: auto; // trường hợp này giúp cho phần footer chiếm toàn bộ phần trống còn lại trong container
  }
`;
export default Home;
