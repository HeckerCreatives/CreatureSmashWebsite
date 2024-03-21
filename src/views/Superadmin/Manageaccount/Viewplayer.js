import React, { useState, useEffect } from "react";
import { 
    MDBTable, 
    MDBTableHead, 
    MDBTableBody, 
    MDBContainer, 
    MDBBtn,
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
 } from 'mdb-react-ui-kit';

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
import { useParams } from "react-router-dom";
import ViewHistory from "./View/History";
import ViewInventory from "./View/Inventory";
const SAviewplayer = () => {
    const { userId } = useParams();
    const [fiat, setFiat] = useState(0)
    const [commission, setCommission] = useState(0)
    const [gamebalance, setGameBalance] = useState(0)
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
        setBasicActive(value);
    };

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}/wallets/getplayerwalletforadmin?playerid=${userId}`,{
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
                const fiat = data.data.userwallets.find(e => e.type == "fiatbalance")
                const commission = data.data.userwallets.find(e => e.type == "commissionbalance")
                const game = data.data.userwallets.find(e => e.type == "gamebalance")
                setFiat(fiat.amount)
                setCommission(commission.amount)
                setGameBalance(game.amount)
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
        <MDBContainer>
        <Row className="mt-5">
          <Col lg="4" md="6" sm="6">
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
                        {fiat.toLocaleString('en-US', {
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
          <Col lg="4" md="6" sm="6">
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
                        {gamebalance?.toLocaleString('en-US', {
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
          <Col lg="4" md="6" sm="6">
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
                        {commission?.toLocaleString('en-US', {
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
        
        <MDBTabs className='mb-3' pills>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            <MDBIcon fas icon="user-tie" className='me-2'/>Wallet History
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            <MDBIcon fas icon="user-alt" className='me-2'/>Inventory
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane open={basicActive === 'tab1'}>
              <ViewHistory id={userId}/>
            </MDBTabsPane>
            <MDBTabsPane open={basicActive === 'tab2'}>
              <ViewInventory id={userId}/>
            </MDBTabsPane>
        </MDBTabsContent>

        </MDBContainer>
    )
}

export default SAviewplayer