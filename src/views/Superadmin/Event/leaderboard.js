import React, { useEffect, useState } from "react";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
const LeaderboardRank = () => {
    const [leaderboard, setLeaderboard] = useState([])

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/score/leaderboard`,{
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
                setLeaderboard(data.data.leaderboard)
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
    <MDBTable small>
      <MDBTableHead>
        <tr className="text-center">
          <th scope='col'>Rank</th>
          <th scope='col'>Username</th>
          <th scope='col'>Score</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
        {
            leaderboard.length !== 0 ?
                leaderboard.map((data, i) => (
            <tr key={i} className="text-center">
            <th scope='row'>{data.rank}</th>
            <td>{data.username}</td>
            <td>{data.amount?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}</td>
            </tr>
            ))
            :
            <tr className="text-center">
                <td colSpan={3}>No Data</td>
            </tr>
        }
      </MDBTableBody>
    </MDBTable>
    )
}

export default LeaderboardRank;