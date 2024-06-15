import { useEffect, useState } from "react";
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
        width: "600px",
        height: "400px",
        borderRadius: "25px",
      }}
    >
      {imageUrls && (
        <img
          key={imageIndex}
          src={imageUrls[imageIndex]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            verticalAlign: "bottom",
            borderRadius: "25px",
          }}
          alt=""
        />
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "115%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
        }}
      >
        <div
          onClick={() => {
            setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageUrls.length - 1);
          }}
          style={{ cursor: "pointer", backgroundColor: "#ccc", width: "2rem", height: "2rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}
        >
          <ArrowBackIosNewIcon />
        </div>
        <div
          onClick={() => {
            setImageIndex(imageIndex < imageUrls.length - 1 ? imageIndex + 1 : 0);
          }}
          style={{ cursor: "pointer", backgroundColor: "#ccc", width: "2rem", height: "2rem", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "50%" }}
        >
          {" "}
          <ArrowForwardIosIcon />
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
