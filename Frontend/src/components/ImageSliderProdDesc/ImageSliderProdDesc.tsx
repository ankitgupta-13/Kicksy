import { useEffect, useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Style } from "@mui/icons-material";
import style from "./ImageSliderProdDesc.module.css";

type ImageSliderProps = {
  imageUrls: string[];
};

const ImageSliderProdDesc = ({ imageUrls }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        height: "400px",
        borderRadius: "15px",
        width: "100%",
        height: "100%"
      }}
    >
      {imageUrls && (
        <img
          key={imageIndex}
          src={imageUrls[imageIndex]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            verticalAlign: "bottom",
          }}
          alt=""
        />
      )}

      <div
        style={{
          display: "flex",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          top: "50%",
          left: "50%",
          width: "100%",
        }}
      >
        <div
          onClick={() => {
            setImageIndex(imageIndex > 0 ? imageIndex - 1 : imageUrls.length - 1);
          }}
        >
          <ArrowBackIosNewIcon className={style.arrows} style={{position: "absolute", left: "0"}} />
        </div>
        <div
          onClick={() => {
            setImageIndex(imageIndex < imageUrls.length - 1 ? imageIndex + 1 : 0);
          }}
        >
          {" "}
          <ArrowForwardIosIcon className={style.arrows} style={{position: "absolute", right: "0", cursor: "pointer", fontSize: "3rem", color: "#aaa", padding: ".6rem", borderRadius: "5rem"}} />
        </div>
      </div>
    </div>
  );
};

export default ImageSliderProdDesc;
