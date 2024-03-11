import { useEffect, useState } from "react";
import { getSellerRequests } from "../../../../../api/admin.api";
import RequestCard from "../../../../../components/RequestCard/RequestCard";

const RequestSeller = () => {
  const [requestList, setRequestList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getSellerRequests();
      if (response.statusCode === 200) {
        setRequestList(response.data.requests);
        setPage(response.data.page);
      }
    })();
  }, []);

  return (
    <div>
      {requestList.map((request, index) => {
        return (
          <div key={index}>
            <RequestCard
              type="seller"
              id={request._id}
              name={request.storeName}
              logo={request.storeLogo}
            />
          </div>
        );
      })}
    </div>
  );
};

export default RequestSeller;
