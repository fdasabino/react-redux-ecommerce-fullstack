import React from "react";
import { sliderItems } from "./sliderData";
import { Button } from "antd";
import { Carousel } from "react-responsive-carousel";
import "./Slider.css";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <Carousel
      className="carousel_slider"
      emulateTouch={true}
      infiniteLoop={true}
      autoPlay={true}
      interval={8000}
      showStatus={false}
      showThumbs={false}
      useKeyboardArrows={true}
      showArrows={false}
    >
      {sliderItems.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} />
          <div className="legend">
            <h4 className="my-3">{item.title}</h4>
            <div className="d-flex justify-content-center">
              <Link className="my-3" to="/shop">
                <Button className="button" type="primary">
                  SHOP NOW
                </Button>
              </Link>
            </div>
            <h5 className="my-2">{item.description}</h5>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
