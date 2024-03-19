import ImageSlider from "../ImageSlider/ImageSlider";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import style from "./ProductDescription.module.css";
import { Container } from "@mui/material";
import { useState } from "react";

type ProductDescription = {
  data: Object;
};

const ProductDescription = ({ data }: ProductDescription) => {
  console.log(data);
  const dateString = data.createdAt;
  const date = new Date(dateString);

  const options = { month: "short", day: "2-digit", year: "numeric" };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div className={style.left}>
        <ImageSlider imageUrls={data.images} />
        <div className={style.productDetails}>
          <h3>PRODUCT DETAILS</h3>
          <div>{data.description}</div>
          <div className={style.row}>
            <div className={style.columns} >
              <div>
                <p>MANUFACTURES SKU</p>
                <div>{data.skuID}</div>
              </div>
              <div>
                <p>BRAND</p>
                {data.brand}
              </div>
              <div>
                <p>STOCK</p>
                {data.stock}
              </div>
            </div>
            <div className={style.columns} style={{borderTopWidth: '0px'}}>
              <div>
                <p>COLOR</p>
                {data.color}
              </div>
              <div>
                <p>GENDER</p>
                {data.gender === "F" ? "Female" : "Male"}
              </div>
              <div>
                <p>RELEASE DATE</p>
                {formattedDate}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.right}>
        <div>{data.title}</div>
        <div>
          <CurrencyRupeeIcon />
          {data.price}
        </div>
      </div>
    </Container>
  );
};

export default ProductDescription;
