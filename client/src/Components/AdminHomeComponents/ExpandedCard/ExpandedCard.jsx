import React from 'react'
import "./ExpandedCard.css"
import { UilTimes } from "@iconscout/react-unicons"
import Chart from "react-apexcharts";
import {motion} from "framer-motion"
function ExpandedCard({props, setExpanded}) {
  const data = {
    options: {
      chart: {
        type: "area",
        height: "auto",
      },

      dropShadow: {
        enabled: false,
        enabledOnSeries: undefined,
        top: 0,
        left: 0,
        blur: 3,
        color: "#000",
        opacity: 0.35,
      },

      fill: {
        colors: ["#fff"],
        type: "gradient",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        colors: ["white"],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      grid: {
        show: true,
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
        ],
      },
    },
  };
  const transition = { type:"easeOut",duration:3 }
  return (
    <motion.div className="ExpandedCard"
    transition={transition}
      style={{ background: props.color.backGround, boxShadow: props.color.boxShadow }} >
      <div style={{alignSelf:'flex-end',cursor:'pointer',color:'white'}}>
        <UilTimes onClick={setExpanded}  />
      </div>
      <span>{props.title}</span>
      <div className="chartContainer">
      <Chart series={props.series} type='area' options={data.options}/>
       </div>
      <span>Last 24 hrs</span>
    </motion.div>
  )
}

export default ExpandedCard
