import OwnCreatureCard from "components/Cards/Owncreature";
import PaginationPager from "components/Pagination/pagination";
import { MDBContainer, MDBRow } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    Table,
  } from "reactstrap";
const SilverInventory = ({id}) => {
    const [silver, setSilver] = useState([]),
    [isloading, setIsLoading] = useState(false)
    
    useEffect(() => {
        setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/inventory/getplayerinventoryforadmin?playerid=${id}&rank=silver&page=0&limit=10`,{
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
                setSilver(data.data.silver)
            } else if (data.message == "failed"){
                Swal.fire({
                  title: data.message,
                  icon: "info",
                  text: data.data
                })
              }
        })
    },[])

    return(
        <MDBContainer fluid>
            <MDBRow>
            <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Creature</th>
                      <th>Quantity</th>
                      <th>Daily Accumulated</th>
                      <th>Total Accumulated</th>
                    </tr>
                  </thead>
                  <tbody>
                    { silver.length != 0 ?
                      silver.map((data, i) => (
                      <tr key={i}>
                        <td>{data.type == "s_orc" ? "Orc" : data.type == "s_ogre" ? "Ogre" : data.type == "s_troll" ? "Troll" : data.type == "s_yeti" ? "Yeti" : data.type == "s_dragon" ? "Dragon": data.type == "s_minotaur" ? "Minotaur" : "Goblin"}</td>
                        <td>{data.qty}</td>
                        <td>
                        {data.dailyaccumulated?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                        </td>
                        <td>
                        {data.totalaccumulated?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                        </td>
                      </tr>
                      ))
                      :
                      <tr className="text-center">
                        <td colSpan={3}>No Data</td>
                      </tr>
                    }
                    
                  </tbody>
                </Table>
            </MDBRow>
        </MDBContainer>
    )
}

export default SilverInventory;