import React from 'react'
import {CircularProgressbar} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css";
import './CompactCard.css'
import {motion} from "framer-motion"

function CompactCard({props,setExpanded}) {
  const Png = props.png;
  console.log(Png);
    return(
      <motion.div className="CompactCard" 
      style={{
          background:props.color.backGround,
          boxShadow: props.color.boxShadow

      }}
      onClick={setExpanded}
      
      >
        <div className="radialBar">
          <CircularProgressbar
           value = {props.barValue}
           text = {`${props.barValue}%`}
           />
           <span>{props.title}</span>
  
        </div>
        <div className="detail">
          <span>{<Png/>}</span>
          <span>${props.value}</span>
          <span>Last 24 hours</span>
        </div>
      </motion.div>
    )
  
}

export default CompactCard
