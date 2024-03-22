import { 
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBInput,
    MDBSpinner
 } from "mdb-react-ui-kit";
import React, { useState } from "react";
import Swal from "sweetalert2";
const UserChangePass = () => {
    const [loading, setLoading] = useState(false)
    const handleChangePass = (e) => {
        e.preventDefault()
        setLoading(true)
        const {password, confirmpassword} = e.target
        if(confirmpassword.value !== password.value){
            setLoading(false)
            Swal.fire({
                title: "Check your input password",
                icon: "error",
                text: "Please check the password you input"
            })
        } else {
            fetch(`${process.env.REACT_APP_API_URL}/user/changepassworduser`,{
                method: 'POST',
                credentials: 'include',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password.value
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
                        text: "Password Successfully Change"
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
        }
        
    }
    return (
        <div className="content">
            <MDBContainer>
            <MDBCard>
            <MDBCardBody>
                <form onSubmit={handleChangePass}>
                <MDBCardTitle>Change Password</MDBCardTitle>
                <label>Password</label>
                <MDBInput type="password" name="password" label="Input Password Here" required/>
                <label>Confirm Password</label>
                <MDBInput type="password" name="confirmpassword" label="Input Confirm Password Here" required/>
                <MDBBtn disabled={loading} type="submit">{loading ? <MDBSpinner size="sm"/> : 'Save'}</MDBBtn>
                </form>
            </MDBCardBody>
            </MDBCard>
            </MDBContainer>
        </div>
    )
}

export default UserChangePass;