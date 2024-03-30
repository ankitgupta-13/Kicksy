import { styled } from "@mui/material";
import style from "./analytics.module.css";
import React, { useEffect, useRef } from "react";

import Chart from "../../../../components/Chart/Chart.tsx";
import { Bar, Line } from 'react-chartjs-2';
import icon1 from "../../../../assets/salesDbI.png";
import icon2 from "../../../../assets/teamworkDbI.png";
import icon3 from "../../../../assets/trolleyDbI.png";
import icon4 from "../../../../assets/returnDbI.png";

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
  }
]



const Analytics = () => {

  return <div className={style.container}>
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
        <Chart/>
      </div>
      <div className={style.analyticsTwo_recentOrders}>
        <span>Recent Orders</span>
      </div>
    </div>
  </div>
};


export default Analytics;
