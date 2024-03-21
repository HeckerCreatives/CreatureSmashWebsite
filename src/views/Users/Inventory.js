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
import React, {useState} from "react";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBIcon
  } from 'mdb-react-ui-kit';
// core components
import Tables from "../Tables";
import OwnCreatureCard from "components/Cards/Owncreature";
import bronzegoblin from "assets/01-Bronze/01-Goblin.png"
import bronzetroll from "assets/01-Bronze/02-Troll.png"
import bronzeogre from "assets/01-Bronze/03-Ogre.png"
import bronzeorc from "assets/01-Bronze/04-Orc.png"

import silvergoblin from "assets/02-Silver/01-Goblin.png"
import silvertroll from "assets/02-Silver/02-Troll.png"
import silverogre from "assets/02-Silver/03-Ogre.png"
import silverorc from "assets/02-Silver/04-Orc.png"
import silveryeti from "assets/02-Silver/05-Yeti.png"
import silverminotaur from "assets/02-Silver/06-Minotaur.png"
import silverdragon from "assets/02-Silver/07-Dragon.png"

import goldorc from "assets/03-Gold/01-Orc.png"
import goldyeti from "assets/03-Gold/02-Yeti.png"
import goldminotaur from "assets/03-Gold/03-Minotaur.png"
import golddragon from "assets/03-Gold/04-Dragon.png"
import goldleviathan from "assets/03-Gold/05-Leviathan.png"
import BronzeInventory from "./Inventory/Bronze";
import SilverInventory from "./Inventory/Silver";
import GoldInventory from "./Inventory/Gold";
function Inventory() {
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
          <MDBIcon fas icon='box-open' className='me-2' />Bronze
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
          <MDBIcon fas icon='box-open' className='me-2' />Silver
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
          <MDBIcon fas icon='box-open' className='me-2' /> Gold
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
        <BronzeInventory/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}> 
        <SilverInventory/>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
        <GoldInventory/>
        </MDBTabsPane>
      </MDBTabsContent>
      </div>
    </>
  );
}

export default Inventory;
