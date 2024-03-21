import React, {useState, useEffect} from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBInput,
    MDBRow,
    MDBCol
  } from 'mdb-react-ui-kit';
  import Swal from "sweetalert2";
const CashoutRequest = () => {
  const [mydetail, setMyDetail] = useState([])

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/getuserdetails`,{
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
        setMyDetail(data.data)
      }  else {
        Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
      }
    })
  },[])
    
    const handleRequestPayout = (e) => {
      e.preventDefault()
      const { wallettype, amount } = e.target
      fetch(`${process.env.REACT_APP_API_URL}/payout/requestpayout`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: wallettype.value,
          payoutvalue: amount.value
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
            text: 'Payout request successfull'
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

    return(
    <MDBCard>
      <MDBCardBody>
        <form onSubmit={handleRequestPayout}>
        <MDBRow>
            <MDBCol lg={6}>
            <label className="fw-bold text-black text-black">PAYMENT METHOD:</label>
            <MDBInput disabled value={mydetail.paymentmethod}/>
            </MDBCol>
            <MDBCol lg={6}>
            <label className="fw-bold text-black">SELECT WALLET:</label>
            <select name="wallettype" className="p-2" style={{width: "100%"}}>
                {/* <option>Wallet Balance</option> */}
                <option value='gamebalance'>Game Wallet</option>
                <option value='commissionbalance'>Commission Wallet</option>
            </select>
            </MDBCol>
        </MDBRow>
        <MDBRow>
            <MDBCol lg={6}>
            <label className="fw-bold text-black">ACCOUNT NUMBER:</label>
            <MDBInput disabled value={mydetail.accountnumber}/>
            </MDBCol> 
            <MDBCol lg={6}>
            <label className="fw-bold text-black">ENTER AMOUNT:</label>
            <MDBInput name="amount" type="number" min={1} required/>
            </MDBCol>
        </MDBRow>
        
        
        <MDBRow className="mt-2 align-items-center">
            <MDBCol lg={9} className="text-end text-danger fw-bold">
            <span  style={{fontSize: "12px"}}>PLEASE UPDATE YOUR PROFILE BEFORE REQUESTING A CASHOUT. CASHOUT REQUESTS ARE ONLY AVAILABLE ON TUESDAYS.</span>
            </MDBCol>
            <MDBCol className="text-end">
            <MDBBtn type="submit">Request</MDBBtn>
            </MDBCol>
        </MDBRow>
        </form>
        
        
      </MDBCardBody>
    </MDBCard>
    )
}

export default CashoutRequest;