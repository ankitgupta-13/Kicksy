import { useDispatch, useSelector } from "react-redux";
import style from "./DetailProduct.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useEffect, useState } from "react";
import {
  getProductById,
  getProductRequestById,
} from "../../../../../api/product.api";
import {
  acceptProductRequest,
  declineProductRequest,
  updateProduct,
} from "../../../../../api/admin.api";
import { ProductDescription } from "../../../../../components";
import { Button } from "@mui/material";
import { selectAdminAction } from "../../../../../redux/reducers/adminDashboardSlice";

const DetailProduct = () => {
  const isAdmin = useSelector(
    (state: RootState) => state.auth.userData.role === "admin"
  );
  let productID;
  isAdmin
    ? (productID = useSelector(
        (state: RootState) => state.adminDashboard.currentProduct
      ))
    : (productID = useSelector(
        (state: RootState) => state.sellerDashboard.currentProduct
      ));

  const productRequestID = useSelector(
    (state: RootState) => state.adminDashboard.currentProductRequest
  );
  const dispatch = useDispatch();
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

  const handleShowEditProduct = () => {
    dispatch(
      selectAdminAction({
        selectedSection: "Product",
        selectedAction: "Edit",
      })
    );
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

  return (
    <div>
      {product ? (
        <div>
          <ProductDescription data={product} />
          {productRequestID ? (
            <div>
              <Button
                onClick={() => acceptProductRequest({ requestID: product._id })}
              >
                Accept
              </Button>
              <Button
                onClick={() =>
                  declineProductRequest({ requestID: product._id })
                }
              >
                Decline
              </Button>
            </div>
          ) : isAdmin ? (
            <div>
              <Button onClick={handleShowEditProduct}>Edit</Button>
            </div>
          ) : (
            <div>
              <Button>Offer</Button>
            </div>
          )}
        </div>
      ) : (
        <div>No Product Selected</div>
      )}
    </div>
  );
};

export default DetailProduct;
