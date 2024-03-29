import { styled } from "@mui/material";
import style from "./analytics.module.css";
import React, { useEffect, useRef } from "react";

import { Chart } from 'react-chartjs-2';
import { Bar, Line } from 'react-chartjs-2';
import icon1 from "../../../../assets/salesDbI.png";
import icon2 from "../../../../assets/teamworkDbI.png";
import icon3 from "../../../../assets/trolleyDbI.png";
import icon4 from "../../../../assets/returnDbI.png";

const oneCards = [
  {
    "title": "Sales",
    "value": "999",
    // "icon": "https://img.icons8.com/plasticine/100/receive-cash.png",
    "icon": icon1
  },
  {
    "title": "Customers",
    "value": "9",
    // "icon": "https://img.icons8.com/plasticine/100/budget.png",
    "icon": icon2
  },
  {
    "title": "Orders",
    "value": "99",
    // "icon": "https://img.icons8.com/plasticine/100/purchase-order.png",
    "icon": icon3
  },
  {
    "title": "Returned Orders",
    "value": "5",
    // "icon": "https://img.icons8.com/plasticine/100/replace.png",
    "icon": icon4
  }
]



const Analytics = () => {

  const chartRef = useRef(null);

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3],
        type: 'line',
        fill: false,
        borderColor: '#EC932F',
        backgroundColor: '#EC932F',
        pointBorderColor: '#EC932F',
        pointBackgroundColor: '#EC932F',
        pointHoverBackgroundColor: '#EC932F',
        pointHoverBorderColor: '#000'
      },
      {
        label: 'Visitor',
        data: [51, 65, 40, 49, 60, 37],
        type: 'bar',
        fill: false,
        backgroundColor: '#71B37C',
        borderColor: '#71B37C',
        hoverBackgroundColor: '#71B37C',
        hoverBorderColor: '#71B37C',
      }
    ]
  };

  const options = {
    responsive: true,
    tooltips: {
      mode: 'label'
    },
    elements: {
      line: {
        fill: false
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false
          }
        }
      ]
    }
  };

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        const chartInstance = chartRef.current.chartInstance;
        chartInstance.destroy();
      }
    };
  }, [data, options]);

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
        <Bar ref={chartRef} data={data} options={options} />
      </div>
      <div className={style.pieChart}>

      </div>
    </div>
  </div>
};


export default Analytics;
