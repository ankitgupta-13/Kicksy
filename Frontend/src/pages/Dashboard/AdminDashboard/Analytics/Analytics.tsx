import { useEffect, useState } from "react";
import { totalActiveUsers } from "../../../../api/admin.api";
import style from "./Analytics.module.css";

import Chart from "../../../../components/Chart/Chart.tsx";
import PiChart from "../../../../components/PiChart/PiChart.tsx";
import icon1 from "../../../../assets/salesDbI.png";
import icon2 from "../../../../assets/teamworkDbI.png";
import icon3 from "../../../../assets/trolleyDbI.png";
import icon4 from "../../../../assets/returnDbI.png";



// SAMPLE DATA
const recentOrders = [
  {
    "title": "Air Max",
    "value": "2555",
    "icon": icon1
  },
  {
    "title": "Air Jordan",
    "value": "19999",
    "icon": icon1
  },
  {
    "title": "Adidas",
    "value": "4555",
    "icon": icon1
  },
  {
    "title": "Air Jordan",
    "value": "19999",
    "icon": icon1
  }
]

const Analytics = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  const getActiveUsers = async () => {
    const response = await totalActiveUsers();
    const count = response.data;
    setActiveUsers(count);
  };
  useEffect(() => {
    getActiveUsers();
  }, []);

  //SAMPLE DATA
const oneCards = [
  {
    "title": "Sales",
    "value": "999",
    "icon": icon1
  },
  {
    "title": "Customers",
    "value": "9",
    "icon": icon2
  },
  {
    "title": "Orders",
    "value": "99",
    "icon": icon3
  },
  {
    "title": "Returned Orders",
    "value": "5",
    "icon": icon4
  },
  {
    "title": "Active Users",
    "value": `${activeUsers}`,
    "icon": icon4
  }
]

  return (
    <div className={style.container}>
      <div className={style.analyticsOne} style={{ padding: 0 }}>
        <div className={style.analyticsOne_card} >
          {oneCards.map((card, index) => {
            return (
              <div className={style.card_container} key={index}>
                <img src={card.icon} alt="icon" className={style.cardIcon} />
                <div className={style.cardContent}>
                  <div className={style.cardValue}>{card.value}</div>
                  <div className={style.cardTitle}>{card.title}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={style.analyticsTwo}>
        <div className={style.mixChart}>
          <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>Website Visits</span>
          <Chart />
        </div>
        <div className={style.analyticsTwo_recentOrders}>
          <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>Recent Orders</span>
          <PiChart />
        </div>
      </div>
      <div className={style.analyticsThree}>
        <span style={{ fontSize: "1.2rem", fontWeight: 600 }}>Recent Orders</span>
        <div className={style.analyticsThree_recentOrders}>
          {recentOrders.map((order, index) => {
            return (
              <div className={style.card_container} key={index} style={{ width: "90%", marginTop: "1.2rem" }}>
                <img src={order.icon} alt="icon" className={style.cardIcon} />
                <div className={style.cardContent}>
                  <div className={style.cardValue}>{order.value}</div>
                  <div className={style.cardTitle}>{order.title}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
