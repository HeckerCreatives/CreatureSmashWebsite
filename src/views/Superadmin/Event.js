import React , { useState }from "react";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
} from 'mdb-react-ui-kit';
import LeaderboardRank from "./Event/leaderboard";
const SuperAdminEvent = () => {
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
            <MDBIcon fas  icon="trophy" className='me-2'/>LB
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            <MDBIcon fas icon="cog" className='me-2'/>Controls
            </MDBTabsLink>
            </MDBTabsItem>
            {/* <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            <MDBIcon fas icon='hand-holding-usd' className='me-2' /> Commission History
            </MDBTabsLink>
            </MDBTabsItem> */}
        </MDBTabs>

        <MDBTabsContent>
            <MDBTabsPane open={basicActive === 'tab1'}>
            <LeaderboardRank/>
            </MDBTabsPane>
            <MDBTabsPane open={basicActive === 'tab2'}> 
            {/* <GameWalletHistory/> */}
            </MDBTabsPane>
            {/* <MDBTabsPane open={basicActive === 'tab3'}>
            <CommissionHistory/>
            </MDBTabsPane> */}
        </MDBTabsContent>
        </div>
    )
}

export default SuperAdminEvent;