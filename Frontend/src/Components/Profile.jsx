import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import { User, ShoppingBag, LayoutDashboard, Settings, LogOut } from "lucide-react";

const Profile = ({ user }) => {
  const { logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    logOut()
      .then(() => {
        setIsOpen(false);
      })
      .catch((error) => {
        console.error("Logout error", error);
      });
  };

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Clickable Profile Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-green/60 hover:border-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green transition-all duration-300 shadow-md shadow-green/10 flex items-center justify-center cursor-pointer transform active:scale-95"
      >
        <img
          src={user.photoURL || "/images/home/avatar.jpg"}
          alt="User Profile"
          className="object-cover w-full h-full"
        />
      </button>

      {/* Floating Glassmorphic Dropdown Card */}
      {isOpen && (
        <div className="glass-card absolute right-0 top-14 z-50 min-w-[14rem] p-3 border border-slate-800 rounded-2xl shadow-2xl space-y-1.5 backdrop-blur-md text-slate-200 text-sm animate-in fade-in slide-in-from-top-3 duration-250">
          
          {/* User brief info header */}
          <div className="px-3.5 py-2 border-b border-slate-900 pb-2.5 mb-1">
            <h5 className="font-bold text-slate-100 truncate">{user.displayName || "Gourmet Guest"}</h5>
            <p className="text-[10px] text-slate-450 truncate mt-0.5">{user.email}</p>
          </div>

          {/* Links list */}
          <Link
            to="/update-profile"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-350 hover:bg-slate-900/60 hover:text-white transition duration-200 text-left font-medium"
          >
            <User className="h-4 w-4 text-green" /> Profile Settings
          </Link>
          
          <Link
            to="/order"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-350 hover:bg-slate-900/60 hover:text-white transition duration-200 text-left font-medium"
          >
            <ShoppingBag className="h-4 w-4 text-green" /> Track Orders
          </Link>
          
          <Link
            to="/dashboard"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-350 hover:bg-slate-900/60 hover:text-white transition duration-200 text-left font-medium"
          >
            <LayoutDashboard className="h-4 w-4 text-green" /> Dashboard
          </Link>
          
          <a
            href="#"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-350 hover:bg-slate-900/60 hover:text-white transition duration-200 text-left font-medium"
          >
            <Settings className="h-4 w-4 text-slate-500" /> Account Settings
          </a>

          <div className="border-t border-slate-900 my-1 pt-1.5">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-rose-400 hover:bg-rose-500/10 hover:text-rose-350 transition duration-200 text-left font-semibold cursor-pointer"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Profile;
