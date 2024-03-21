import { 
    MDBContainer, 
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBBtn, 
    MDBCardText,
    MDBIcon
} from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import bg from "assets/register-bg.png"
import Swal from "sweetalert2";
const Register = () => {
  const [referral, setReferral] = useState("")
  const [referralusername, setReferralUsername] = useState("")
  useEffect(()=> {
    const url = new URL(window.location.href)
    const params = new URLSearchParams(url.search);
    const id = params.get('id');
    if(id != null){
      fetch(`${process.env.REACT_APP_API_URL}/auth/getreferralusername?id=${id}`,{
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(result => result.json())
      .then(data => {
        if(data.message == "success"){
          setReferral(id)
          setReferralUsername(data.data)
        } else {
          Swal.fire({
            title: data.message,
            text: data.data,
            icon: "error"
          })
        }
      })
    } else {
      window.location.href = "/register?id=65eeeeabd9576a4f8ae38afd";
    }
  },[])

  const register = (e) => {
    e.preventDefault();
    const {username, password,  email, confirmpassword} = e.target

    if(password.value !== confirmpassword.value){
      Swal.fire({
        title: "Password not Match",
        text: "Please Check Input Password",
        icon: "error"
      })
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/auth/register`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username.value.toLowerCase(),
          password: password.value,
          referral: referral,
          email: email.value
        })
      }).then(result => result.json())
      .then(data => {
        if(data.message == "success"){
          Swal.fire({
            title: "Registered successfully",
            icon: "success"
          }).then(ok => {
            if(ok.isConfirmed){
              window.location.href = "/login"
            }
          })
        }
      })
      .catch(err => {
        Swal.fire({
          title: "Error",
          text: err,
          icon: "error"
        })
      })
    }
    
  }

    return (
        <MDBContainer fluid className="d-flex align-items-center justify-content-center min-vh-100" style={{background: `center/cover no-repeat url(${bg})`}}>
        <MDBRow>
            <MDBCol>
            <MDBCard>
            <MDBCardBody>
            <MDBCardText tag="h1" className="text-center">Register</MDBCardText>
            <form onSubmit={register}>
              
              <MDBInput className='mb-4' name="username" label='Username' required/>
              <MDBInput className='mb-4' name="email" type='email' label='Email address' required/>
              
              <MDBRow className='mb-4'>
                <MDBCol>
                <MDBInput name="password"  type='password' label='Password' required/>
                </MDBCol>
                <MDBCol>
                <MDBInput name="confirmpassword" type='password'  label='Confirm Password' />
                </MDBCol>
              </MDBRow>

              <MDBInput name="referral" className='mb-4' value={referralusername} label='Referral' disabled required/>

              <MDBBtn type='submit' className='mb-4' block>
                Sign up
              </MDBBtn>

              <div className='text-center'>
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              
              </div>
            </form>
                </MDBCardBody>
            </MDBCard>
            </MDBCol>
        </MDBRow>
       </MDBContainer>
    )
}

export default Register;