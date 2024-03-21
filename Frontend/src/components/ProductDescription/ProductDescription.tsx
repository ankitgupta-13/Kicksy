import ImageSlider from "../ImageSlider/ImageSlider";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import style from "./ProductDescription.module.css";
import { Container } from "@mui/material";
import { useState } from "react";

type ProductDescription = {
  data: Object;
};

const ProductDescription = ({ data }: ProductDescription) => {
  const dateString = data.createdAt;
  const date = new Date(dateString);

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <Container>
      <div className={style.flex}>
        <div className={style.left}>
          <ImageSlider imageUrls={data.images} />
        </div>
        <div className={style.right}>
          <h1 style={{ color: "#656565" }}>{data.title}</h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "25px",
              color: "#656565",
            }}
          >
            <CurrencyRupeeIcon />
            {data.price}
          </div>
        </div>
      </div>
      <div className={style.description}>
        <h1 className={style.productDescTitle}>Product Detail</h1>
        <h3 className={style.productDesc}>{data.description}</h3>
        <a>Read More</a>
      </div>
      <div className={style.table}>
        <div className={style.column}>
          <h5 style={{ color: "#656565" }}>MANUFACTURED SKU</h5>
          <p>{data.skuID}</p>
          <h5 style={{ color: "#656565" }}>COLORWAY</h5>
          <p>{data.color}</p>
        </div>
        <div className={style.column}>
          <h5 style={{ color: "#656565" }}>BRAND</h5>
          <p>{data.brand}</p>
          <h5 style={{ color: "#656565" }}>GENDER</h5>
          <p>{data.gender === "F" ? "Female" : "Male"}</p>
        </div>
        <div className={style.column}>
          <h5 style={{ color: "#656565" }}>STOCK</h5>
          <p>{data.stock}</p>
          <h5 style={{ color: "#656565" }}>RELEASE DATE</h5>
          <p>{formattedDate}</p>
        </div>
      </div>
    </Container>
  );
};

export default ProductDescription;
