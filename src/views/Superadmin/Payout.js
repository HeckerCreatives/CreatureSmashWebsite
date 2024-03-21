import React , { useState }from "react";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon,
    MDBTypography
} from 'mdb-react-ui-kit';
import SAcommissionpayoutlist from "./Payout/commissionlist";
import SAcommissionpayouthistory from "./Payout/commissionhistory";
import SAgamepayoutlist from "./Payout/gamelist";
import SAgamepayouthistory from "./Payout/gamehistory";
const SuperAdminPayout = () => {
    const [basicActive, setBasicActive] = useState('tab1');

    const handleBasicClick = (value) => {
        if (value === basicActive) {
          return;
        }
        setBasicActive(value);
    };

    return (
        <div className="content">
        <MDBTabs className='mb-3' pills>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab1')} active={basicActive === 'tab1'}>
            <MDBIcon fas  icon="money-bill-alt" className='me-2'/>Commission
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            <MDBIcon fas icon="dice" className='me-2'/>Game
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane open={basicActive === 'tab1'}>
            <MDBTypography tag={'h2'}>Commission Payout List</MDBTypography>
            <SAcommissionpayoutlist/>
            <MDBTypography tag={'h2'}>Commission Payout History</MDBTypography>
            <SAcommissionpayouthistory/>
            </MDBTabsPane>
            <MDBTabsPane open={basicActive === 'tab2'}> 
            <MDBTypography tag={'h2'}>Game Payout List</MDBTypography>
            <SAgamepayoutlist/>
            <MDBTypography tag={'h2'}>Game Payout History</MDBTypography>
            <SAgamepayouthistory/>
            </MDBTabsPane>
        </MDBTabsContent>
        </div>
    )
}

export default SuperAdminPayout;