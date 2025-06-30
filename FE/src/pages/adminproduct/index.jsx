import styled from "styled-components";
import { Container } from "@mui/material";
import Products from "./component/Products";

const AdminProduct = () => {
  return (
    <StyledAdmin>
      <Container className="table_product">
        <Products  />
      </Container>
    </StyledAdmin>
  );
};

const StyledAdmin = styled.div`
`;
export default AdminProduct;
