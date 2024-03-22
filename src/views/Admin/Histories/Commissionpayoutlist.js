import PaginationPager from "components/Pagination/pagination";
import { 
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody,
    MDBTypography,
    MDBBtn,
    MDBSpinner
 } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
const CommissionPayoutList = () => {
    const [list, setList] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/payout/getpayoutlistadmin?page=${page - 1}&limit=10&type=commissionbalance`,{
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
                setList(data.data.payoutlist)
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

    const handlePayout = (id, status) => {
        setIsLoading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/payout/processpayoutadmin`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        payoutid: id,
                        status: status
                    })
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
                        Swal.fire({
                            title: data.message,
                            icon: "success",
                            text: `Payout successfully ${status}`
                        }).then(ok => {
                            if(ok.isConfirmed){
                                window.location.reload()
                            }
                        })
                    } else if (data.message == "failed"){
                        setIsLoading(false)
                        Swal.fire({
                            title: data.message,
                            icon: "info",
                            text: data.data
                        })
                    }
                })
            } else {
                setIsLoading(false)
            }
          });
    }

    return (
        <MDBContainer>
            <MDBTypography tag={'h2'}>Commission Payout List</MDBTypography>
            <MDBCard>
                <MDBCardBody>
                    {/* <MDBCardTitle>Top Up History</MDBCardTitle> */}
                    <MDBTable small responsive>
                    <MDBTableHead>
                        <tr className="text-center">
                        <th scope='col'>Username</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Payment Method</th>
                        <th scope='col'>Account Number</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Action</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                    {
                        list.length !== 0 ?
                            list.map((data, i) =>(
                            <tr key={i} className="text-center">
                                <th scope='row'>{data.username}</th>
                                <td>{data.value?.toLocaleString('en-US', {
                                style: 'decimal',
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                                })}</td>
                                <td>{data.paymentmethod}</td>
                                <td>{data.accountnumber}</td>
                                <td>{data.status}</td>
                                <td>
                                    <MDBBtn disabled={isloading} className="m-1" size="sm" color="info" onClick={() => handlePayout(data.id, "done")}>
                                       {isloading ? <MDBSpinner size="sm"/> : 'Process'}
                                    </MDBBtn>
                                    <MDBBtn disabled={isloading} className="m-1" size="sm" color="danger" onClick={() => handlePayout(data.id, "reject")}>
                                    {isloading ? <MDBSpinner size="sm"/> : 'Reject'}
                                    </MDBBtn>
                                </td>
                            </tr>
                            ))
                        :
                        <tr className="text-center">
                        <th scope='row' colSpan={6}>No Data</th>
                        </tr>
                    }
                    </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
            <PaginationPager
            total={total} 
            page={page} 
            setPage={setPage}
            isloading={isloading}
            />
        </MDBContainer>
    )
}

export default CommissionPayoutList;