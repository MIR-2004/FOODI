import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import {
  DollarSign,
  ShoppingBag,
  Users,
  UtensilsCrossed,
  TrendingUp,
  ArrowUpRight,
  CreditCard,
  Activity,
  Sparkles,
  ChevronRight,
  Clock,
  CheckCircle2,
  PlusCircle,
  ClipboardList,
} from "lucide-react";

function Dashboard() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/admin-stats");
      return res.data;
    },
    retry: false,
  });

  const { data: recentPayments = [] } = useQuery({
    queryKey: ["recent-payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data.slice(0, 6);
    },
    enabled: !!user?.email,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-8 w-72 bg-slate-800 rounded-xl"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-36 bg-slate-900/50 border border-slate-800 rounded-2xl"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-80 bg-slate-900/50 border border-slate-800 rounded-2xl"></div>
          <div className="h-80 bg-slate-900/50 border border-slate-800 rounded-2xl"></div>
        </div>
      </div>
    );
  }

  const metricCards = [
    {
      title: "Total Revenue",
      value: `$${(stats.revenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      change: "+12.4%",
      changePeriod: "this week",
      icon: DollarSign,
      color: "green",
      bgGradient: "from-green/8 to-emerald-500/3",
      iconBg: "bg-green/10 border-green/20",
      iconColor: "text-green",
      changeColor: "text-green bg-green/5 border-green/10",
    },
    {
      title: "Total Orders",
      value: stats.orders || 0,
      change: "+8.2%",
      changePeriod: "this month",
      icon: ShoppingBag,
      color: "amber",
      bgGradient: "from-brand-gold/8 to-amber-500/3",
      iconBg: "bg-brand-gold/10 border-brand-gold/20",
      iconColor: "text-brand-gold",
      changeColor: "text-brand-gold bg-brand-gold/5 border-brand-gold/10",
    },
    {
      title: "Active Users",
      value: stats.users || 0,
      change: "+24.1%",
      changePeriod: "all time",
      icon: Users,
      color: "cyan",
      bgGradient: "from-cyan-500/8 to-sky-500/3",
      iconBg: "bg-cyan-500/10 border-cyan-500/20",
      iconColor: "text-cyan-400",
      changeColor: "text-cyan-400 bg-cyan-500/5 border-cyan-500/10",
    },
    {
      title: "Menu Items",
      value: stats.menuItems || 0,
      change: "Live",
      changePeriod: "catalog",
      icon: UtensilsCrossed,
      color: "purple",
      bgGradient: "from-purple-500/8 to-violet-500/3",
      iconBg: "bg-purple-500/10 border-purple-500/20",
      iconColor: "text-purple-400",
      changeColor: "text-purple-400 bg-purple-500/5 border-purple-500/10",
    },
  ];

  return (
    <div className="space-y-7 relative">
      {/* Ambient Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green/3 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-brand-gold/3 rounded-full blur-3xl pointer-events-none"></div>

      {/* Welcome Header */}
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-400">{user?.displayName?.split(" ")[0] || "Admin"}</span>
            </h1>
            <p className="text-slate-400 text-sm mt-1">Here's what's happening with your restaurant today.</p>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard/add-menu"
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green rounded-xl shadow-lg shadow-green/15 hover:shadow-green/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <PlusCircle className="h-3.5 w-3.5" /> Add Item
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 relative z-10">
        {metricCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="group relative bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl p-5 overflow-hidden hover:border-slate-700/60 transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                <div className="flex justify-between items-start">
                  <div className="space-y-1.5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{card.title}</p>
                    <h3 className="text-2xl font-black text-white">{card.value}</h3>
                  </div>
                  <div className={`p-3 ${card.iconBg} border rounded-xl`}>
                    <Icon className={`h-5 w-5 ${card.iconColor}`} />
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 mt-3.5 text-[11px] font-bold ${card.changeColor} border rounded-full px-2.5 py-1 w-max`}>
                  <TrendingUp className="h-3 w-3" />
                  <span>{card.change} {card.changePeriod}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-800/60 flex justify-between items-center">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-green" /> Recent Transactions
              </h3>
              <p className="text-slate-500 text-xs mt-0.5">Latest payment activity from Stripe</p>
            </div>
            <Link to="/order" className="text-[11px] font-bold text-slate-400 hover:text-green flex items-center gap-0.5 transition">
              View All <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            {recentPayments.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-900/30">
                    <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3">Transaction</th>
                    <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3">Email</th>
                    <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3">Status</th>
                    <th className="text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPayments.map((pay, i) => (
                    <tr key={i} className="border-b border-slate-800/30 hover:bg-slate-900/20 transition-colors duration-150">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs text-slate-300 bg-slate-900/60 px-2 py-0.5 rounded-md border border-slate-800/60">
                          {pay.transictionId ? pay.transictionId.substring(0, 16) + "..." : `TXN_${pay._id.substring(0, 8).toUpperCase()}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-300 truncate max-w-[180px]">{pay.email}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/15 rounded-full">
                          <CheckCircle2 className="h-3 w-3" /> Completed
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-bold text-white">${pay.price?.toFixed(2)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-16 text-center">
                <CreditCard className="h-10 w-10 text-slate-700 mx-auto mb-3" />
                <p className="text-sm text-slate-500">No transactions recorded yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar Cards */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Activity className="h-4 w-4 text-green" /> Quick Actions
            </h3>
            <div className="space-y-2">
              <Link
                to="/dashboard/add-menu"
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-green/30 hover:bg-green/5 transition-all duration-200 group"
              >
                <div className="p-2 bg-green/10 border border-green/20 rounded-lg">
                  <PlusCircle className="h-4 w-4 text-green" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition">Add New Dish</p>
                  <p className="text-[10px] text-slate-500">Create a new menu item</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600 ml-auto group-hover:text-green transition" />
              </Link>
              <Link
                to="/dashboard/manage-item"
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-brand-gold/30 hover:bg-brand-gold/5 transition-all duration-200 group"
              >
                <div className="p-2 bg-brand-gold/10 border border-brand-gold/20 rounded-lg">
                  <ClipboardList className="h-4 w-4 text-brand-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition">Manage Menu</p>
                  <p className="text-[10px] text-slate-500">Edit or remove dishes</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600 ml-auto group-hover:text-brand-gold transition" />
              </Link>
              <Link
                to="/dashboard/users"
                className="flex items-center gap-3 px-3.5 py-3 rounded-xl bg-slate-900/40 border border-slate-800/50 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 group"
              >
                <div className="p-2 bg-cyan-500/10 border border-cyan-500/20 rounded-lg">
                  <Users className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition">User Manager</p>
                  <p className="text-[10px] text-slate-500">Manage roles & access</p>
                </div>
                <ChevronRight className="h-3.5 w-3.5 text-slate-600 ml-auto group-hover:text-cyan-400 transition" />
              </Link>
            </div>
          </div>

          {/* System Health */}
          <div className="bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand-gold" /> System Health
            </h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">API Response</span>
                  <span className="text-green">Healthy</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                  <div className="bg-gradient-to-r from-green to-emerald-500 h-full rounded-full w-[98%] transition-all duration-1000"></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Stripe Webhooks</span>
                  <span className="text-brand-gold">Active</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                  <div className="bg-gradient-to-r from-brand-gold to-amber-400 h-full rounded-full w-full transition-all duration-1000"></div>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-400">Database Load</span>
                  <span className="text-cyan-400">Normal</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800/60">
                  <div className="bg-gradient-to-r from-cyan-500 to-sky-400 h-full rounded-full w-[42%] transition-all duration-1000"></div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/60">
              <Clock className="h-3 w-3 text-slate-600" />
              <span className="text-[10px] text-slate-500 font-medium">Last checked: Just now</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
