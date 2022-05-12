import React from "react";
import TypeWriterEffect from "../typewriter_effect/TypeWriterEffect";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="container-fluid p-0">
      <div className="banner">
        <TypeWriterEffect
          text={["Super Deal! Free shipping on orders over $50!"]}
        />
      </div>
    </div>
  );
};

export default Banner;
