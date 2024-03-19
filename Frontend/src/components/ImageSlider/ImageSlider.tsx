import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

type ImageSliderProps = {
  imageUrls: string[];
};
const ImageSlider = ({ imageUrls }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        borderColor: "#DADADA",
        borderStyle: "solid",
        borderRadius: "25px",
      }}
    >
      {imageUrls?.map((image) => (
        <img
          key={image}
          src={image}
          style={{
            padding: "20px",
            width: "100%",
            height: "100%",
            objectFit: "contain",
            verticalAlign: "bottom",
          }}
          alt=""
        />
      ))}

      <div style={{ position: "absolute", bottom: "10px", right: "10px" }}>
        <ArrowBackIosNewIcon />
        <ArrowForwardIosIcon />
      </div>
    </div>
  );
};

export default ImageSlider;
