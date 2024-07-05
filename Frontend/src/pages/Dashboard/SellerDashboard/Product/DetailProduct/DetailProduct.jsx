import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../../../api/product.api";
import { ProductDescription } from "../../../../../components";
import { selectSellerAction } from "../../../../../redux/reducers/sellerDashboardSlice";
import { RootState } from "../../../../../redux/store/store";

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
        <button
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
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;
