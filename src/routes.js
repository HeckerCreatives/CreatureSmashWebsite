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
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import Buycreature from "views/Users/Buycreature";
import UserDashboard from "views/Users/Dashboard";
import Userprofile from "views/Users/Userprofile";
import Inventory from "views/Users/Inventory";
import Mynetwork from "views/Users/Mynetwork";

// const role = "admin"
const role = "user"
let routes;

switch(role){
  case "admin":
    routes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: <Dashboard />,
        layout: "/admin",
      },
      {
        path: "/icons",
        name: "Icons",
        icon: "nc-icon nc-diamond",
        component: <Icons />,
        layout: "/admin",
      },
      // {
      //   path: "/maps",
      //   name: "Maps",
      //   icon: "nc-icon nc-pin-3",
      //   component: <Maps />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/notifications",
      //   name: "Notifications",
      //   icon: "nc-icon nc-bell-55",
      //   component: <Notifications />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/user-page",
      //   name: "User Profile",
      //   icon: "nc-icon nc-single-02",
      //   component: <UserPage />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/tables",
      //   name: "Table List",
      //   icon: "nc-icon nc-tile-56",
      //   component: <TableList />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/typography",
      //   name: "Typography",
      //   icon: "nc-icon nc-caps-small",
      //   component: <Typography />,
      //   layout: "/admin",
      // },
      // {
      //   pro: true,
      //   path: "/upgrade",
      //   name: "Upgrade to PRO",
      //   icon: "nc-icon nc-spaceship",
      //   component: <UpgradeToPro />,
      //   layout: "/admin",
      // },
    ];
  break;
  case "user":
    routes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "fas fa-building-columns",
        component: <UserDashboard/>,
        layout: "/user",
      },
      {
        path: "/mynetwork",
        name: "My Network",
        icon: "nc-icon nc-vector",
        component: <Mynetwork/>,
        layout: "/user",
      },
      {
        path: "/cashin",
        name: "Cash In",
        icon: "fas fa-circle-dollar-to-slot",
        // component: <Mynetwork/>,
        layout: "/user",
      },
      {
        path: "/cashout",
        name: "Cash Out",
        icon: "far fa-money-bill-1",
        // component: <Mynetwork/>,
        layout: "/user",
      },
      {
        path: "/buycreature",
        name: "Buy Creature",
        icon: "nc-icon nc-basket",
        component: <Buycreature />,
        layout: "/user",
      },
      {
        path: "/inventory",
        name: "Inventory",
        icon: "nc-icon nc-box-2",
        component: <Inventory />,
        layout: "/user",
      },
      {
        path: "/profile",
        name: "Profile",
        icon: "nc-icon nc-single-02",
        component: <Userprofile />,
        layout: "/user",
      },
      // {
      //   path: "/notifications",
      //   name: "Notifications",
      //   icon: "nc-icon nc-bell-55",
      //   component: <Notifications />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/user-page",
      //   name: "User Profile",
      //   icon: "nc-icon nc-single-02",
      //   component: <UserPage />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/tables",
      //   name: "Table List",
      //   icon: "nc-icon nc-tile-56",
      //   component: <TableList />,
      //   layout: "/admin",
      // },
      // {
      //   path: "/typography",
      //   name: "Typography",
      //   icon: "nc-icon nc-caps-small",
      //   component: <Typography />,
      //   layout: "/admin",
      // },
      // {
      //   pro: true,
      //   path: "/upgrade",
      //   name: "Upgrade to PRO",
      //   icon: "nc-icon nc-spaceship",
      //   component: <UpgradeToPro />,
      //   layout: "/admin",
      // },
    ];
  break;
  default:
  break;
}


export default routes;
