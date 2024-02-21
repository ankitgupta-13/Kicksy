import React, { useEffect } from "react";
import { getAllUsers } from "../../../../api/admin.api";
import style from "./ListUser.module.css";
import UserDashboardCard from "../../../../components/UserDashboardCard/UserDashboardCard";

const ListUser = () => {
  const [users, setUsers] = React.useState([]);

  const allUsers = async () => {
    const response = await getAllUsers();
    console.log(response);
    if (response.statusCode === 200) {
      setUsers(response.data);
    }
  };
  useEffect(() => {
    allUsers();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.sectionTitle}>
        <div className={style.name}>Name</div>
        <div className={style.phone}>Phone Number</div>
        <div className={style.role}>Role</div>
        <div className={style.status}>Status</div>
      </div>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <UserDashboardCard data={user} />
          </div>
        );
      })}
    </div>
  );
};

export default ListUser;
