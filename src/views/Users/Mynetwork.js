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

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
  } from 'mdb-react-ui-kit';
// core components
import Level1 from "./Networktables/level1";
import Level2 from "./Networktables/level2";
import Level3 from "./Networktables/level3";
import Level4 from "./Networktables/level4";
import Level5 from "./Networktables/level5";
import Level6 from "./Networktables/level6";
import Level7 from "./Networktables/level7";
import Level8 from "./Networktables/level8";
import Level9 from "./Networktables/level9";
import Level10 from "./Networktables/level10";
function Mynetwork() {
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
          Level 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
          Level 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
          Level 3
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab4')} active={basicActive === 'tab4'}>
          Level 4
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab5')} active={basicActive === 'tab5'}>
          Level 5
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab6')} active={basicActive === 'tab6'}>
          Level 6
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab7')} active={basicActive === 'tab7'}>
          Level 7
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab8')} active={basicActive === 'tab8'}>
          Level 8
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab9')} active={basicActive === 'tab9'}>
          Level 9
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab10')} active={basicActive === 'tab10'}>
          Level 10
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
        <Level1/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}> 
        <Level2/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
        <Level3/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab4'}>
        <Level4/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab5'}>
        <Level5/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab6'}>
        <Level6/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab7'}>
        <Level7/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab8'}>
        <Level8/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab9'}>
        <Level9/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab10'}>
        <Level10/>
        </MDBTabsPane>
      </MDBTabsContent>
      </div>
    </>
  );
}

export default Mynetwork;
