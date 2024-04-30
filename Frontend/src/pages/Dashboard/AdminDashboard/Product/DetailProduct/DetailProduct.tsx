import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  acceptProductRequest,
  declineProductRequest,
} from "../../../../../api/admin.api";
import {
  addProductOffer,
  getProductById,
  getProductRequestById,
} from "../../../../../api/product.api";
import { Button, Input, ProductDescription } from "../../../../../components";
import { selectAdminAction } from "../../../../../redux/reducers/adminDashboardSlice";
import { RootState } from "../../../../../redux/store/store";
import style from "./DetailProduct.module.css";

const DetailProduct = () => {
  const userRole = useSelector((state: RootState) => state.auth.userData?.role);
  const isAdmin = userRole === "admin";
  const getProductId = (isAdmin: boolean) => {
    if (isAdmin) {
      return useSelector(
        (state: RootState) => state.adminDashboard.currentProduct
      );
    }
    return useSelector(
      (state: RootState) => state.sellerDashboard.currentProduct
    );
  };

  const productID = getProductId(isAdmin);

  const productRequestID = useSelector(
    (state: RootState) => state.adminDashboard.currentProductRequest
  );

  const userID = useSelector((state: RootState) => state.auth.userData?._id);
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [_, setImageUrls] = useState([]);
  const [showOffer, setShowOffer] = useState(false);
  const [quantity, setQuantity] = useState<Number>();
  const [price, setPrice] = useState<Number>();

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
              className={style.accept_dec_div}
              style={{
                position: "absolute",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                top: "65%",
                right: "3%",
              }}
            >
              <button
                className={style.accept}
                onClick={() => acceptProductRequest({ requestID: product._id })}
              >
                <span className={style.accept}>Accept</span>
              </button>
              <button
                className={style.decline}
                onClick={() =>
                  declineProductRequest({ requestID: product._id })
                }
              >
                <span className={style.decline}>Decline</span>
              </button>
            </div>
          ) : isAdmin ? (
            <div className={style.editdiv} style={{ position: "absolute", top: "75%", right: "3%" }}>
              <button onClick={handleShowEditProduct} className={style.edit}>
                <span className={style.edit}>Edit</span>
              </button>
            </div>
          ) : (
            <div style={{ position: "absolute", top: "50%", right: " 2%" }}>
              {!showOffer ? (
                <button className={style.edit} onClick={() => setShowOffer(!showOffer)} style={{color: "white",border: "none"}}>
                  <span className={style.edit} color="white">Add Offer</span>
                </button>
              ) : (
                <div>
                  <Input
                    label="Add Price"
                    style={{ borderRadius: "8px"}}
                    placeholder="Enter Price"
                    type="Number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPrice(Number(e.target.value))
                    }
                  />
                  <Input
                    label="Quantity"
                    style={{ borderRadius: "8px"}}
                    placeholder="Enter Quantity" 
                    type="Number"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setQuantity(Number(e.target.value))
                    }
                  />
                  <button style={{borderRadius: "8px", border: "none", backgroundColor: "#c1c1c1", width: "100%", padding: ".7rem", marginTop: "10px", fontSize: "1.2rem", fontWeight: 600, cursor: "pointer"}} type="submit" onClick={handleAddOffer}>
                    Add
                  </button>
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
