import style from "./UserDashboardCard.module.css";

const UserDashboardCard = ({ data }) => {
  const { username, email, role, status, mobile } = data;
  return (
    <div className={style.cardContainer}>
      <div className={style.nameEmail}>
        <div className={style.username}>{username}</div>
        <div className={style.email}>{email}</div>
      </div>
      <div className={style.phone}>{mobile.number}</div>
      <div className={style.role}>{role}</div>
      <div className={style.status}>Active</div>
    </div>
  );
};

export default UserDashboardCard;
