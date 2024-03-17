import { useEffect, useState } from "react";
import { getSellers } from "../../../../../api/admin.api";
import UserAdminDashboardCard from "../../../../../components/UserAdminDashboardCard/UserAdminDashboardCard";
import Pagination from "../../../../../components/Pagination/Pagination";
import style from './ListSeller.module.css'

const ListSeller = () => {
  const [sellerList, setSellerList] = useState([]);
  const [page, setPage] = useState();
  const [sellerCount, setSellerCount] = useState(0);

  useEffect(() => {
    (async () => {
      const response = await getSellers();
      if (response.statusCode === 200) {
        setSellerList(response.data.sellers);
        console.log(sellerList);
        setPage(response.data.page);
      }
    })();
  }, []);

  return (
    <div>
      <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.name}>Name</div>
        <div className={style.phone}>Phone Number</div>
        <div className={style.role}>Role</div>
        <div className={style.status}>Status</div>
      </div>
      {sellerList.map((seller, index) => {
        return (
          <div key={index}>
            <UserAdminDashboardCard data={seller} />
          </div>
        );
      })}
      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(sellerCount / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
    </div>
  );
};

export default ListSeller;
