import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  PlusCircle,
  ClipboardList,
  Home,
  UtensilsCrossed,
  MapPin,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import logo from "/logo.png";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import Loading from "../Components/Loading";

const adminLinks = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/users", label: "All Users", icon: Users },
  { to: "/dashboard/add-menu", label: "Add Menu", icon: PlusCircle },
  { to: "/dashboard/manage-item", label: "Manage Items", icon: ClipboardList },
];

const quickLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/menu", label: "Menu Catalog", icon: UtensilsCrossed },
  { to: "/order", label: "Track Orders", icon: MapPin },
];

const DashboardLayout = () => {
  const { user, loading, logOut } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  if (loading || isAdminLoading) {
    return <Loading />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-6 px-4">
        <div className="w-20 h-20 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center text-rose-400 animate-pulse">
          <X className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-white">Access Denied</h2>
        <p className="text-slate-400 text-sm text-center max-w-sm">
          You don't have administrator privileges to access this dashboard.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green shadow-lg shadow-green/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <Home className="h-4 w-4" /> Back to Home
        </Link>
      </div>
    );
  }

  const isActive = (path, end = false) => {
    if (end) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logOut()
      .then(() => navigate("/"))
      .catch((err) => console.error(err));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Brand */}
      <div className="px-5 pt-6 pb-4">
        <Link to="/dashboard" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <img src={logo} alt="Foodi" className="w-12 h-12 object-contain drop-shadow-lg" />
          <div>
            <h2 className="text-lg font-black text-white tracking-tight leading-none">FOODI</h2>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles className="h-2.5 w-2.5 text-green" />
              <span className="text-[9px] font-bold text-green uppercase tracking-widest">Admin Console</span>
            </div>
          </div>
        </Link>
      </div>

      {/* Divider */}
      <div className="px-5"><div className="border-t border-slate-800/80"></div></div>

      {/* Admin Nav */}
      <div className="px-3 pt-5 flex-1">
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Management</p>
        <nav className="space-y-1">
          {adminLinks.map((link) => {
            const active = isActive(link.to, link.end);
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className={`group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  active
                    ? "bg-green/10 text-green border border-green/20 shadow-sm shadow-green/5"
                    : "text-slate-400 hover:text-white hover:bg-slate-900/60 border border-transparent"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${active ? "text-green" : "text-slate-500 group-hover:text-slate-300"}`} />
                {link.label}
                {active && <ChevronRight className="h-3.5 w-3.5 ml-auto text-green/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Quick Links */}
        <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-8">Quick Links</p>
        <nav className="space-y-1">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setSidebarOpen(false)}
                className="group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-450 hover:text-white hover:bg-slate-900/60 transition-all duration-200 border border-transparent"
              >
                <Icon className="h-4 w-4 text-slate-600 group-hover:text-slate-400" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Footer Card */}
      <div className="px-3 pb-4 mt-auto">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-green/40 flex-shrink-0">
              <img
                src={user?.photoURL || "/images/home/avatar.jpg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-slate-200 truncate">{user?.displayName || "Admin"}</p>
              <p className="text-[10px] text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold text-rose-400 bg-rose-500/5 border border-rose-500/15 hover:bg-rose-500/10 hover:text-rose-300 transition-all duration-200 cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-[260px] fixed inset-y-0 left-0 z-40 bg-[#0a0e1a]/95 border-r border-slate-800/60 backdrop-blur-xl">
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
          <aside className="relative w-[280px] h-full bg-[#0a0e1a] border-r border-slate-800/60 shadow-2xl overflow-y-auto">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-900/60 border border-slate-800 rounded-xl transition z-10"
            >
              <X className="h-4 w-4" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-[260px] min-h-screen relative">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/40 px-4 lg:px-8 py-3.5 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2.5 text-slate-300 hover:text-white bg-slate-900/60 border border-slate-800 rounded-xl transition"
          >
            <Menu className="h-4.5 w-4.5" />
          </button>

          <div className="hidden lg:flex items-center gap-2">
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green/10 border border-green/20 rounded-full text-[10px] font-bold tracking-wider text-green uppercase">
              <Sparkles className="h-2.5 w-2.5" /> Admin Panel
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:block">
              {new Date().toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-slate-800">
              <img
                src={user?.photoURL || "/images/home/avatar.jpg"}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
