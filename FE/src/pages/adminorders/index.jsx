import styled from "styled-components";
import { Container } from "@mui/material";
import Orders from "./component/Order";

const AdminOrder = () => {
  return (
    <StyledAdmin>
      <Container className="table_product">
        <Orders />
      </Container>
    </StyledAdmin>
  );
};

const StyledAdmin = styled.div``;
export default AdminOrder;
