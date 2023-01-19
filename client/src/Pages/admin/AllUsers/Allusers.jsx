import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {blockUser,unblockUser} from "../../../actions/AdminActions"
import DataTable from "react-data-table-component"
import "./Allusers.css"


function Allusers() {

    const customStyles = {
        pagination:{
            style:{
                fontSize:"16px",
                color:"black"
            },
        },
        rows:{
            style:{
                fontSize:"16px"
            }
        },
        headRow:{
            style:{
                fontSize:"16px",
                fontWeight:"bold"
            }
        }

    }

   
    
   
   const dispatch = useDispatch(); 
   const Users = useSelector((state)=> {return state.AllUsers.authData});
   

   
    console.log(Users);
    const [data,setData] = useState(Users)
    const [filterresult,setFilterresult] = useState(Users)
    const [search,setSearch] = useState("");
    const [block,setBlock] = useState(false)
    
    useEffect(()=>{
        const result = data.filter((user)=>{
            return user.firstname.toLowerCase().match(search.toLowerCase())
        })

        setFilterresult(result)
    },[search])
   


   
    
       
    


    

    const columns = [
        {
            name:"FIRST NAME",
            selector:row=>row.firstname,
            sortable:true
        },
        {
            name:"LAST NAME",
            selector:row=>row.lastname
        }, {
            name:"EMAIL",
            selector:row=>row.email
        }, {
            name:"PHONE NUMBER",
            selector:row=>row.phonenumber
        },
        {
            name:"ACTIONS",
            cell:row => row.isBlocked ? 
            <button className="Btn "
             onClick={()=>{
                dispatch(unblockUser(row._id));
                setBlock(false)
               }}>UN BLOCK</button>:
            <button  className="Btn unblock"
               onClick={()=> {
                dispatch(blockUser(row._id));
              setBlock(true)
               }}>BLOCK</button>
                  
        }
    ]
    useEffect(()=>{
        setFilterresult(Users);

    },[columns])

    
    return (
        <div className="Container">

            <DataTable 
           
           columns={columns}
            data={filterresult}
            pagination
            fixedHeader
            subHeader
            highlightOnHover
            customStyles={customStyles}
            subHeaderComponent={
                <input type="text"
                 placeholder="search here" 
                 className="inpsearch" 
                 value = {search}
                 onChange = {(e)=>setSearch(e.target.value)}
                 />
            }
            subHeaderAlign="left"
            
             />   
        </div>
    )
}

export default Allusers
