
import PaginationPager from "components/Pagination/pagination";
import React, {useState, useEffect} from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import Swal from "sweetalert2";
function GameWalletHistory() {
    const [gamewallethistory, setGameWalletHistory] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    useEffect(() => {
      setIsLoading(true)
        fetch(`${process.env.REACT_APP_API_URL}/wallethistory/playerwallethistory?type=gamebalance&page=${page - 1}&limit=10`,{
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
            setGameWalletHistory(Object.values(data.data.history))
            setIsLoading(false)
            setTotal(data.data.pages)
          } else if (data.message == "failed"){
            Swal.fire({
              title: data.message,
              icon: "info",
              text: data.data
            })
          }
        })
    },[page])
  return (  
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">History</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Date</th>
                      <th>Amount</th>
                      {/* <th>From</th> */}
                    </tr>
                  </thead>
                  <tbody>
                  {gamewallethistory.length !== 0 ? (
                    // If gamewallethistory array is not empty
                    gamewallethistory.map((data, i) => (
                      <tr key={i}>
                        <td>{new Date(data.createdAt).toLocaleString()}</td>
                        <td>
                        {data.amount?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                        </td>
                        {/* <td>{data.from?.username}</td> */}
                      </tr>
                    ))
                  ) : (
                    // If gamewallethistory array is empty
                    <tr className="text-center">
                      <td colSpan={3}>No Data</td>
                    </tr>
                  )}
                  </tbody>
                </Table>
                
              </CardBody>
            </Card>
            <PaginationPager
                total={total} 
                page={page} 
                setPage={setPage}
                isloading={isloading}
                />
          </Col>
        </Row>
      </div>
    </>
  );
}

export default GameWalletHistory;