import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../redux/store/store";
import { getUserById } from "../../../../../api/admin.api";

const DetailUser = () => {
  const userID = useSelector(
    (state: RootState) => state.adminDashboard.currentUser
  );
  const [userData, setUserData] = useState();
  useEffect(() => {
    (async () => {
      const response = await getUserById({ userID });
      if (response.statusCode === 200) {
        console.log(response.data);
        setUserData(response.data);
      }
    })();
  }, []);

  return <div>{<div>{userData.username}</div>}</div>;
};

export default DetailUser;
