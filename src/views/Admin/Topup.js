import { 
    MDBContainer, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBRow,
    MDBCol,
    MDBInput,
    MDBTypography} from "mdb-react-ui-kit";
import React from "react";
import TopupHistory from "./Histories/Topuphistory";
import TopupList from "./Histories/Topuplist";
import Swal from "sweetalert2";
const AdminTopup = () => {
    const handleSend = (e) => {
        e.preventDefault()
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
                fetch(`${process.env.REACT_APP_API_URL}/payin/adminsendfiatplayer`,{
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
                        Swal.fire({
                            title: data.message,
                            icon: "info",
                            text: data.data
                        })
                    }
                })
            }
          });
    }

    return(
        <div className="content">
            <MDBContainer fluid>
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
                                <MDBBtn type="submit">Send</MDBBtn>
                            </MDBCardBody>
                            </form>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <TopupList/>
                <TopupHistory/>
            </MDBContainer>
        </div>
    )
}

export default AdminTopup;