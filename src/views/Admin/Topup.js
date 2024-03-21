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

const AdminTopup = () => {
    return(
        <div className="content">
            <MDBContainer fluid>
                <TopupList/>
                <TopupHistory/>
            </MDBContainer>
        </div>
    )
}

export default AdminTopup;