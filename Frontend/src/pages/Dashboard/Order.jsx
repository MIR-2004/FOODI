import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from '../../Hooks/useAuth';
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { ShoppingBag, DollarSign, Calendar, Hash, ShieldAlert, PhoneCall, Compass, ArrowRight, Sparkles } from "lucide-react";

function Order() {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { refetch, data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user?.email}`);
      return res.data;
    },
    enabled: !loading && !!user?.email,
  });

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt);
    return createdAtDate.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // Calculate stats
  const totalSpent = orders.reduce((sum, item) => sum + (item.price || 0), 0);
  const latestOrder = orders.length > 0 ? formatDate(orders[0].createdAt) : "No orders";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 p-8 space-y-8 animate-pulse pt-36 max-w-screen-2xl mx-auto xl:px-24 px-4">
        <div className="h-10 w-64 bg-slate-800 rounded-xl"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 bg-slate-900/50 border border-slate-800 rounded-2xl"></div>
          ))}
        </div>
        <div className="h-96 bg-slate-900/50 border border-slate-800 rounded-[2.5rem]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 pt-36 pb-20 relative overflow-hidden">
      {/* Background Halos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="section-container max-w-screen-2xl mx-auto xl:px-24 px-4 relative z-10 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green/10 border border-green/20 rounded-full text-xs font-bold tracking-wider text-green uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Order Tracking
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Track Your Gourmet Orders</h1>
            <p className="text-slate-400 text-sm mt-1">Real-time status updates and purchase history</p>
          </div>
          <Link to="/menu" className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl shadow-lg">
            Browse Menu <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {orders.length > 0 ? (
          <>
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              
              {/* Total Orders Card */}
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-slate-450 text-xs font-bold uppercase tracking-wider">Total Transactions</p>
                    <h3 className="text-3xl font-black text-slate-100">{orders.length}</h3>
                  </div>
                  <div className="p-3 bg-green/10 border border-green/20 rounded-xl text-green">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Total Spent Card */}
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-slate-455 text-xs font-bold uppercase tracking-wider">Total Invested</p>
                    <h3 className="text-3xl font-black text-slate-100">${totalSpent.toFixed(2)}</h3>
                  </div>
                  <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-xl text-brand-gold">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Latest Order Card */}
              <div className="glass-card rounded-2xl p-5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-slate-455 text-xs font-bold uppercase tracking-wider">Last Purchase Date</p>
                    <h3 className="text-2xl font-black text-slate-100 pt-0.5">{latestOrder}</h3>
                  </div>
                  <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl text-purple-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
              </div>

            </div>

            {/* Orders Table Container */}
            <div className="glass-card rounded-[2.5rem] border border-slate-800/80 shadow-2xl p-6 md:p-8">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="w-12 text-center">#</th>
                      <th>Order Date</th>
                      <th>Transaction ID</th>
                      <th>Total Cost</th>
                      <th>Current Status</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((item, index) => {
                      const isSuccess = item.status === "success" || item.status === "completed" || item.status === "delivered";
                      return (
                        <tr key={index}>
                          <td className="text-center font-bold text-slate-550">{index + 1}</td>
                          <td className="text-slate-200 font-semibold">{formatDate(item.createdAt)}</td>
                          <td>
                            <div className="flex items-center gap-1.5">
                              <Hash className="h-3.5 w-3.5 text-slate-500" />
                              <span className="font-mono text-xs text-green bg-green/5 border border-green/10 px-2.5 py-1 rounded-lg">
                                {item.transictionId || `TXN_${item._id.substring(0, 10).toUpperCase()}`}
                              </span>
                            </div>
                          </td>
                          <td className="font-black text-brand-gold">${(item.price || 0).toFixed(2)}</td>
                          <td>
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${
                              isSuccess 
                                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                            }`}>
                              <span className={`h-1.5 w-1.5 rounded-full ${isSuccess ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-pulse"}`}></span>
                              {item.status || "Pending"}
                            </span>
                          </td>
                          <td className="text-center">
                            <Link 
                              to="/contact"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800/80 px-3 py-1.5 rounded-xl transition duration-300 shadow-md"
                            >
                              <PhoneCall className="h-3.5 w-3.5" /> Support
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        ) : (
          /* Empty State View */
          <div className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center max-w-2xl mx-auto space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="w-20 h-20 bg-slate-900 border border-slate-850 rounded-full flex items-center justify-center mx-auto text-green shadow-lg animate-pulse relative z-10">
              <ShoppingBag className="h-10 w-10" />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black text-slate-100">No Orders Placed Yet</h3>
              <p className="text-slate-450 text-sm max-w-sm mx-auto leading-relaxed">
                Explore our catalog of custom gourmet chef selections and place your first culinary order to begin tracking!
              </p>
            </div>

            <div className="pt-4 relative z-10">
              <Link to="/menu" className="inline-flex items-center gap-2 py-3.5 px-6 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green shadow-lg shadow-green/20 hover:shadow-green/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer">
                <Compass className="h-4.5 w-4.5" /> Explore Gourmet Menu
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default Order;
