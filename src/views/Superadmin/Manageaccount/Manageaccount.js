import React, { useState } from "react";
import { 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBContainer, 
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
 } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
const SAmanageaccount = () => {
    const [basicModal, setBasicModal] = useState(false);

    const toggleOpen = () => setBasicModal(!basicModal);

    const handleCreate = (e) => {
        e.preventDefault();
        const {username, password} = e.target
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
                fetch(`${process.env.REACT_APP_API_URL}/auth/registerstaffs`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: username.value,
                        password: password.value
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
                            text: "Admin account created successfully"
                        }).then(ok => {
                            if(ok.isConfirmed){
                                window.location.reload()
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
          });
       
    }
    return (
    <>
    <MDBContainer>
            <MDBBtn 
            color="success"
            onClick={toggleOpen}
            >
                Create Admin Account
            </MDBBtn>
            <MDBTable small>
                
            <MDBTableHead>
                <tr className="text-center">
                <th scope='col'>Date</th>
                <th scope='col'>Username</th>
                <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                <tr className="text-center">
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                </tr>
            </MDBTableBody>
            </MDBTable>
    </MDBContainer>

    <MDBModal  open={basicModal} setOpen={setBasicModal} tabIndex='-1'>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Create Admin Account</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleCreate}>
            <MDBModalBody>
            <label>Username</label>
            <MDBInput name="username" type="text" label="Input Username here"/>
            <label>Password</label>
            <MDBInput name="password" type="password" label="Input Password here"/>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn type="submit">Add</MDBBtn>
            </MDBModalFooter>
            </form>
          </MDBModalContent>
        </MDBModalDialog>
    </MDBModal>
    </>
    )
}

export default SAmanageaccount;