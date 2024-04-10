import { Button, ProductDescription } from "../../../../../components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { selectSellerAction } from "../../../../../redux/reducers/sellerDashboardSlice";
import { useEffect, useState } from "react";
import { getProductById } from "../../../../../api/product.api";
import style from "./DetailProduct.module.css";

const DetailProduct = () => {
  const productID = useSelector(
    (state: RootState) => state.sellerDashboard.currentProduct
  );
  const [productData, setProductData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await getProductById({ productID });
      console.log(response.data);
      setProductData(response.data);
    })();
  }, []);
  const dispatch = useDispatch();
  return (
    <div>
      <ProductDescription data={productData} />
      <div>
        <Button
          onClick={() =>
            dispatch(
              selectSellerAction({
                selectedSection: "Product",
                selectedAction: "Edit",
              })
            )
          }
        >
          Add Offer
        </Button>
      </div>
    </div>
  );
};

export default DetailProduct;
