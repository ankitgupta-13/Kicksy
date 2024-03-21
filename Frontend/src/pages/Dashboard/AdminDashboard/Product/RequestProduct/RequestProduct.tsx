import { useEffect, useState } from "react";
import { getProductRequests } from "../../../../../api/admin.api";
import style from "./RequestProduct.module.css";
import ProductDashboardCard from "../../../../../components/ProductDashboardCard/ProductDashboardCard";
import { Pagination } from "@mui/material";

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
    })();
  }, []);

  return (
    <div>
      {requestList.length === 0 ? (
        <div>No Request Found</div>
      ) : (
        requestList.map((request, index) => {
          return (
            <div key={index}>
              <ProductDashboardCard data={request} type="request" />
            </div>
          );
        })
      )}
    </div>
  );
};

export default RequestProduct;
