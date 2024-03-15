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
import React from "react";
import TopupHistory from "./Histories/Topuphistory";

const AdminTopup = () => {
    return(
        <div className="content">
            <MDBContainer fluid>
                <MDBRow>
                    <MDBCol lg={4} md={6} sm={12} className="offset-lg-4">
                        <MDBCard>
                            <MDBCardBody>
                                <MDBCardTitle>Top Up</MDBCardTitle>
                                <label>Player Username</label>
                                <MDBInput label="Input player username"/>
                                <MDBBtn>Send</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
                <TopupHistory/>
            </MDBContainer>
        </div>
    )
}

export default AdminTopup;