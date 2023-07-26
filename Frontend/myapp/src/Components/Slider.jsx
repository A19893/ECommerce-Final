import React, { useState } from "react";
import SimpleImageSlider from "react-simple-image-slider";
import Banner1 from "../Assets/Banner-1.PNG";
import Banner2 from "../Assets/Banner-2.PNG";
import Banner3 from "../Assets/Banner-3.PNG";
import Banner4 from "../Assets/Banner-4.PNG";
import Banner5 from "../Assets/Banner-5.PNG";
const Slider = () => {
  const [imageNum, setImageNum] = useState(1);
  const sliderImages = [Banner1, Banner2, Banner3, Banner4, Banner5];
  return (
    <div id="slider">
      <SimpleImageSlider
        width={"100%"}
        height={500}
        images={sliderImages}
        showNavs={true}
        autoPlay={true}
        onStartSlide={(index) => {
          setImageNum(index);
        }}
        autoPlayDelay={3}
      />
    </div>
  );
};

export default Slider;
