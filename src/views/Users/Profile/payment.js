import React from "react";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBRow,
    MDBCol,
    MDBInput
  } from 'mdb-react-ui-kit';
  import Swal from "sweetalert2";
const PaymentDetails = () => {
    const handleUpdatePayment = (e) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!"
        }).then((result) => {
        if (result.isConfirmed) {
           
        }
        });
    }
    return(
    <MDBCard>
    <form onSubmit={handleUpdatePayment}>
      <MDBCardBody>
        <MDBCardTitle>Edit Paymet Detail</MDBCardTitle>
        <MDBRow>
            <MDBCol lg={6}>
            <label>Select Payment Method</label>
            <select className="p-2" style={{width: "100%"}}>
                    <option>Gcash</option>
                    <option>Paymaya</option>
            </select>
            </MDBCol>
            <MDBCol lg={6}>
                <label>Account Number</label>
                <MDBInput label="Input Account Number Here"/>
            </MDBCol>
        </MDBRow>
        
        <MDBBtn type="submit">Save</MDBBtn>
      </MDBCardBody>
    </form>
    </MDBCard>
    )
}

export default PaymentDetails;