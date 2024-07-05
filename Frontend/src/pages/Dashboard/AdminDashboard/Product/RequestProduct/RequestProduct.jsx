import { useEffect, useState } from "react";
import { getProductRequests } from "../../../../../api/admin.api";
import ProductDashboardCard from "../../../../../components/ProductDashboardCard/ProductDashboardCard";
import style from "./RequestProduct.module.css";

const RequestProduct = () => {
  const [requestList, setRequestList] = useState([]);
  const [acceptedProducts, setAcceptedProducts] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getProductRequests();
      if (response.statusCode === 200) {
        setRequestList(response.data.requests);
        setPage(response.data.page);
      }
    })();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.text}>Product</div>
        <div className={style.text}>Create At</div>
        <div className={style.text}>Stock</div>
        <div className={style.text}>Price</div>
      </div>
      {requestList.length === 0 ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "20px",
          }}
        >
          No Request Found
        </div>
      ) : (
        requestList.map((request, index) => {
          return (
            <div key={index}>
              <ProductDashboardCard data={request} type="request" />
            </div>
          );
        })
      )}
      <div className={style.pagination}>
        {/* <Pagination
          count={Math.ceil( / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
        /> */}
      </div>
    </div>
  );
};

export default RequestProduct;
