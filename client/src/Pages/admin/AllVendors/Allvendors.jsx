import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { blockVendor, unblockVendor } from "../../../actions/AdminActions"
import DataTable from "react-data-table-component"
import "./Allvendors.css"


function Allvendors() {
    const customStyles = {
        pagination: {
            style: {
                fontSize: "16px",
                color: "black"
            },
        },
        rows: {
            style: {
                fontSize: "16px"
            }
        },
        headRow: {
            style: {
                fontSize: "16px",
                fontWeight: "bold"
            }
        }

    }

    const dispatch = useDispatch();
    const Vendors = useSelector((state) => { return state.AllVendors.authData });
    console.log(Vendors);
    const [data, setData] = useState(Vendors)
    const [filterresult, setFilterresult] = useState(Vendors)
    const [search, setSearch] = useState("");
    const [block, setBlock] = useState(false);
    const [pending,setPending] = useState(true);



    const columns = [
        {
            name: "FIRST NAME",
            selector: row => row.firstname,
            sortable: true
        },
        {
            name: "LAST NAME",
            selector: row => row.lastname
        }, {
            name: "EMAIL",
            selector: row => row.email
        }, {
            name: "PHONE NUMBER",
            selector: row => row.phonenumber
        },
        {
            name: "ACTIONS",
            cell: row => row.isBlocked ?
                <button className="Btn "
                    onClick={() => {
                        dispatch(unblockVendor(row._id));
                        setBlock(false)
                    }}>UN BLOCK</button> :
                <button className="Btn unblock"
                    onClick={() => {
                        dispatch(blockVendor(row._id));
                        setBlock(true)
                    }}>BLOCK</button>

        },
        {
            name: "STATUS",
            cell: row => row.isApproved ?
                <button className="Btn approved">ONLINE</button> :

                <div className="approvebtn">
                    <h5 style={{ color: "red" }}>NOT VERIFIED</h5>
                </div>
        }

    ]
    useEffect(() => {
        const timeout = setTimeout(()=>{
            setData(Vendors);
            setPending(false)

        },2000)
        return ()=> clearTimeout(timeout);

    }, [columns])

    useEffect(() => {
        const result = data.filter((vendor) => {
            return vendor.firstname.toLowerCase().match(search.toLowerCase())
        })

        setFilterresult(result)
    }, [search])

    return (
        <div className="allvendorContainer">
           

        

            <DataTable
                title="VENDOR LIST"
                columns={columns}
                data={search ? filterresult : data}
                pagination
                fixedHeader
                subHeader
                highlightOnHover
                customStyles={customStyles}
                progressPending={pending}
               
                subHeaderComponent={
                    <input type="text"
                        placeholder="search here with first name"
                        className="inpsearch"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                }


            />
        </div>
    )
}



export default Allvendors
