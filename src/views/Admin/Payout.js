import React from "react";
import PayoutHistory from "./Histories/Payouthistory";
import { 
    MDBContainer, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn, 
    MDBRow,
    MDBCol,
    MDBInput} from "mdb-react-ui-kit";
const AdminPayout = () => {
    return(
        <div className="content">
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol lg={4} md={6} sm={12} className="offset-lg-4">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Payout</MDBCardTitle>
                                <label>Player Username</label>
                                <MDBInput label="Input player username"/>
                                <MDBBtn>Claim</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <PayoutHistory/>
            </MDBContainer>
        </div>
    )
}

export default AdminPayout;