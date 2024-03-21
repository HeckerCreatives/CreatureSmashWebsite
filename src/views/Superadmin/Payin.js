import { MDBContainer, MDBTypography } from "mdb-react-ui-kit";
import React from "react";
import SApayinhistory from "./Payin/payinhistory";
import SApayinlist from "./Payin/payinlist";

const SuperAdminPayin = () => {
    return (
        <div className="content">
            <MDBContainer>
                <MDBTypography tag={'h2'}>Payin List</MDBTypography>
                <SApayinlist/>
                <MDBTypography tag={'h2'}>Payin History</MDBTypography>
                <SApayinhistory/>
            </MDBContainer>
        </div>
    )
}

export default SuperAdminPayin;