import styled from "styled-components";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import ContentProduct from "./ContentProduct";
const Product = () => {
  
  return (
    <StyledProduct>
      <Header />
      <div className="content-product">
        <ContentProduct />
      </div>
      <Footer showImageFooterTop={false} />
    </StyledProduct>
  );
};
const StyledProduct = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .content-product {
    margin-bottom: auto;
  }
`;
export default Product;
