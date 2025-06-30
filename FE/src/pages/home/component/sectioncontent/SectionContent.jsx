import { CardMedia, Container, Grid, Stack, CardContent } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { apiGetProductCategories } from "../../../../services/product";
import { useEffect, useState } from "react";
import EggSection from "../../../../assets/imgs/section_egg.jpg";
import DryFoodSection from "../../../../assets/imgs/section_dokho.jpg";
import MeetSection from "../../../../assets/imgs/section_thit.jpg";
import FruitSection from "../../../../assets/imgs/section_traicay.jpg";
import VegetSection from "../../../../assets/imgs/section_raucu.jpg";
import JuiceSection from "../../../../assets/imgs/section_nuocep.jpg";

const SectionContent = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const categoryImgs = [
    EggSection,
    DryFoodSection,
    MeetSection,
    FruitSection,
    VegetSection,
    JuiceSection,
  ];

  useEffect(() => {
    apiGetProductCategories()
      .then((res) => {
        let newCategories = res?.data?.data || [];
        newCategories = newCategories
          .filter((category) => category?.categoryId !== 1)
          .map((category, i) => ({
            ...category,
            categoryImage: categoryImgs[i],
          }));
        setCategories(newCategories);
      })
      .catch((err) => console.log(err));
  }, []);

//  const onClickSection = (categoryId) =>{
//     navigate(`/product-category/${categoryId}`);
//     window.scrollTo({
//       top: 0,
//     })
//   }


  return (
    <StyledSectionContent>
      <Container className="container_section--content">
        <Grid container style={{ gap: 15, width:1245 }}>
          {categories.map((category) => (
            <Grid
              item
              key={category?.categoryId}
              xs={1.8}
              className="column_section--content"
              style={{ paddingLeft: 0 }}
            >
              <Stack direction="column" className="stack1">
                <CardMedia
                  component="img"
                  image={category?.categoryImage}
                  className="img"
                />
                <CardContent style={{ textAlign: "center" }}>
                  <Link
                    to={`/product-category/${category?.categoryId}`}
                    //onClick={onClickSection(category?.categoryId)}
                    className="text"
                  >
                    {category.categoryName}
                  </Link>
                </CardContent>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </StyledSectionContent>
  );
};

const StyledSectionContent = styled.div`
  .container_section--content {
    margin-top: 50px;
    padding: 0;
  }
  .stack1 {
    padding: 0 6px 10px;
    margin: 60px 0px 15px;
  }
  .column_section--content {
    border-radius: 10px;
    box-shadow: 0px 9px 15px 0px rgb(0 0 0 / 5%);
  }
  .img {
    border-radius: 50%;
    margin-left: auto;
    margin-right: auto;
    width: 82%;
    height: 125px;
  }
  .text {
    color: #b4462a;
    text-decoration: none;
  }
  .text:hover {
    color: green;
  }
`;

export default SectionContent;
