import { useDispatch, useSelector } from "react-redux";
import style from "./DetailProduct.module.css";
import { RootState } from "../../../../../redux/store/store";
import { useEffect, useState } from "react";
import {
  addProductOffer,
  getProductById,
  getProductRequestById,
} from "../../../../../api/product.api";
import {
  acceptProductRequest,
  declineProductRequest,
  updateProduct,
} from "../../../../../api/admin.api";
import { Button, Input, ProductDescription } from "../../../../../components";
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

  const userID = useSelector((state: RootState) => state.auth.userData._id);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [imageUrls, setImageUrls] = useState([]);
  const [showOffer, setShowOffer] = useState(false);
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();

  const handleUpdateProduct = (updatedProduct) => {
    try {
      const response = updateProduct(updatedProduct);
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

  const handleAddOffer = async () => {
    try {
      const response = await addProductOffer({
        productID,
        userID,
        productPrice: price,
        quantity,
      });
      if (response.statusCode === 200) {
        alert("Offer Added Successfully");
      } else if (response.statusCode === 400) {
        alert("Offer Already Exist!");
      }
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
        <div style={{ marginTop: "20px" }}>
          <ProductDescription data={product} />
          {productRequestID ? (
            <div
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                top: "30%",
                right: " 10%",
              }}
            >
              <Button
                className={style.accept}
                onClick={() => acceptProductRequest({ requestID: product._id })}
              >
                <span className={style.accept}>Accept</span>
              </Button>
              <Button
                className={style.decline}
                onClick={() =>
                  declineProductRequest({ requestID: product._id })
                }
              >
                <span className={style.decline}>Decline</span>
              </Button>
            </div>
          ) : isAdmin ? (
            <div style={{ position: "absolute", top: "30%", right: " 10%" }}>
              <Button onClick={handleShowEditProduct}>
                <span className={style.edit}>Edit</span>
              </Button>
            </div>
          ) : (
            <div style={{ position: "absolute", top: "30%", right: " 10%" }}>
              {!showOffer ? (
                <Button onClick={() => setShowOffer(!showOffer)}>
                  <span className={style.edit}>Add Offer</span>
                </Button>
              ) : (
                <div>
                  <Input
                    label="Add Price"
                    type="Number"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <Input
                    label="Quantity"
                    type="Number"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <Button type="submit" onClick={handleAddOffer}>
                    Add
                  </Button>
                </div>
              )}
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
