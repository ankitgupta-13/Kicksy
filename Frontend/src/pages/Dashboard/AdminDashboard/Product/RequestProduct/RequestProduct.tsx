import { useEffect, useState } from "react";
import {
  getAcceptedProducts,
  getProductRequests,
  getSellerRequests,
} from "../../../../../api/admin.api";
import RequestCard from "../../../../../components/RequestCard/RequestCard";
import style from "./RequestProduct.module.css";
import ProductAdminDashboardCard from "../../../../../components/ProductAdminDashboardCard/ProductAdminDashboardCard";

const RequestProduct = () => {
  const [requestList, setRequestList] = useState([]);
  const [acceptedProducts, setAcceptedProducts] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getProductRequests();
      console.log(response);
      if (response.statusCode === 200) {
        setRequestList(response.data.requests);
        setPage(response.data.page);
      }
      const response1 = await getAcceptedProducts();
      if (response1.statusCode === 200) {
        setAcceptedProducts(response1.data);
      }
    })();
  }, []);

  return (
    <div>
      {requestList.map((request, index) => {
        return (
          <div key={index}>
            <RequestCard
              type="product"
              id={request._id}
              name={request.title}
              logo={request.images[0]}
            />
            <div className={style.acceptedProducts}>
              {acceptedProducts.map((acceptedProduct, index) => {
                return (
                  <div key={index}>
                    <ProductAdminDashboardCard
                      data={acceptedProduct}
                      // onDelete="delete"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RequestProduct;
