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
    MDBSpinner,
 } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
import PaginationPager from "components/Pagination/pagination";
const SAmanageplayer = () => {
    const [user, setUser] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);
    useEffect(() => {
      setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/user/getplayerlist?page=${page - 1}&limit=10`,{
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
            setUser(data.data.userlist)
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

    const handleBan = (user, status) => {
      setIsLoading(true)
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
                fetch(`${process.env.REACT_APP_API_URL}/user/banunbanuser`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        status: status,
                        userid: user
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
                      setIsLoading(false)
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
                      setIsLoading(false)
                        Swal.fire({
                            title: data.message,
                            icon: "info",
                            text: data.data
                        })
                    }
                  })
            } else {
              setIsLoading(false)
            }
          });
       
    }
  
      const handleChangePassword = async (user) => {
        setIsLoading(true)
        const { value: password } = await Swal.fire({
          title: "Enter password",
          input: "password",
          inputLabel: "Password",
          inputPlaceholder: "Enter password",
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
          fetch(`${process.env.REACT_APP_API_URL}/user/changepassworduserforadmin`,{
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                playerid: user,
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
              setIsLoading(false)
                Swal.fire({
                    title: data.message,
                    icon: "success",
                    text: "User password change successfully"
                }).then(ok => {
                    if(ok.isConfirmed){
                        window.location.reload()
                    }
                })
            } else if (data.message == "failed"){
              setIsLoading(false)
                Swal.fire({
                    title: data.message,
                    icon: "info",
                    text: data.data
                })
            }
          })
        } else {
          setIsLoading(false)
        }
       
      }

    return(
    <MDBContainer>
            <MDBTable small>
                
            <MDBTableHead>
                <tr className="text-center">
                <th scope='col'>Date Joined</th>
                <th scope='col'>Username</th>
                <th scope='col'>Email</th>
                <th scope='col'>Referral</th>
                <th scope='col'>Status</th>
                <th scope='col'>Action</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
              {
                user.length !== 0 ?
                  user.map((data, i) => (
                  <tr key={i} className="text-center">
                      <td>
                      {new Date(data.createdAt).toLocaleString()}
                      </td>
                      <td>{data.username}</td>
                      <td>{data.email}</td>
                      <td>{data.referralUsername}</td>
                      <td>{data.status}</td>
                      <td>
                      <MDBBtn className="m-1" size="sm"
                      onClick={() => {
                        const url = `${window.location.origin}/viewplayer/${data.id}`;
                        window.open(url, '_blank');
                      }}
                       >View</MDBBtn> 
                      <MDBBtn disabled={isloading} size="sm" className="m-1" color="info" onClick={() => handleChangePassword(data.id)}>{isloading ? <MDBSpinner size="sm"/> : 'Change Password'}</MDBBtn>
                      {
                        data.status == "active" ? 
                      <MDBBtn disabled={isloading} size="sm" className="m-1" color="danger" onClick={() => handleBan(data.id, "banned")}>{isloading ? <MDBSpinner size="sm"/> : 'Ban'}</MDBBtn>
                      :
                      <MDBBtn disabled={isloading} size="sm" className="m-1" color="warning" onClick={() => handleBan(data.id, "active")}>{isloading ? <MDBSpinner size="sm"/> : 'Unban'}</MDBBtn>
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
    )
}

export default SAmanageplayer;