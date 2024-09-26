import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home"
import Menu from "../pages/Shop/Menu";
import Signup from "../Components/Signup";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import Cartpage from "../pages/Shop/Cartpage";
import DashboardLayout from "../Layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Admin/Dashboard";
import Users from "../pages/Dashboard/Admin/Users";
import Login from "../Components/Login";
import AddMenu from "../pages/Dashboard/Admin/AddMenu";
import ManageItem from "../pages/Dashboard/Admin/ManageItem";
import UpdateMenu from "../pages/Dashboard/Admin/UpdateMenu";
import Payment from "../pages/Shop/Payment";
import Order from "../pages/Dashboard/Order";

const Router = createBrowserRouter([
    {
      path: "/",
      element:<Main/>,
      children: [
        {
          path:"/",
          element: <Home/>
        },
        {
          path:"/menu",
          element: <PrivateRouter><Menu/></PrivateRouter>
        },
        {
          path: "cart-page",
          element: <Cartpage/>
        },
        {
          path:"/update-profile",
          element: <UpdateProfile/>
        },
        {
          path:"/process-checkout",
          element: <Payment/>
        },
        {
          path:"/order",
          element: <Order/>
        }
      ]
    },
    {
      path:"/signup",
      element: <Signup/>
    },
    {
      path: "/login",
      element: <Login/>
    },
   
    // Admin Routes 
    {
      path: '/dashboard',
      element: <PrivateRouter><DashboardLayout/></PrivateRouter>,
      children : [
        {
          path:'',
          element: <Dashboard/>

        },
        {
          path:'users',
          element:<Users/>
        },
        {
          path:'add-menu',
          element:<AddMenu/>
        },
         {
          path:'manage-item',
          element:<ManageItem/>
        },
        {
          path:'update-menu/:id',
          element:<UpdateMenu/>,
          loader: ({params}) => fetch(`https://foodi-o6pu.onrender.com//menu/${params.id}`)
        }
      ]
    }
  ]);

  export default Router;