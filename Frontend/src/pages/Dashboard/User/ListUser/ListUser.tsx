import React, { useEffect } from "react";
import { getAllUsers } from "../../../../api/admin.api";

const ListUser = () => {
  const [users, setUsers] = React.useState([]);

  const response = async () => {
    const response = await getAllUsers();
    console.log(response);
    if (response.statusCode === 200) {
      setUsers(response.data);
    }
  };
  useEffect(() => {
    response();
  }, []);

  return (
    <div>
      {users.map((user, index) => {
        return (
          <div key={index}>
            <div>{user.email}</div>
            <div>{user.username}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ListUser;
