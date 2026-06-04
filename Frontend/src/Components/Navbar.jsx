import React, { useContext, useEffect, useState, useRef } from "react";
import { Search, ShoppingCart, User as UserIcon, Menu as MenuIcon, X, ChevronDown, Sparkles, ChefHat } from "lucide-react";
import Model from "./Model";
import { AuthContext } from "../Context/AuthProvider";
import Profile from "./Profile";
import { Link, useLocation } from "react-router-dom";
import useCart from "../Hooks/useCart";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuDropdownOpen, setMenuDropdownOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  
  const menuRef = useRef(null);
  const servicesRef = useRef(null);
  const location = useLocation();

  const { user } = useContext(AuthContext);
  const [cart] = useCart();

  // Scroll listener for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setMenuDropdownOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDropdownOpen(false);
      }
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSticky 
          ? "glass-nav py-3 shadow-lg shadow-slate-950/20 text-slate-100" 
          : "bg-transparent py-5 text-slate-200"
      }`}
    >
      <nav className="max-w-screen-2xl mx-auto px-6 md:px-12 xl:px-24 flex items-center justify-between relative">
        
        {/* BRAND LOGO */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Brand Logo Symbol with luxury style and glow */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-green via-emerald-400 to-green text-slate-950 font-black shadow-lg shadow-green/20 group-hover:shadow-green/45 group-hover:scale-105 group-hover:rotate-3 transition-all duration-300">
              <ChefHat className="w-5.5 h-5.5 text-slate-950" />
              {/* Soft radial glow behind the icon */}
              <span className="absolute inset-0 rounded-xl bg-gradient-to-tr from-green to-emerald-400 blur-sm opacity-50 group-hover:opacity-85 transition-opacity duration-300 -z-10" />
            </div>
            
            {/* Brand Name Text with luxury custom font styling */}
            <div className="flex flex-col text-left">
              <span className="font-['Outfit'] text-2xl font-black tracking-tight leading-none text-white transition-colors duration-300">
                in<span className="bg-gradient-to-r from-green to-emerald-400 bg-clip-text text-transparent group-hover:from-emerald-400 group-hover:to-green transition-all duration-300">food</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] font-bold text-slate-400 group-hover:text-green transition-colors duration-300 mt-1 leading-none">
                fine dining
              </span>
            </div>
          </Link>
        </div>

        {/* DESKTOP NAVIGATION SYSTEM */}
        <div className="hidden lg:flex items-center gap-8 font-semibold text-sm">
          
          <Link to="/" className="text-slate-350 hover:text-green transition duration-200">
            Home
          </Link>

          {/* Menu Hover Dropdown */}
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setMenuDropdownOpen(!menuDropdownOpen)}
              className="flex items-center gap-1 text-slate-350 hover:text-green transition duration-200 cursor-pointer font-semibold focus:outline-none"
            >
              Menu <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${menuDropdownOpen ? "rotate-180 text-green" : ""}`} />
            </button>
            
            {menuDropdownOpen && (
              <div className="glass-card absolute top-10 left-0 z-50 min-w-[12rem] p-3 border border-slate-800 rounded-2xl shadow-2xl space-y-1 backdrop-blur-md text-sm text-left">
                <Link to="/menu" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">All Dishes</Link>
                <Link to="/menu" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">Greek Salads</Link>
                <Link to="/menu" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">Michelin Pizzas</Link>
                <Link to="/menu" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">Wagyu Burgers</Link>
              </div>
            )}
          </div>

          {/* Services Hover Dropdown */}
          <div className="relative" ref={servicesRef}>
            <button 
              onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
              className="flex items-center gap-1 text-slate-350 hover:text-green transition duration-200 cursor-pointer font-semibold focus:outline-none"
            >
              Services <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180 text-green" : ""}`} />
            </button>
            
            {servicesDropdownOpen && (
              <div className="glass-card absolute top-10 left-0 z-50 min-w-[12rem] p-3 border border-slate-800 rounded-2xl shadow-2xl space-y-1 backdrop-blur-md text-sm text-left">
                <a href="#" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">Online Ordering</a>
                <a href="#" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">Table Booking</a>
                <Link to="/order" className="block px-3.5 py-2 rounded-xl text-slate-400 hover:bg-slate-900/60 hover:text-white transition duration-200">Order Tracking</Link>
              </div>
            )}
          </div>

          <a href="#" className="text-slate-350 hover:text-green transition duration-200">
            Special Offers
          </a>

        </div>

        {/* UTILITIES & ACCOUNT SELECTION */}
        <div className="flex items-center gap-4">
          
          {/* Search Trigger */}
          <button className="p-2 text-slate-300 hover:text-green hover:scale-105 active:scale-95 transition-all duration-200 bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/30 rounded-xl cursor-pointer">
            <Search className="h-4.5 w-4.5" />
          </button>

          {/* Cart Shopping Icon */}
          <Link to="/cart-page" className="relative p-2 text-slate-300 hover:text-green hover:scale-105 active:scale-95 transition-all duration-200 bg-slate-900/40 hover:bg-slate-800/40 border border-slate-800/30 rounded-xl cursor-pointer">
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className="absolute -top-1.5 -right-1.5 h-5 min-w-[1.25rem] px-1 flex items-center justify-center bg-red border border-slate-950 text-white text-[10px] font-black rounded-full shadow-md shadow-red/30 animate-pulse">
              {cart?.length || 0}
            </span>
          </Link>

          {/* Profile Dropdown / Login CTA */}
          <div className="hidden sm:block">
            {user ? (
              <Profile user={user} />
            ) : (
              <button
                onClick={() => document.getElementById("my_modal_5").showModal()}
                className="inline-flex items-center gap-2 py-2 px-4.5 border border-transparent rounded-xl text-xs font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green focus:outline-none shadow-lg shadow-green/20 hover:shadow-green/35 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <UserIcon className="h-3.5 w-3.5" /> Login
              </button>
            )}
          </div>

          {/* Hamburger Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition duration-200 bg-slate-900/40 border border-slate-800/40 rounded-xl"
          >
            {mobileMenuOpen ? <X className="h-4.5 w-4.5" /> : <MenuIcon className="h-4.5 w-4.5" />}
          </button>

        </div>

        {/* MOBILE OVERLAY SIDEBAR DRAWER */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed top-18 left-0 right-0 bottom-0 bg-slate-950/95 backdrop-blur-lg z-40 border-t border-slate-900/60 p-6 flex flex-col justify-between animate-in fade-in slide-in-from-top-6 duration-300">
            <div className="space-y-6 text-left">
              
              <Link 
                to="/" 
                onClick={() => setMobileMenuOpen(false)}
                className="block text-xl font-bold text-slate-200 hover:text-green border-b border-slate-900/50 pb-2"
              >
                Home
              </Link>
              
              <div className="space-y-3">
                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider">Our Menu</h5>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-350 hover:text-white">All Dishes</Link>
                  <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-350 hover:text-white">Greek Salads</Link>
                  <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-350 hover:text-white">Michelin Pizzas</Link>
                  <Link to="/menu" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-350 hover:text-white">Wagyu Burgers</Link>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="text-xs font-black text-slate-500 uppercase tracking-wider">Services</h5>
                <div className="grid grid-cols-2 gap-3 pl-2">
                  <a href="#" className="text-sm font-semibold text-slate-350 hover:text-white">Online Order</a>
                  <a href="#" className="text-sm font-semibold text-slate-350 hover:text-white">Table Booking</a>
                  <Link to="/order" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold text-slate-350 hover:text-white">Order Tracking</Link>
                </div>
              </div>

              <a href="#" className="block text-xl font-bold text-slate-200 hover:text-green border-b border-slate-900/50 pb-2">
                Special Offers
              </a>

            </div>

            {/* Mobile Footer Authentication trigger */}
            <div className="pt-8 border-t border-slate-900 space-y-4">
              {user ? (
                <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-2xl border border-slate-850">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.photoURL || "/images/home/avatar.jpg"} 
                      alt="" 
                      className="w-10 h-10 rounded-full object-cover border border-slate-800"
                    />
                    <div className="text-left">
                      <h6 className="font-bold text-slate-200 text-sm">{user.displayName || "Guest"}</h6>
                      <p className="text-[10px] text-slate-450">{user.email}</p>
                    </div>
                  </div>
                  <Profile user={user} />
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    document.getElementById("my_modal_5").showModal();
                  }}
                  className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green focus:outline-none shadow-lg shadow-green/20"
                >
                  <UserIcon className="h-4.5 w-4.5" /> Sign In / Register
                </button>
              )}
            </div>

          </div>
        )}

      </nav>

      {/* Embedded Login Modal Trigger viewport */}
      <Model />
    </header>
  );
};

export default Navbar;
