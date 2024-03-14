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
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  Button
} from "reactstrap";

import {
    MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane
  } from 'mdb-react-ui-kit';
// core components
import Tables from "../Tables";
import CreatureCard from "components/Cards/Creature";
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
function Buycreature() {
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
            Bronze
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Silver
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Gold
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={basicActive === 'tab1'}>
        <Row className="">
            <CreatureCard type="b_goblin" image={bronzegoblin} title="Bronze Goblin" amount="500.00 Php" description="7 Days 30%"/>
            <CreatureCard type="b_troll" image={bronzetroll} title="Bronze Troll" amount="2,750.00 Php" description="7 Days 30%"/>
            <CreatureCard type="b_ogre" image={bronzeogre} title="Bronze Ogre" amount="3,875.00 Php" description="7 Days 30%"/>
            <CreatureCard type="b_orc" image={bronzeorc} title="Bronze Orc" amount="5,000.00 Php" description="7 Days 30%"/>
        </Row>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab2'}> 
        <Row>
            <CreatureCard type="s_goblin" image={silvergoblin} title="Silver Goblin" amount="500.00 Php" description="15 Days 80%"/>
            <CreatureCard type="s_troll" image={silvertroll} title="Silver Troll" amount="7,000.00 Php" description="15 Days 80%"/>
            <CreatureCard type="s_ogre" image={silverogre} title="Silver Ogre" amount="14,360.00 Php" description="15 Days 80%"/>
            <CreatureCard type="s_orc" image={silverorc} title="Silver Orc" amount="21,290.00 Php" description="15 Days 80%"/>
            <CreatureCard type="s_yeti" image={silveryeti} title="Silver Yeti" amount="28,220.00 Php" description="15 Days 80%"/>
            <CreatureCard type="s_minotaur" image={silverminotaur} title="Silver Minotaur" amount="35,150.00 Php" description="15 Days 80%"/>
            <CreatureCard type="s_dragon" image={silverdragon} title="Silver Dragon" amount="50,000.00 Php" description="15 Days 80%"/>
        </Row>
        </MDBTabsPane>
        <MDBTabsPane open={basicActive === 'tab3'}>
        <Row>
            <CreatureCard type="g_orc" image={goldorc} title="Gold Orc" amount="5,000.00 Php" description="30 Days 200%"/>
            <CreatureCard type="g_yeti" image={goldyeti} title="Gold Yeti" amount="203,000.00 Php" description="30 Days 200%"/>
            <CreatureCard type="g_minotaur" image={goldminotaur} title="Gold Minotaur" amount="302,000.00 Php" description="30 Days 200%"/>
            <CreatureCard type="g_dragon" image={golddragon} title="Gold Dragon" amount="401,000.00 Php" description="30 Days 200%"/>
            <CreatureCard type="g_leviathan" image={goldleviathan} title="Gold Leviathan" amount="500,000.00 Php" description="30 Days 200%"/>
        </Row>
        </MDBTabsPane>
      </MDBTabsContent>
      </div>
    </>
  );
}

export default Buycreature;
