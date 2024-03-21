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
import React, { useState, useEffect} from "react";
import { MDBContainer } from "mdb-react-ui-kit";
import PaginationPager from "components/Pagination/pagination";

const CashinHistory = () => {
    const [cashinhistory, setCashinHistory] = useState([]),
    [page, setPage] = useState(1),
    [isloading, setIsLoading] = useState(false),
    [total, setTotal] = useState(0);

    useEffect(() => {
      setIsLoading(true)
      fetch(`${process.env.REACT_APP_API_URL}/payin/getpayinhistoryplayer?page=${page - 1}&limit=10`,{
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
          setCashinHistory(data.data.payinhistory)
          setIsLoading(false)
          setTotal(data.data.totalPages)
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
                      <th>Username</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Process By</th>
                    </tr>
                  </thead>
                  <tbody>
                  {cashinhistory.length !== 0 ? (
                    cashinhistory.map((data, i) => (
                      <tr key={i}>
                        <td>{data.owner}</td>
                        <td>
                        {data.value?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                        </td>
                        <td>{data.status}</td>
                        <td>{data.processby}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="text-center">
                      <td colSpan={4}>No Data</td>
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
        </MDBContainer>
    )
}

export default CashinHistory;