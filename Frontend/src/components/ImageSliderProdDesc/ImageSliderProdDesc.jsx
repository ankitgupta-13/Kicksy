import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import style from "./ImageSliderProdDesc.module.css";

const ImageSliderProdDesc = ({ imageUrls }) => {
  const [imageIndex, setImageIndex] = useState(0);
  return (
    <div
      style={{
        position: "relative",
        borderRadius: "15px",
        width: "100%",
        height: "100%",
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
            setImageIndex(
              imageIndex > 0 ? imageIndex - 1 : imageUrls.length - 1
            );
          }}
        >
          <IoIosArrowBack
            className={style.arrows}
            style={{ position: "absolute", left: "0", paddingLeft: ".3rem" }}
          />
        </div>
        <div
          onClick={() => {
            setImageIndex(
              imageIndex < imageUrls.length - 1 ? imageIndex + 1 : 0
            );
          }}
        >
          {" "}
          <IoIosArrowForward
            className={style.arrows}
            style={{ position: "absolute", right: "0", paddingRight: ".3rem" }}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageSliderProdDesc;
