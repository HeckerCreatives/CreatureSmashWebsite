
import React , { useEffect, useState } from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
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

import imege from "assets/01-Bronze/01-Goblin.png"
import Swal from "sweetalert2";
import Profile from "./Profile/profile";
import PaymentDetails from "./Profile/payment";
import UserChangePass from "./Profile/password";
function Userprofile() {
  const [basicActive, setBasicActive] = useState('tab1');

  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }

    setBasicActive(value);
  };

  return (
    <>
      <div className="content">
      <MDBTabs className='mb-3' pills>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
          <MDBIcon fas icon='user-cog' className='me-2' />Profile Details
          </MDBTabsLink>
        </MDBTabsItem>
        {/* <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
          <MDBIcon fas icon='dollar-sign' className='me-2' />Payment Details
          </MDBTabsLink>
        </MDBTabsItem> */}
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
          <MDBIcon fas icon='key' className='me-2' /> Change Password
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
        <Profile/>
        </MDBTabsPane>
        {/* <MDBTabsPane open={basicActive === 'tab2'}> 
        <PaymentDetails/>
        </MDBTabsPane> */}
        <MDBTabsPane open={basicActive === 'tab3'}>
        <UserChangePass/>
        </MDBTabsPane>
      </MDBTabsContent>
      </div>
    </>
  );
}

export default Userprofile;
