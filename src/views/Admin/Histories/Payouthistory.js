import { 
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBTable, 
    MDBTableHead, 
    MDBTableBody
 } from "mdb-react-ui-kit";
import React from "react";

const PayoutHistory = () =>{
    return(
        <MDBContainer>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle>Payout History</MDBCardTitle>
                    <MDBTable small responsive>
                    <MDBTableHead>
                        <tr className="text-center">
                        <th scope='col'>Username</th>
                        <th scope='col'>Amount</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>Handle</th>
                        </tr>
                    </MDBTableHead>
                    <MDBTableBody>
                        <tr className="text-center">
                        <th scope='row'>1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        </tr>
                    </MDBTableBody>
                    </MDBTable>
                </MDBCardBody>
            </MDBCard>
        </MDBContainer>
    )
}

export default PayoutHistory;