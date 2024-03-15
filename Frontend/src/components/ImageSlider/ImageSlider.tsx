import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type ImageSliderProps = {
  imageUrls: string[];
};
const ImageSlider = ({ imageUrls }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div>
      <img src={imageUrls} alt="" />
      <ArrowForwardIosIcon />
      <ArrowBackIosNewIcon />
    </div>
  );
};

export default ImageSlider;
