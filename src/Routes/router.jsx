import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import DonationRequests from "./../pages/DonationRequests/DonationRequests/DonationRequests";
import Blog from "../pages/Blog/Blog/Blog";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Search from "./../pages/Search/Search";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Layout/Dashboard";
import Profile from "../pages/Dashboard/Profile/Profile";
import CreateDonationRequest from "../pages/Dashboard/Donor/CreateDonationRequest/CreateDonationRequest";
import DonationRequestDetails from "../pages/DonationRequests/DonationRequestDetails";
import MyDonationRequest from "../pages/Dashboard/Donor/MyDonationRequest";
import DashboardMain from "../pages/Dashboard/DashboardMain/DashboardMain";
import AllUsers from "../pages/Dashboard/Admin/AllUsers/AllUsers";
import AllBloodDonationRequest from "../pages/Dashboard/Admin/AllBloodDontaionRequest/AllBloodDonationRequest";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "donationRequests",
        element: <DonationRequests></DonationRequests>,
      },
      { 
        path: "donation-requests/:id",
        element: (
          <PrivateRoute>
            <DonationRequestDetails></DonationRequestDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "blog",
        element: <Blog></Blog>,
      },
      {
        path: "search",
        element: <Search></Search>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element:<DashboardMain/>

      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest></CreateDonationRequest>,
      },
      {
        path: "my-donation-request",
        element: <MyDonationRequest></MyDonationRequest>,
      },
      {
        path:"all-users",
        element: <AllUsers/>
      },
      {
        path:'all-blood-donation-request',
        element: <AllBloodDonationRequest/>
      }
    ],
  },
]);
