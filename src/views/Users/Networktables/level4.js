import PaginationPager from "components/Pagination/pagination";
import { MDBContainer,  MDBTable, MDBTableHead, MDBTableBody  } from "mdb-react-ui-kit";
import React, {useState, useEffect} from "react";
import Swal from "sweetalert2";
const Level4 = () => {
    const [network, setNetwork] = useState([]),
        [page, setPage] = useState(1),
        [isloading, setIsLoading] = useState(false),
        [total, setTotal] = useState(0);
    useEffect(() => {
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_URL}/unilevel/playerunilevel?level=3&page=${page - 1}&limit=10`,{
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
          setNetwork(data.data.length != 0 ? data.data[0].data : data.data)
          setTotal(data.data.length != 0 ? data.data[0]?.totalPages : 0)
        } else if (data.message == "failed"){
          Swal.fire({
            title: data.message,
            icon: "info",
            text: data.data
          })
        }
      })
    },[page])
    
    return(
        <MDBContainer>
            <MDBTable small>
                <MDBTableHead>
                    <tr className="text-center">
                    <th scope='col'>Username</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    { network.length != 0 ?
                      network.map((data, i) => (
                      <tr className="text-center" key={i}>
                        <td>{data.username}</td>
                      </tr>
                      ))
                      :
                      <tr className="text-center">
                        <td colSpan={1}>No Data</td>
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

export default Level4;