import React, { useContext, useEffect } from "react";
import logo from "../../public/logo.png";
import { FaRegUser } from "react-icons/fa";
import { useState } from "react";
import Model from "./Model";
import { AuthContext } from "../Context/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../Hooks/useCart";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {


  const navItems = (
    <>
      <li>
        <a className="hover:text-green" href="/">
          Home
        </a>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">All</a>
            </li>
            <li>
              <a>Salad</a>
            </li>
            <li>
              <a>Pizza</a>
            </li>
            <li>
              <a>Burger</a>
            </li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a>Online order</a>
            </li>
            <li>
              <a>Table Booking</a>
            </li>
            <li>
              <a>Order Tracking</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a>Offers</a>
      </li>
    </>
  );
  const [isSticky, setIsSticky] = useState(false);

  const {user, loading} = useAuth();

  const [ cart, refetch] = useCart();
  

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll); 

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 transition-all duration-500 ease-in-out z-50">
      <div
        className={`navbar xl:px-24 transition-all duration-500 ease-in-out ${
          isSticky
            ? "glass-nav py-3 shadow-xl shadow-slate-950/20 text-slate-100"
            : "py-5 text-slate-200"
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-slate-800/40 text-slate-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-slate-900/95 border border-slate-800 backdrop-blur-md rounded-2xl z-[1] mt-3 w-52 p-3 shadow-2xl text-slate-200 space-y-1"
            >
              {navItems}
            </ul>
          </div>
          <a href="/" className="flex items-center gap-2 transform hover:scale-105 transition-all duration-300">
            <img src={logo} alt="FOODI" className="h-10" />
          </a>
        </div>
        <div className="navbar-center hidden lg:flex ">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium text-slate-200">{navItems}</ul>
        </div>
        <div className="navbar-end gap-2">
          {/* search button */}

          <button className="btn btn-ghost btn-circle hidden lg:flex text-slate-200 hover:bg-slate-800/40 hover:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/*cart button */}
          <Link to="cart-page">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle mr-2 lg:flex hidden items-center justify-center text-slate-200 hover:bg-slate-800/40 hover:text-white transition-all"
          >
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm bg-red border-0 text-white font-bold rounded-full indicator-item shadow-sm shadow-red/40 animate-pulse">{cart.length || 0}</span>
            </div>
          </div>
          </Link>

          {/* login button */}
          {
            user ? <Profile user={user}/> :  <button
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="btn bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green border-0 text-white rounded-full px-6 flex items-center gap-2 shadow-lg shadow-green/20 hover:shadow-green/35 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <FaRegUser />
            Login
          </button>
          }

          <Model/>
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
