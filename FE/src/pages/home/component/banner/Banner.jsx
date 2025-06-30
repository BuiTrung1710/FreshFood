import React from "react";
import SwiperCore, {
  Navigation,
  A11y,
  Autoplay,
} from "swiper/core";
import { Swiper, SwiperSlide } from "swiper/react";
import styled from "styled-components";
import "swiper/swiper-bundle.css";
import Banner1 from "../../../../assets/imgs/banner1.jpg"
import Banner2 from "../../../../assets/imgs/banner2.jpg";
import Banner3 from "../../../../assets/imgs/banner3.jpg";

SwiperCore.use([Navigation, A11y, Autoplay]);

const Banner = () => {
  return (
    <StyledBanner>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <img
            src={Banner1}
            alt="Slide 1"
            className="img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Banner2}
            alt="Slide 2"
            className="img"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={Banner3}
            alt="Slide 3"
            className="img"
          />
        </SwiperSlide>
      </Swiper>
    </StyledBanner>
  );
};

const StyledBanner = styled.div`
  .img {
    width: 100%;
    height: 700px;
  }
`;

export default Banner;
