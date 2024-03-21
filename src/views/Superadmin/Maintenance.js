import { 
    MDBContainer, 
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol,
    MDBSwitch, } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Maintenance = () => {
    const [fullgame, setFullGame] = useState("")
    const [fightgame, setFightGame] = useState("")
    const [eventgame, setEventGame] = useState("")

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API_URL}/maintenance/getmaintenance`,{
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
                const Fullg = data.data.maintenancelist.find(e => e.type == "fullgame")
                const Fg = data.data.maintenancelist.find(e => e.type == "fightgame")
                const Eg = data.data.maintenancelist.find(e => e.type == "eventgame")
                setFightGame(Fg.value)
                setEventGame(Eg.value)
                setFullGame(Fullg.value)
              } else if (data.message == "failed"){
                Swal.fire({
                  title: data.message,
                  icon: "info",
                  text: data.data
                })
              }
        })
    },[])

    const gamemaintenance = (type, ischecked) => {
        Swal.fire({
            title: "Are you sure?",
            // text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes!",
            allowEscapeKey: false,
            allowOutsideClick: false
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${process.env.REACT_APP_API_URL}/maintenance/changemaintenance`,{
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        type: type,
                        value: ischecked
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
                            title: `Maintenance ${ischecked == "0" ? "Off": "On"}`,
                            icon: "success",
                            text: `Maintenance ${type} is now ${ischecked == "0" ? "Off": "On"}`
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
    return(
        <div className="content">
            <MDBContainer>
                <MDBRow>
                    <MDBCol lg={4}>
                    <MDBCard>
                    <MDBCardBody>
                    <div className="d-flex justify-content-end align-items-end mb-2">
                    <MDBSwitch 
                    checked={fullgame  == "1" ? true : false}  name="fullgame" 
                    id='flexSwitchCheckDefault'
                    onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}
                    />
                    </div>
                        <MDBCardTitle>Maintenance Full Game</MDBCardTitle>
                    </MDBCardBody>
                    </MDBCard>
                    </MDBCol>

                    <MDBCol lg={4}>
                    <MDBCard>
                    <MDBCardBody>
                    <div className="d-flex justify-content-end align-items-end mb-2">
                    <MDBSwitch 
                    checked={fightgame  == "1" ? true : false}  name="fightgame" 
                    id='flexSwitchCheckDefault'
                    onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}
                    />
                    </div>
                        <MDBCardTitle>Maintenance Fight Game</MDBCardTitle>
                        
                    </MDBCardBody>
                    </MDBCard>
                    </MDBCol>

                    <MDBCol lg={4}>
                    <MDBCard>
                    <MDBCardBody>
                    <div className="d-flex justify-content-end align-items-end mb-2">
                    <MDBSwitch 
                    checked={eventgame  == "1" ? true : false}  name="eventgame" 
                    id='flexSwitchCheckDefault'
                    onChange={(e) => gamemaintenance(e.target.name,e.target.checked ? 1 : 0)}
                    />
                    </div>
                        <MDBCardTitle>Maintenance Event Game</MDBCardTitle>
                        
                    </MDBCardBody>
                    </MDBCard>
                    </MDBCol>
                    
                </MDBRow>
            </MDBContainer>
        </div>
    )
}

export default Maintenance;