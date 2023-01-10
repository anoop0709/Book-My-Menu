import React, { useState } from 'react'
import './Card.css'
import {LayoutGroup} from "framer-motion";
import CompactCard from "../CompactCard/CompactCard"
import ExpandedCard from "../ExpandedCard/ExpandedCard"


function Card(props) {
  console.log(props);
const [expanded,setExpanded] = useState(false)

  return (
    <LayoutGroup>
      {
        expanded ? (
          <ExpandedCard props={props} setExpanded={()=> setExpanded(false)}/>
        ):(
          <CompactCard props={props} setExpanded={()=>setExpanded(true)}/>
        )

      }
    </LayoutGroup>
  )
}




export default Card
