import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { getProductById } from "../../../../../api/product.api";

const DetailProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.adminDashboard.currentProduct
  );
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await getProductById({ productID });
        setProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <img src={product.images[0]} alt="" />
        </div>
      ) : (
        <h1>"No product selected"</h1>
      )}
    </div>
  );
};

export default DetailProduct;
