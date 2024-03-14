/*!

=========================================================
* Paper Dashboard React - v1.3.2
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, {useEffect, useState} from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components
import {
  dashboard24HoursPerformanceChart,
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from "variables/charts.js";
import Tables from "../Tables";
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBIcon
} from 'mdb-react-ui-kit';
import CommissionHistory from "./Historytables/commission";
import GameWalletHistory from "./Historytables/gamewallet";
import FiatWalletHistory from "./Historytables/fiatwallet";
import Swal from "sweetalert2";
function UserDashboard() {
  const [basicActive, setBasicActive] = useState('tab1');
  const [wallet, setWallet] = useState([])
  const [currentrank, setCurrentRank] = useState("0")

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

  useEffect(() => {
    
    fetch(`${process.env.REACT_APP_API_URL}/score/playerrank`,{
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
        setCurrentRank(data.data.rank)
      } else if (data.message == "failed"){
        Swal.fire({
          title: data.message,
          icon: "info",
          text: data.data
        })
      }

    })
  },[])

  

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
  return (
    <>
      <div className="content">
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
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-layout-11 text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Current Rank</p>
                      <CardTitle tag="p">{currentrank}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              {/* <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter> */}
            </Card>
          </Col>
        </Row>
        
        <MDBTabs className='mb-3' pills>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
          <MDBIcon fas icon='credit-card' className='me-2' />Wallet Balance History
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
          <MDBIcon fas icon='wallet' className='me-2' />Game Wallet History
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
          <MDBIcon fas icon='hand-holding-usd' className='me-2' /> Commission History
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
        <FiatWalletHistory/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}> 
        <GameWalletHistory/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
        <CommissionHistory/>
        </MDBTabsPane>
      </MDBTabsContent>
      </div>
    </>
  );
}

export default UserDashboard;
