import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Users as UsersIcon, Shield, ShieldCheck, Trash2, Sparkles, Mail, UserCircle } from "lucide-react";
import { toast } from "react-toastify";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users`);
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
      toast.success(`${user.name} is now an admin!`);
      refetch();
    });
  };

  const handleDeleteUser = (user) => {
    axiosSecure.delete(`/users/${user._id}`).then((res) => {
      toast.success(`${user.name} has been removed`);
      refetch();
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-bold tracking-wider text-cyan-400 uppercase mb-2">
            <Sparkles className="h-2.5 w-2.5" /> Access Control
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            User <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-400">Management</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {users.length} registered {users.length === 1 ? "account" : "accounts"}
          </p>
        </div>
        <div className="flex items-center gap-2 bg-[#0d1221]/80 border border-slate-800/60 px-4 py-2.5 rounded-xl">
          <UsersIcon className="h-4 w-4 text-cyan-400" />
          <span className="text-sm font-bold text-white">{users.length}</span>
          <span className="text-xs text-slate-500">Total</span>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/30 border-b border-slate-800/60">
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">#</th>
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">User</th>
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Email</th>
                <th className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Role</th>
                <th className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b border-slate-800/30 hover:bg-slate-900/20 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-900/60 border border-slate-800/60 flex items-center justify-center text-slate-500 flex-shrink-0">
                        <UserCircle className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-semibold text-slate-200">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm text-slate-400">
                      <Mail className="h-3.5 w-3.5 text-slate-600" />
                      <span className="truncate max-w-[200px]">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {user.role === "admin" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-green bg-green/10 border border-green/20 rounded-full">
                        <ShieldCheck className="h-3 w-3" /> Admin
                      </span>
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-slate-400 bg-slate-900/60 border border-slate-800/60 rounded-full hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-200 cursor-pointer"
                      >
                        <Shield className="h-3 w-3" /> Make Admin
                      </button>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="p-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-400 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
