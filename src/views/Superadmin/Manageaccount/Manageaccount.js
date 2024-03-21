import React, { useState, useEffect } from "react";
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
import PaginationPager from "components/Pagination/pagination";
const SAmanageaccount = () => {
    const [basicModal, setBasicModal] = useState(false);
    const [staff, setStaff] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    const toggleOpen = () => setBasicModal(!basicModal);

    useEffect(() => {
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_URL}/staffuser/getadminlist?page=${page - 1}&limit=10`,{
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
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
          setIsLoading(false)
          setStaff(data.data.users)
          setTotal(data.data.totalPages)
        } else if (data.message == "failed"){
          setIsLoading(false)
            Swal.fire({
                title: data.message,
                icon: "info",
                text: data.data
            })
        }

      })
    },[page])

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

    const handleBan = (user, status) => {
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
              fetch(`${process.env.REACT_APP_API_URL}/staffuser/banunbanuser`,{
                  method: 'POST',
                  credentials: 'include',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                      status: status,
                      staffusername: user
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
                          text: "Admin account banned successfully"
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

    const handleChangePassword = async (user) => {
      const { value: password } = await Swal.fire({
        title: "Enter your password",
        input: "password",
        inputLabel: "Password",
        inputPlaceholder: "Enter your password",
        inputAttributes: {
          maxlength: "10",
          autocapitalize: "off",
          autocorrect: "off"
        },
        inputValidator: (value) => {
          if (!value) {
            return "You need to write something!";
          }
        }
      });

      if(password){
        fetch(`${process.env.REACT_APP_API_URL}/staffuser/updateadmin`,{
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              staffusername: user,
              password: password
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
                  text: "Admin password change successfully"
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
              {
                staff.length !== 0 ?
                  staff.map((data, i) => (
                  <tr key={i} className="text-center">
                      <td>
                      {new Date(data.createdAt).toLocaleString()}
                      </td>
                      <td>{data.username}</td>
                      <td>
                      <MDBBtn size="sm" className="m-1" color="info" onClick={() => handleChangePassword(data.username)}>Change Password</MDBBtn>
                      {
                        data.status == "active" ? 
                      <MDBBtn size="sm" className="m-1" color="danger" onClick={() => handleBan(data.username, "banned")}>Ban</MDBBtn>
                      :
                      <MDBBtn size="sm" className="m-1" color="warning" onClick={() => handleBan(data.username, "active")}>Unban</MDBBtn>
                      }
                      
                      </td>
                  </tr>
                ))
                :
                <tr className="text-center">
                <td colSpan={3}>No Data</td>
                </tr>
              }
                
            </MDBTableBody>
            </MDBTable>
            <PaginationPager
                total={total} 
                page={page} 
                setPage={setPage}
                isloading={isloading}
            />
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