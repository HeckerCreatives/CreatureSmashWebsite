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
import AdminDashboard from "views/Admin/Dashboard";
import AdminTopup from "views/Admin/Topup";
import AdminPayout from "views/Admin/Payout";
import SuperAdminDashboard from "views/Superadmin/Dashboard";
import SuperAdminManageAccount from "views/Superadmin/Manageaccount";
import SuperAdminEvent from "views/Superadmin/Event";
import SuperAdminPayin from "views/Superadmin/Payin";
import SuperAdminPayout from "views/Superadmin/Payout";
import SuperAdminSettings from "views/Superadmin/Settings";
import UserCashin from "views/Users/Cashin";
import UserCashout from "views/Users/Cashout";
import Maintenance from "views/Superadmin/Maintenance";
import AdminSettings from "views/Admin/Settings";
let role = localStorage.getItem('uid')
role = atob(role)
// const role = "superadmin"
// const role = "admin"
// const role = "user"
let routes;

switch(role){
  case "superadmin":
    routes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: <SuperAdminDashboard />,
        layout: "/superadmin",
      },
      {
        path: "/manageaccount",
        name: "Manage Account",
        icon: "fas fa-users-gear",
        component: <SuperAdminManageAccount />,
        layout: "/superadmin",
      },
      {
        path: "/event",
        name: "Event",
        icon: "fas fa-trophy",
        component: <SuperAdminEvent />,
        layout: "/superadmin",
      },
      {
        path: "/maintenance",
        name: "Maintenance",
        icon: "fas fa-tools",
        component: <Maintenance />,
        layout: "/superadmin",
      },
      {
        path: "/payin",
        name: "Payin",
        icon: "fas fa-money-bill-1-wave",
        component: <SuperAdminPayin />,
        layout: "/superadmin",
      },
      {
        path: "/payout",
        name: "Payout",
        icon: "fas fa-money-bill-wave",
        component: <SuperAdminPayout />,
        layout: "/superadmin",
      },
      {
        path: "/setting",
        name: "Settings",
        icon: "fas fa-gear",
        component: <SuperAdminSettings />,
        layout: "/superadmin",
      },
      
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
  case "admin":
    routes = [
      {
        path: "/dashboard",
        name: "Dashboard",
        icon: "nc-icon nc-bank",
        component: <AdminDashboard />,
        layout: "/admin",
      },
      {
        path: "/topup",
        name: "Top up",
        icon: "fas fa-money-bill-1-wave",
        component: <AdminTopup />,
        layout: "/admin",
      },
      {
        path: "/payout",
        name: "Payout",
        icon: "fas fa-money-bill-wave",
        component: <AdminPayout />,
        layout: "/admin",
      },
      {
        path: "/setting",
        name: "Settings",
        icon: "fas fa-gear",
        component: <AdminSettings />,
        layout: "/admin",
      },
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
  case "player":
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
        component: <UserCashin/>,
        layout: "/user",
      },
      {
        path: "/cashout",
        name: "Cash Out",
        icon: "far fa-money-bill-1",
        component: <UserCashout/>,
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
