import { InputAdornment, TextField } from "@mui/material";
import styled from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
const Search = (props) => {
  return (
    <StyledSearch>
      <TextField
        placeholder="Search..."
        InputProps={{
          endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
        }}
        className="Search"
        {...props}
      />
    </StyledSearch>
  );
};
const StyledSearch = styled.div`
  .ant-input-search-button {
    background-color: #ffb416;
  }
  .MuiInputBase-input{
    height: 12px;
  }
`;
export default Search;
