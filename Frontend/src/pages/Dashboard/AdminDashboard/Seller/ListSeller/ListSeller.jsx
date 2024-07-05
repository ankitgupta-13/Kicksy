import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MediaQuery from "react-responsive";
import { getSellers } from "../../../../../api/admin.api";
import { UserDashboardCard } from "../../../../../components";
import Pagination from "../../../../../components/Pagination/Pagination";
import style from "./ListSeller.module.css";

const ListSeller = () => {
  const [sellerList, setSellerList] = useState([]);
  const [page, setPage] = useState();
  const [sellerCount, setSellerCount] = useState(0);
  const currentAction = useSelector(
    (state) => state.adminDashboard.currentAction
  );

  useEffect(() => {
    (async () => {
      const response = await getSellers();
      if (response.statusCode === 200) {
        console.log(response);
        setSellerList(response.data.sellers);
        setPage(response.data.currentPage);
      }
    })();
  }, []);

  return (
    <div>
      <div className={style.container}>
        <div className={style.sectionTitle}>
          <div className={style.status}>Store Name</div>
          <div className={style.name}>Name</div>
          <div className={style.phone}>Phone Number</div>
          <MediaQuery minWidth={431}>
            <div className={style.phone}>Email</div>
          </MediaQuery>
        </div>
        {sellerList.map((seller, index) => {
          return (
            <div key={index}>
              <UserDashboardCard data={seller} type={currentAction} />
            </div>
          );
        })}
        <div className={style.pagination}>
          <Pagination
            count={Math.ceil(sellerCount / 10)}
            page={page}
            onChange={(value) => setPage(value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ListSeller;
