import { 
    MDBContainer, 
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCard,
    MDBCardBody,
    MDBBtn, 
    MDBCardText} from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
import bg from "assets/recent-game-bg.png"
const Login = () => {

    const login = (e) => {
        e.preventDefault();
        const {username, password} = e.target
        fetch(`${process.env.REACT_APP_API_URL}/auth/login?username=${username.value.toLowerCase()}&password=${password.value}`,{
            method: 'GET',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
        }).then(result => result.json())
        .then(data => {
            if (data.message !== "success") {        
				Swal.fire({
                    title: data.message,
                    icon: "info",
                    text: data.data
                })
			} else {
                Swal.fire({
                    title: "Login Successfully",
                    icon: "success",
                    text: `Welcome ${username.value.toLowerCase()}`
                  })
                  .then(result1 => {
                    if(result1.isConfirmed){
                        if(data.data.auth === "superadmin"){
                            localStorage.setItem('uid', btoa("superadmin"))
                            window.location.href = `superadmin/dashboard`
                        } else if(data.data.auth === "admin"){
                            localStorage.setItem('uid', btoa("admin"))
                            window.location.href = `admin/dashboard`
                        } else if(data.data.auth === "player"){
                            localStorage.setItem('uid', btoa("player"))
                            window.location.href = `user/dashboard`
                        }
                    }
                })
            }
        })

    }

    return (
       <MDBContainer fluid className="d-flex align-items-center justify-content-center min-vh-100" style={{background: `center/cover no-repeat url(${bg})`}}>
        <MDBRow>
            <MDBCol>
            <MDBCard shadow="0">
            <MDBCardBody>
            <MDBCardText tag="h1" className="text-center">Login</MDBCardText>
            <form onSubmit={login}>
                <MDBInput name="username" className='mb-4' type='text' id='form2Example1' label='Username' />
                <MDBInput name="password" className='mb-4' type='password' id='form2Example2' label='Password' />


                <div className='text-center'>
                <a href='#!'>Forgot password?</a>
                </div>

                <MDBBtn type='submit' className='mb-4' block>
                    Sign in
                </MDBBtn>

                <div className='text-center'>
                    <p>
                    Not a member? <a href='/register'>Register</a>
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

export default Login;