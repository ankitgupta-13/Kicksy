import { useSelector } from "react-redux";
import style from "./EditProduct.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductRequestById,
} from "../../../../../api/product.api";
import { updateProduct } from "../../../../../api/admin.api";
import {
  Button,
  Container,
  ImageSlider,
  Input,
} from "../../../../../components";

const EditProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.adminDashboard.currentProduct
  );
  const productRequestID = useSelector(
    (state: RootState) => state.adminDashboard.currentProductRequest
  );
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);

  const handleUpdateProduct = (updatedProduct) => {
    try {
      const response = updateProduct(updatedProduct);
      console.log(response);
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
          response = await getProductRequestById({
            requestID: productRequestID,
          });
        }
        console.log(response.data);
        setProduct(response.data);
        setImageUrls(response.data.images);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleCreateOffer = () => {
    handleUpdateProduct(product);
  };

  return (
    <div>
      <Input label="Price" />
    </div>
  );
};

export default EditProduct;
