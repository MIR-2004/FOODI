import React from "react";
import useMenu from "../../../Hooks/useMenu";
import { Link } from "react-router-dom";
import { Pencil, Trash2, ClipboardList, Sparkles, ImageIcon } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ManageItem = () => {
  const [menu, , refetch] = useMenu();
  const axiosSecure = useAxiosSecure();

  const handleDeleteItem = (item) => {
    Swal.fire({
      title: "Delete this item?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#39DB4A",
      cancelButtonColor: "#FF6868",
      confirmButtonText: "Yes, delete it!",
      background: "#0d1221",
      color: "#f1f5f9",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/menu/${item._id}`);
        if (res) {
          refetch();
          Swal.fire({
            title: "Deleted!",
            text: "Item has been removed.",
            icon: "success",
            background: "#0d1221",
            color: "#f1f5f9",
            confirmButtonColor: "#39DB4A",
          });
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-brand-gold/10 border border-brand-gold/20 rounded-full text-[10px] font-bold tracking-wider text-brand-gold uppercase mb-2">
            <Sparkles className="h-2.5 w-2.5" /> Inventory
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Manage <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-amber-400">Menu Items</span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {menu.length} {menu.length === 1 ? "item" : "items"} in your catalog
          </p>
        </div>
        <Link
          to="/dashboard/add-menu"
          className="flex items-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green rounded-xl shadow-lg shadow-green/15 hover:shadow-green/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
        >
          <ClipboardList className="h-3.5 w-3.5" /> Add New
        </Link>
      </div>

      {/* Table Card */}
      <div className="bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-900/30 border-b border-slate-800/60">
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">#</th>
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Image</th>
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Item Name</th>
                <th className="text-left text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Price</th>
                <th className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Edit</th>
                <th className="text-center text-[11px] font-bold text-slate-500 uppercase tracking-wider px-6 py-3.5">Delete</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item, index) => (
                <tr key={index} className="border-b border-slate-800/30 hover:bg-slate-900/20 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-bold text-slate-500">{index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-slate-800/60 bg-slate-900/40 flex items-center justify-center">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-slate-600" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-200">{item.name}</td>
                  <td className="px-6 py-4 text-sm font-bold text-brand-gold">${item.price}</td>
                  <td className="px-6 py-4 text-center">
                    <Link to={`/dashboard/update-menu/${item._id}`}>
                      <button className="p-2.5 bg-green/10 hover:bg-green/20 border border-green/20 rounded-xl text-green hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleDeleteItem(item)}
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

export default ManageItem;
