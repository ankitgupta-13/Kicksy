import { useEffect, useState } from "react";
import { getSellers } from "../../../../../api/admin.api";

const ListSeller = () => {
  const [sellerList, setSellerList] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      const response = await getSellers();
      if (response.statusCode === 200) {
        setSellerList(response.data.sellers);
        setPage(response.data.page);
      }
    })();
  }, []);

  return (
    <div>
      {sellerList.map((seller, index) => {
        return (
          <div key={index}>
            <div>{seller.storeName}</div>
          </div>
        );
      })}
      {page}
    </div>
  );
};

export default ListSeller;
