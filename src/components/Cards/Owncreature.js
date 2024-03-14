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
import plankton from "../../assets/01-Bronze/01-Goblin.png"
const OwnCreatureCard = ({title, totalaccumulated, dailyaccumulated, image, qty}) => {
    return (
        <Col lg="3" md="6" sm="6" className="d-flex justify-content-center">
        <MDBCard alignment='' style={{width: '20rem'}}>
            
                <MDBCardBody>
                <MDBCardTitle className="text-center" tag="h3">{title}</MDBCardTitle>
                <MDBCardImage className='mb-3' top src={image} alt="..." />
                    <MDBCardSubTitle className='mb-2 text-center' tag="h5">Daily Income: {dailyaccumulated}</MDBCardSubTitle>
                    <MDBCardText className='my-2 text-center' tag="p">Total Income: {totalaccumulated}</MDBCardText>
                    
                    <center>
                    <div className='my-2 d-flex justify-content-center align-items-center' style={{width: "40%"}}>
                    Qty:&nbsp; <MDBInput disabled  type='number' min={1} value={qty}/>
                    </div>
                    </center>
                </MDBCardBody>
                
            </MDBCard>
        </Col>
    )
}

export default OwnCreatureCard;
