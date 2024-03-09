import { useEffect, useState } from "react";
import { getAllSellers } from "../../../../../api/admin.api";

const ListSeller = () => {
  const [sellerList, setSellerList] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await getAllSellers();
      if (response.statusCode === 200) {
        console.log(response.data);
        setSellerList(response.data);
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
    </div>
  );
};

export default ListSeller;
