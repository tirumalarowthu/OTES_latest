/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import UserProfile from "layouts/user-profile";
// import UserManagement from "layouts/user-management";

import Login from "auth/login";
import Register from "auth/register";
import ForgotPassword from "auth/forgot-password";
import ResetPassword from "auth/reset-password";
import CandidateLogin from "auth/candidateLogin";

// @mui icons
import Icon from "@mui/material/Icon";
import PendingApprovals from "app_components/PendingApprovals/PendingApprovals";
import ViewQuestions from "app_components/QuestionBank/ViewQuestions";
import ViewQuestionsHomePage from "app_components/QuestionBank/ViewQuestionsHomePage";
import CandidateList from "app_components/CandidateManage/CandidateList";
import EditCandidateForm from "app_components/CandidateManage/EditCandidateForm";
import EvalQuestions from "app_components/CandidateManage/EvalQuestions";


import AddQuestions from "app_components/QuestionBank/AddQuestions";
import AddQuestionsHomepage from "app_components/QuestionBank/AddQuestionsHomepage";
import AddCandidate from "app_components/CandidateManage/AddCandidate";
import FilterTable from "app_components/FilterTables/FilterTable";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Candidate List",
    key: "Candidate-List",
    icon: <Icon fontSize="small">list</Icon>,
    route: "/Candidate-List",
    component: <CandidateList />,
  },
 
  
  {
    type: "collapse",
    name: "Pending Approvals",
    key: "pending-approvals",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/pending-approvals",
    component: <PendingApprovals />,
  },
  {
    type: "collapse",
    name: "Add Candidate",
    key: "add-candidate",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/add-candidate",
    component: <AddCandidate />,
  },
 
  
  {
    type: "collapse",
    name: "Add Questions",
    key: "add-questions",
    icon: <Icon fontSize="small">receipt_short</Icon>,
    route: "/add-questions",
    component: <AddQuestionsHomepage />,
  },
  {
    type: "collapse",
    name: "View Questions",
    key: "view-questions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/view-questions",
    component: <ViewQuestionsHomePage />,
  },
  {
    type: "examples",
    name: "View Questions By area",
    key: "view-questions-area",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/view-questions/:area",
    component: <ViewQuestions />,
  },
  // for test taken/not taken/ evaluated requests: 
  {
    type: "examples",
    name: "View Questions By area",
    key: "view-questions-area",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Candidate-List/Filter/:f_option_key/:f_option_value",
    component: <FilterTable />,
  },
  {
    type: "examples",
    name: "Edit Candidate",
    key: "Edit-Candidate",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Candidate-List/Edit/:email",
    component: <EditCandidateForm />,
  },
  
  {
    type: "examples",
    name: "Eval Questions",
    key: "Eval-Questions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Candidate-List/EvalQuestions/:email",
    component: <EvalQuestions />,
  },
  
  {
    name: "add Questions By area",
    key: "add-questions-area",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/add-questions/:area",
    component: <AddQuestions />,
  },

 
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  {
    type: "examples",
    name: "CandidateLogin",
    key: "candidate-login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/candidate-login",
    component: <CandidateLogin />,
  },

  // {
  //   type: "auth",
  //   name: "Instructions",
  //   key: "instructions",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/instructions",
  //   component: <Instructions />,
  // },
  {
    type: "auth",
    name: "Register",
    key: "register",
    icon: <Icon fontSize="small">reigster</Icon>,
    route: "/auth/register",
    component: <Register />,
  },
  {
    type: "auth",
    name: "Forgot Password",
    key: "forgot-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/forgot-password",
    component: <ForgotPassword />,
  },
  {
    type: "auth",
    name: "Reset Password",
    key: "reset-password",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/auth/reset-password",
    component: <ResetPassword/>,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "User Profile",
  //   key: "user-profile",
  //   icon: <Icon fontSize="small">person</Icon>,
  //   route: "/user-profile",
  //   component: <UserProfile />,
  // },
  // {
  //   type: "examples",
  //   name: "User Management",
  //   key: "user-management",
  //   icon: <Icon fontSize="small">list</Icon>,
  //   route: "/user-management",
  //   component: <UserManagement />,
  // },
 
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
   // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   icon: <Icon fontSize="small">format_textdirection_r_to_l</Icon>,
  //   route: "/rtl",
  //   component: <RTL />,
  // },
];

export default routes;
