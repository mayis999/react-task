import React from "react";
import { Carousel } from "react-responsive-carousel";

import classes from "./productSlider.module.css";
import "react-responsive-carousel/lib/styles/carousel.css";

export default function ProductSlider({ images }) {
  return (
    <Carousel
      className={classes.sliderWrapper}
      infiniteLoop={true}
      showIndicators={false}
      showStatus={false}
    >
      {images?.map((image, index) => (
        <div key={index} className={classes.sliderImg}>
          <img src={image} alt="product images" />
        </div>
      ))}
    </Carousel>
  );
}
