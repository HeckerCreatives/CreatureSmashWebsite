import { 
    MDBCol, 
    MDBContainer, 
    MDBRow, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBInput} from "mdb-react-ui-kit";
import React, { useState, useEffect} from "react";
import CashinHistory from "./Cashinhistory/Cashinhistory";
import Swal from "sweetalert2";

const UserCashin = () => {
    const [wallet, setWallet] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/wallets/playerwallets`,{
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
                window.location.href = "/login"
            }
            })
        }

        if(data.message == "success"){
            setWallet(data.data)
        } else if (data.message == "failed"){
            Swal.fire({
            title: data.message,
            icon: "info",
            text: data.data
            })
        }
        })
    },[])

    const handleRequestPayin = async (e) => {
        e.preventDefault()
        const { amount } = e.target
        fetch(`${process.env.REACT_APP_API_URL}/payin/requestpayin`,{
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payinvalue: amount.value
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
                    window.location.href = "/login"
                }
                })
            }
    
            if(data.message == "success"){
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    text: "Payin request successfully sent"
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
    return (
        <div className="content">
            <MDBContainer>
            <MDBRow>
                <MDBCol lg={8} className="offset-lg-2">
                    <MDBCard>
                        <MDBCardBody>
                        <MDBRow>
                            <MDBCol lg={6}>
                            <form onSubmit={handleRequestPayin}>
                            <MDBCardTitle>Request Cashin:</MDBCardTitle>
                            <MDBInput min={1} type="number" name="amount" label="Input Amount"/>
                            <MDBBtn type="submit">Request</MDBBtn>
                            </form>
                            </MDBCol>
                            <MDBCol className="card-stats" lg={6} style={{borderLeft: window.innerWidth > 768 ? "grey solid 2px" : ""}}>
                                <MDBCard  shadow="0">
                                    <MDBCardBody>
                                    <MDBRow >
                                        <MDBCol md="4" xs="5">
                                            <div className="icon-big text-center icon-warning">
                                            <i className="nc-icon nc-diamond text-primary" />
                                            </div>
                                        </MDBCol>
                                        <MDBCol md="8" xs="7">
                                            <div className="numbers">
                                            <p className="card-category">Wallet Balance</p>
                                            <MDBCardTitle tag="p">
                                                {wallet.fiatbalance?.toLocaleString('en-US', {
                                                style: 'decimal',
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                                })}
                                            </MDBCardTitle>
                                            <p />
                                            </div>
                                        </MDBCol>
                                    </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            
                            </MDBCol>
                        </MDBRow>
                            
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
            <CashinHistory/>
            </MDBContainer>
        </div>
    )
}

export default UserCashin;