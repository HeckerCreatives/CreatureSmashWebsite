import React, { useState } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import FiatHistory from './table/fiat';
import GameHistory from './table/game';
import CommissionHistory from './table/commission';

const ViewHistory = ({id}) => {
    const [verticalActive, setVerticalActive] = useState('tab1');

    const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }

    setVerticalActive(value);
    };
    return(
        <MDBRow>
        <MDBCol size='3'>
          <MDBTabs pills className='flex-column text-center'>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab1')} active={verticalActive === 'tab1'}>
                Fiat
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab2')} active={verticalActive === 'tab2'}>
                Game
              </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink onClick={() => handleVerticalClick('tab3')} active={verticalActive === 'tab3'}>
                Commission
              </MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCol>
        <MDBCol size='9'>
          <MDBTabsContent>
            <MDBTabsPane open={verticalActive === 'tab1'}>
                <FiatHistory id={id}/>
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab2'}>
                <GameHistory id={id}/>
            </MDBTabsPane>
            <MDBTabsPane open={verticalActive === 'tab3'}>
                <CommissionHistory id={id}/>
            </MDBTabsPane>
          </MDBTabsContent>
        </MDBCol>
      </MDBRow>
    )
}

export default ViewHistory;