import { useSelector } from "react-redux";
import style from "./DetailProduct.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useEffect, useState } from "react";
import { getProductById } from "../../../../../api/product.api";
import {
  getProductRequests,
  updateProduct,
} from "../../../../../api/admin.api";
import { Container, ImageSlider } from "../../../../../components";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

const DetailProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.adminDashboard.currentProduct
  );
  const productRequestID = useSelector(
    (state: RootState) => state.adminDashboard.currentProductRequest
  );
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState();
  const [productPrice, setProductPrice] = useState();

  const handleUpdateProduct = (data) => {
    try {
      data = { ...data };
      const response = updateProduct({ data });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let response;
        if (productID) {
          response = await getProductById({ productID });
        } else {
          response = await getProductRequests(productRequestID);
        }
        console.log(response);
        setProduct(response.data);
        // setImageUrls(response.data.images);
        setProductPrice(response.data.price);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      {product ? (
        <Container
          sx={{
            flexDirection: "row",
            gap: "2rem",
          }}
        >
          <ImageSlider imageUrls={imageUrls} />
          <div className={style.productDetails}>
            <div>{product.title}</div>
            <div className={style.price}>
              <CurrencyRupeeIcon
                sx={{
                  width: "15px",
                }}
              />
              {productPrice}
            </div>
            <div>{product.description}</div>
            <div className={style.color}>
              <h3>Color</h3>
              {product.color}
            </div>
            <div className={style.size}>
              <h3>Size</h3>
              {product.size}
            </div>
            <div>{product.stock}</div>
            <div>{product.gender}</div>
          </div>
        </Container>
      ) : (
        <div>No Product Selected</div>
      )}
    </div>
  );
};

export default DetailProduct;
