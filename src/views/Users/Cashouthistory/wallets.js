import React , { useState, useEffect }from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import Swal from "sweetalert2";
const Wallets = () => {
    const [wallet, setWallet] = useState([])
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/wallets/playerwallets`,{
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
                window.location.href = "/login"
              }
            })
          }
    
          if(data.message == "success"){
            setWallet(data.data)
          } else if (data.message == "failed"){
            Swal.fire({
              title: data.message,
              icon: "info",
              text: data.data
            })
          }
        })
      },[])
    return (
        <Row>
        <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-diamond text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Wallet Balance</p>
                      <CardTitle tag="p">
                        {wallet.fiatbalance?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter> */}
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-credit-card text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Game Wallet</p>
                      <CardTitle tag="p">
                        {wallet.gamebalance?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update Now
                </div>
              </CardFooter> */}
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-money-coins text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Commission Wallet</p>
                      <CardTitle tag="p">
                        {wallet.commissionbalance?.toLocaleString('en-US', {
                        style: 'decimal',
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                        })}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-calendar" /> Last day
                </div>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
    )
}

export default Wallets;