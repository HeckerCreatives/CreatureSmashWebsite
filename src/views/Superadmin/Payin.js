import { MDBContainer, MDBTypography, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn, MDBSpinner } from "mdb-react-ui-kit";
import React, { useState } from "react";
import SApayinhistory from "./Payin/payinhistory";
import SApayinlist from "./Payin/payinlist";
import Swal from "sweetalert2";
const SuperAdminPayin = () => {
    const [loading, setLoading] = useState(false)

    const handleSend = (e) => {
        e.preventDefault();
        setLoading(true)
        const {username, amount} = e.target

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, send it!"
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/payin/superadminsendfiatplayer`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        playerusername: username.value,
                        amount: amount.value
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
                        setLoading(false)
                        Swal.fire({
                            title: data.message,
                            icon: "success",
                            text: `Successfully sent ${amount.value} to ${username.value}`
                        }).then(ok => {
                            if(ok.isConfirmed){
                                window.location.reload()
                            }
                        })
                    } else if (data.message == "failed"){
                        setLoading(false)
                        Swal.fire({
                            title: data.message,
                            icon: "info",
                            text: data.data
                        })
                    }
                })
            } else {
                setLoading(false)
            }
          });
    }
    return (
        <div className="content">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg={4} md={6} sm={12} className="offset-lg-4">
                        <MDBCard>
                            <form onSubmit={handleSend}>
                            <MDBCardBody>
                                <MDBCardTitle>Top Up</MDBCardTitle>
                                <label>Player Username</label>
                                <MDBInput name="username" label="Input player username" required/>
                                <label>Amount</label>
                                <MDBInput name="amount" label="Input amount to send" min={1} required/>
                                <MDBBtn disabled={loading} type="submit">{loading ? <MDBSpinner size="sm"/> : 'Send'}</MDBBtn>
                            </MDBCardBody>
                            </form>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <MDBTypography tag={'h2'}>Payin List</MDBTypography>
                <SApayinlist/>
                <MDBTypography tag={'h2'}>Payin History</MDBTypography>
                <SApayinhistory/>
            </MDBContainer>
        </div>
    )
}

export default SuperAdminPayin;