import { Card, CardImg, CardBody, CardText, Col, CardFooter, Button, CardTitle, CardSubtitle } from 'reactstrap';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardSubTitle,
    MDBCardText,
    MDBCardLink,
    MDBCardImage,
    MDBBtn,
    MDBInput
} from 'mdb-react-ui-kit';
import React from "react";
import plankton from "../../assets/img/plankton.jpg"
import Swal from 'sweetalert2';
const CreatureCard = ({title, description, amount, image, type}) => {
    
    const handleBuy = (e) => {
        e.preventDefault();
        const {qty} = e.target
        fetch(`${process.env.REACT_APP_API_URL}/inventory/buycreature`,{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                qty: qty.value
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
                    text: `You successfully bought ${title}`
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload();
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
        <Col lg="3" md="6" sm="6" className="d-flex justify-content-center">
        <MDBCard alignment='' style={{width: '20rem'}}>
            <form onSubmit={handleBuy}>
                <MDBCardBody>
                <MDBCardTitle tag="h3">{title}</MDBCardTitle>
                <MDBCardImage className='mb-3' top src={image} alt="..." />
                    <MDBCardSubTitle className='mb-2 text-end' tag="h5">Price: {amount}</MDBCardSubTitle>
                    <MDBCardText className='my-2 text-center' tag="p">Duration: {description}</MDBCardText>
                    
                    <center>
                    <div className='my-2 d-flex justify-content-center align-items-center' style={{width: "40%"}}>
                    Qty:&nbsp; <MDBInput name='qty' type='number' min={1} required/>
                    </div>
                    </center>
                    
                    
                    <MDBBtn type='submit' block>Buy Me</MDBBtn>
                </MDBCardBody>
            </form> 
            </MDBCard>
        </Col>
    )
}

export default CreatureCard;
