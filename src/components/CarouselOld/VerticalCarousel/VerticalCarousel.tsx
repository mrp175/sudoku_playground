import React, { useRef, useState } from "react";
import "./VerticalCarousel.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Container, Wrapper } from "./VerticalCarousel.styled";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";
import Carousel from "../Carousel";

export default function VerticalCarousel() {
  return (
    <>
      <Swiper
        direction={"vertical"}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="_vertical-swiper"
      >
        <SwiperSlide>
          <Container>
            <Wrapper>
              <Carousel>
                <div></div>
              </Carousel>
            </Wrapper>
          </Container>
        </SwiperSlide>

        <SwiperSlide>Easy</SwiperSlide>
        <SwiperSlide>Medium</SwiperSlide>
        <SwiperSlide>Hard</SwiperSlide>
      </Swiper>
    </>
  );
}
