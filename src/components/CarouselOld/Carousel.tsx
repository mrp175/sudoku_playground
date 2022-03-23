// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import "swiper/css/scrollbar";

import { Component, Slide } from "./Carousel.styled";
import VerticalCarousel from "./VerticalCarousel/VerticalCarousel";

export default function Carousel({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return (
    <Component>
      <Swiper
        className="test"
        modules={[Navigation, Pagination, A11y]}
        direction="horizontal"
        spaceBetween={0}
        centeredSlides={true}
        slidesPerView={2}
        navigation
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {children}
        <SwiperSlide>
          <Slide>testing</Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide>testing</Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide>testing</Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide>testing</Slide>
        </SwiperSlide>
      </Swiper>
    </Component>
  );
}
