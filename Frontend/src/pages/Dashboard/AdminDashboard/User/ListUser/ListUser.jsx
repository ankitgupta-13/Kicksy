import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import MediaQuery from "react-responsive";
import { getUsers, totalUsersCount } from "../../../../../api/admin.api";
import UserAdminDashboardCard from "../../../../../components/UserDashboardCard/UserDashboardCard";
import style from "./ListUser.module.css";

const ListUser = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [usersCount, setUsersCount] = useState(0);

  const fetchUsers = async (page) => {
    const response = await getUsers(page);
    if (response.statusCode === 200) {
      setUsers(response.data.users);
    }
  };

  const getUsersCount = async () => {
    const response = await totalUsersCount();
    if (response.statusCode === 200) {
      setUsersCount(response.data);
    }
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  useEffect(() => {
    getUsersCount();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.name}>Name</div>
        <div className={style.phone}>Phone Number</div>
        <MediaQuery minWidth={431}>
          <div className={style.role}>Email</div>
        </MediaQuery>
        <div className={style.status}>Status</div>
      </div>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <UserAdminDashboardCard data={user} />
          </div>
        );
      })}
      <div className={style.pagination}>
        <Pagination
          count={Math.ceil(usersCount / 10)}
          page={page}
          onChange={(e, value) => setPage(value)}
        />
      </div>
    </div>
  );
};

export default ListUser;
