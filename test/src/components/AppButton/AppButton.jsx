import { Button, styled } from "@mui/material";

export const AppButton = (props) => {
  return <StyledButton {...props} />;
};

const StyledButton = styled(Button)({
  textTransform: "initial",
  color: "#fff",
  backgroundColor: "var(--app-color)",
  "&:hover": { backgroundColor: "#3ba66b" },
  height: "50px",
});
