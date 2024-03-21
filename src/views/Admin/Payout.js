import React, { useState } from "react";
import PayoutHistory from "./Histories/Payouthistory";
import { 
    MDBContainer, 
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon} from "mdb-react-ui-kit";
import CommissionPayoutList from "./Histories/Commissionpayoutlist";
import GamePayoutList from "./Histories/Gamepayoutlist";
import GamePayoutHistory from "./Histories/Gamepayouthistory";
const AdminPayout = () => {
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }

        setBasicActive(value);
    };
    return(
        <div className="content">
            <MDBContainer fluid>
                <MDBTabs className='mb-3' pills>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
                    <MDBIcon fas icon='credit-card' className='me-2' />Commission payout
                    </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                    <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
                    <MDBIcon fas icon='wallet' className='me-2' />Game payout
                    </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                    <MDBTabsPane open={basicActive === 'tab1'}>
                    <CommissionPayoutList/>
                    <PayoutHistory/>
                    </MDBTabsPane>
                    <MDBTabsPane open={basicActive === 'tab2'}> 
                    <GamePayoutList/>
                    <GamePayoutHistory/>
                    </MDBTabsPane>
                </MDBTabsContent>
                
            </MDBContainer>
        </div>
    )
}

export default AdminPayout;