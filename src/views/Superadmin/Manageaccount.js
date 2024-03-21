import React , {useState}from "react";
import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
} from 'mdb-react-ui-kit';
import SAmanageaccount from "./Manageaccount/Manageaccount";
import SAmanageplayer from "./Manageaccount/Manageplayer";
const SuperAdminManageAccount = () => {
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
            <MDBIcon fas icon="user-tie" className='me-2'/>Admin
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            <MDBIcon fas icon="user-alt" className='me-2'/>Player
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
            <SAmanageaccount/>
            </MDBTabsPane>
            <MDBTabsPane open={basicActive === 'tab2'}> 
            <SAmanageplayer/>
            </MDBTabsPane>
            {/* <MDBTabsPane open={basicActive === 'tab3'}>
            <CommissionHistory/>
            </MDBTabsPane> */}
        </MDBTabsContent>
        </div>
    )
}

export default SuperAdminManageAccount;