import React, { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBTable, MDBTableHead, MDBTableBody
  } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import PaginationPager from "components/Pagination/pagination";
const SAcommissionpayouthistory = () => {
    const [commissionpayouthistory, setCommissionPayoutHistory] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);
    
    useEffect(() => {
      setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/payout/getpayouthistorysuperadmin?page=${page - 1}&limit=10&type=commissionbalance`,{
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
        }).then(result => result.json())
        .then(data => {
            if(data.message == "duallogin" || data.message == "banned" || data.message == "Unathorized"){
                Swal.fire({
                  icon: "error",
                  title: data.message == "duallogin" ? "Dual Login" : data.message == "banned" ? "Account Banned." : data.message,
                  text: data.message == "duallogin" ? "Hi Creature, it appears that your account has been accessed from a different device." : data.message == "banned" ? "Hi Creature please contact admin" : "You Will Redirect to Login",
                  allowOutsideClick: false,
                  allowEscapeKey: false
                }).then(ok => {
                  if(ok.isConfirmed){
                    window.location.href = "/login";
                  }
                })
            }

            if(data.message == "success"){
                setIsLoading(false)
                setCommissionPayoutHistory(data.data.history)
                setTotal(data.data.totalPages)
            } else if (data.message == "failed"){
              setIsLoading(false)
              Swal.fire({
                  title: data.message,
                  icon: "info",
                  text: data.data
              })
            }
        })
    },[page])

    return(
    <MDBCard>
      <MDBCardBody>
        {/* <MDBCardTitle>Payin History</MDBCardTitle> */}
        <MDBTable small responsive>
        <MDBTableHead>
            <tr className="text-center">
            <th scope='col'>Username</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Status</th>
            <th scope='col'>Process By</th>
            </tr>
        </MDBTableHead>
        <MDBTableBody>
            {
                commissionpayouthistory.length !== 0 ?
                    commissionpayouthistory.map((data, i) =>(
                    <tr key={i} className="text-center">
                        <th scope='row'>{data.owner.username}</th>
                        <td>{data.value?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}</td>
                        <td>{data.status}</td>
                        <td>{data.processby.username}</td>
                    </tr>
                    ))
                :
                <tr className="text-center">
                <th scope='row' colSpan={4}>No Data</th>
                </tr>
            }
        </MDBTableBody>
        </MDBTable>
        <PaginationPager
          total={total} 
          page={page} 
          setPage={setPage}
          isloading={isloading}
          />
      </MDBCardBody>
    </MDBCard>
    )
}

export default SAcommissionpayouthistory;