import { useEffect, useState } from "react";
import { getSellersRequest } from "../../../../../api/admin.api";

const RequestSeller = () => {
  const [requestList, setRequestList] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const response = await getSellersRequest();
  //     console.log(response);
  //     setRequestList(response.data);
  //   })();
  // });
  return (
    <div>
      {/* {requestList.map((request) => {
        return <div>{request}</div>;
      })} */}
    </div>
  );
};

export default RequestSeller;
