import React from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaLocationArrow, FaQuestionCircle, FaRegUser, FaUserAlt } from "react-icons/fa";
import { GiShoppingBag } from "react-icons/gi";
import { FaEdit } from "react-icons/fa";
import { RiMenuAddFill } from "react-icons/ri";
import { MdDashboardCustomize } from "react-icons/md";
import logo from "/logo.png";
import { FaCartShopping } from "react-icons/fa6";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Login from "../Components/Login";

const sharedLinks = (
  <>
    <li className="mt-3">
      <Link to="/">
        <MdDashboard />
        Home
      </Link>
    </li>
    <li>
        <Link to="/menu"><FaCartShopping/>Menu</Link>
    </li>
    <li>
        <Link to="/menu"><FaLocationArrow/>Tracking Order</Link>
    </li>
    <li>
        <Link to="/menu"><FaQuestionCircle/>Customers Support</Link>
    </li>
  </>
);
const DashboardLayout =() => {
  const {loading} = useAuth()
  const [isAdmin, isAdminLoading] =useAdmin();
  return (
    <div>
     {
      isAdmin ?  <div className="drawer sm:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
        {/* Page content here */}
        <div className="flex items-center justify-between mx-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            <MdDashboardCustomize />
          </label>
          <button className="btn rounded-full px-6 bg-green flex items-center gap-2 text-white sm:hidden ">
            <FaRegUser />
            Logout
          </button>
        </div>
        <div className="mt-5 md:mt-2 mx-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <li>
            <Link to="/dashboard" className="flex justify-start mb-3">
              <img src={logo} alt="" className="w-20" />
              <div className="badge badge-primary">primary</div>
            </Link>
          </li>

          <li className="mt-3">
            <Link to="/dashboard">
              <MdDashboard />
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/dashboard">
              <GiShoppingBag />
              Manage Bookings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-menu">
              <RiMenuAddFill />
              Add Menu
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manage-item">
              <FaEdit />
              Manage Items
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/dashboard/users">
              <FaUserAlt />
              All Users
            </Link>
          </li>
  <hr />
          {/**shared nav links */}
          {
              sharedLinks
          }
        </ul>
      </div>
    </div> : (loading ? <Login/> : <div className="h-screen flex justify-center items-center"><Link to="/"><button className="btn bg-green text-white">Back to Home</button></Link></div>)
     }
    </div>
  );
}

export default DashboardLayout;
