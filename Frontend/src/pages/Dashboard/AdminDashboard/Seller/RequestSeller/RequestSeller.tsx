import { useEffect, useState } from "react";
import { getSellerRequests } from "../../../../../api/admin.api";
import { UserDashboardCard } from "../../../../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import style from "./Request.module.css";
import MediaQuery from "react-responsive";

const RequestSeller = () => {
  const [requestList, setRequestList] = useState([]);
  const [page, setPage] = useState(1);

  const currentAction = useSelector(
    (state: RootState) => state.adminDashboard.currentAction
  );

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
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.status}>Store Name</div>
        <div className={style.name}>Name</div>
        <div className={style.phone}>Phone Number</div>
        <MediaQuery minWidth={431}>
          <div className={style.phone}>Email</div>
        </MediaQuery>
      </div>
      {requestList.length === 0 ? (
        <div style={{ textAlign: "center", fontFamily: "Noir Pro", fontSize: "3rem", height: "69vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#888" }}>No requests found!</div>
      ) : (
        requestList.map((request, index) => {
          return (
            <div key={index}>
              <UserDashboardCard data={request} type={currentAction} />
            </div>
          );
        })
      )}
    </div>
  );
};

export default RequestSeller;
