import styled from "styled-components";
import { Container } from "@mui/material";
import Accounts from "./component/Accounts";

const AdminAccount = () => {
  return (
    <StyledAdmin>
      <Container>
        <Accounts />
      </Container>
    </StyledAdmin>
  );
};

const StyledAdmin = styled.div`
  
  
`;
export default AdminAccount;
