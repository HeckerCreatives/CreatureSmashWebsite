import { 
    MDBContainer, 
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon } from "mdb-react-ui-kit";
import React, { useState } from "react";
import Wallets from "./Cashouthistory/wallets";
import CashoutHistory from "./Cashouthistory/history";
import CashoutRequest from "./Cashouthistory/request";
import GameCashoutHistory from "./Cashouthistory/gamehistory";

const UserCashout = () => {
    const [basicActive, setBasicActive] = useState('tab1');
    
    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
        setBasicActive(value);
    };

    return (
        <div className="content">
            <MDBContainer>
                <center>
                <Wallets/>
                </center>
                <CashoutRequest/>
                
                <MDBTabs className='mb-3' pills>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                    <MDBIcon fas icon='credit-card' className='me-2' />Commission
                    </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                    <MDBIcon fas icon='wallet' className='me-2' />Game
                    </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsContent>
                    <MDBTabsPane open={basicActive === 'tab1'}>
                    <CashoutHistory/>
                    </MDBTabsPane>
                    <MDBTabsPane open={basicActive === 'tab2'}> 
                    <GameCashoutHistory/>
                    </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </div>
    )
}

export default UserCashout;