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
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
  } from 'mdb-react-ui-kit';
import Swal from "sweetalert2";
function AdminDashboard() {
    const [basicActive, setBasicActive] = useState('tab1');
    const [wallet, setWallet] = useState([]);

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }

        setBasicActive(value);
    };
    
    useEffect(() => {
      fetch(`${process.env.REACT_APP_API_URL}/staffuser/getadmindashboard`,{
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
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="fas fa-circle-dollar-to-slot text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Cashin</p>
                      <CardTitle tag="p">{wallet.totalpayin}</CardTitle>
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
                      <i className="far fa-money-bill-1 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Cashout</p>
                      <CardTitle tag="p">{wallet.totalpayout}</CardTitle>
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
          {/* <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <CardTitle tag="p">23</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" /> In the last hour
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <CardTitle tag="p">+45K</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="fas fa-sync-alt" /> Update now
                </div>
              </CardFooter>
            </Card>
          </Col> */}
        </Row>

        {/* <MDBTabs className='mb-3' pills>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
          <MDBIcon fas icon='credit-card' className='me-2' />Total Cashin History
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
          <MDBIcon fas icon='wallet' className='me-2' />Total Cashout History
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
        Wala pa
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}> 
        Wala din
        </MDBTabsPane>
      </MDBTabsContent> */}
      </div>
    </>
  );
}

export default AdminDashboard;
