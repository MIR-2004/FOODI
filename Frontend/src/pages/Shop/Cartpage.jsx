import React, { useContext, useState } from "react";
import useCart from "../../Hooks/useCart";
import { Trash2, Minus, Plus, ShoppingBag, CreditCard, User as UserIcon, Mail, ShieldAlert, Sparkles, ArrowRight, Compass } from "lucide-react";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Cartpage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const axiosSecure = useAxiosSecure();

  //calculate price
  const calculatePrice = (item) => {
    return (item.price || 0) * (item.quantity || 1);
  };

  //handle increase
  const handleIncrease = (item) => {
    axiosSecure.put(`/carts/${item._id}`, { quantity: item.quantity + 1 })
      .then((res) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
  };

  //handle decrease
  const handleDecrease = (item) => {
    if (item.quantity > 1) {
      axiosSecure.put(`/carts/${item._id}`, { quantity: item.quantity - 1 })
        .then((res) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          refetch();
          setCartItems(updatedCart);
        });
    } else {
      toast.warning("Item quantity can't be Zero");
    }
  };

  // calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  // delete button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#39DB4A",
      cancelButtonColor: "#FF6868",
      confirmButtonText: "Yes, delete it!",
      background: "#111827",
      color: "#f1f5f9"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${item._id}`).then((response) => {
          if (response) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Item removed from cart.",
              icon: "success",
              background: "#111827",
              color: "#f1f5f9",
              confirmButtonColor: "#39DB4A"
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-36 pb-20 relative overflow-hidden">
      {/* Background Glow Halos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="section-container max-w-screen-2xl mx-auto xl:px-24 px-4 relative z-10 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green/10 border border-green/20 rounded-full text-xs font-bold tracking-wider text-green uppercase mb-2">
              <Sparkles className="h-3.5 w-3.5" /> Order Bag
            </div>
            <h1 className="text-4xl font-extrabold text-white tracking-tight">Your Gourmet Selection</h1>
            <p className="text-slate-400 text-sm mt-1">Review your selections and prepare to check out securely via Stripe</p>
          </div>
          <Link to="/menu" className="flex items-center gap-1.5 text-xs font-bold text-slate-300 hover:text-white transition bg-slate-900 border border-slate-800 hover:border-slate-700 px-4 py-2.5 rounded-xl shadow-lg">
            Add More Items <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {cart.length > 0 ? (
          /* Dual-Column Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Items Table List (8 cols) */}
            <div className="lg:col-span-8 glass-card rounded-[2.5rem] border border-slate-800/80 shadow-2xl p-6 md:p-8 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th className="w-12 text-center">#</th>
                      <th>Food</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th className="text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item, index) => (
                      <tr key={index}>
                        <td className="text-center font-bold text-slate-550">{index + 1}</td>
                        <td>
                          <div className="avatar">
                            <div className="rounded-xl overflow-hidden border border-slate-800 w-14 h-14 bg-slate-950/40 flex items-center justify-center">
                              <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                            </div>
                          </div>
                        </td>
                        <td className="font-semibold text-slate-100">{item.name}</td>
                        <td>
                          <div className="flex items-center gap-1 bg-slate-950/80 border border-slate-850 px-2 py-1 rounded-xl w-max">
                            <button
                              type="button"
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition active:scale-95"
                              onClick={() => handleDecrease(item)}
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              readOnly
                              className="w-8 mx-1 text-center bg-transparent border-0 text-slate-100 font-semibold focus:outline-none focus:ring-0 text-sm"
                            />
                            <button
                              type="button"
                              className="w-7 h-7 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition active:scale-95"
                              onClick={() => handleIncrease(item)}
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                        </td>
                        <td className="font-bold text-brand-gold">${calculatePrice(item).toFixed(2)}</td>
                        <td className="text-center">
                          <button
                            type="button"
                            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl text-rose-400 hover:text-rose-300 hover:scale-105 active:scale-95 transition-all duration-300 shadow-md cursor-pointer"
                            onClick={() => handleDelete(item)}
                          >
                            <Trash2 className="h-4.5 w-4.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* RIGHT COLUMN: Order Summary Card (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Summary Invoice Card */}
              <div className="glass-card rounded-[2.5rem] border border-slate-800/80 shadow-2xl p-6 md:p-8 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-100">Order Summary</h3>
                  <p className="text-slate-400 text-xs mt-1">Unified billing breakdown and invoice totals</p>
                </div>

                <div className="space-y-3.5 border-b border-slate-900/60 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-450">Selected Items ({cart.length})</span>
                    <span className="text-slate-200 font-semibold">${cartSubTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-450">Shipping Fee</span>
                    <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded-md text-[11px]">FREE</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-450">Local Tax</span>
                    <span className="text-slate-200 font-semibold">$0.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-slate-950/40 border border-slate-850 px-4 py-3 rounded-2xl">
                  <span className="text-sm font-bold text-slate-300">Grand Total</span>
                  <span className="text-xl font-black text-green">${orderTotal.toFixed(2)}</span>
                </div>

                {/* User Info Block */}
                <div className="bg-slate-950/40 border border-slate-850 p-4 rounded-[1.5rem] space-y-3 text-left">
                  <h5 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-900 pb-2">
                    <UserIcon className="h-3.5 w-3.5 text-green" /> Delivery Account
                  </h5>
                  <div className="space-y-1.5 text-xs text-slate-300 font-medium">
                    <p className="flex justify-between">
                      <span className="text-slate-500">Name:</span> 
                      <span className="text-slate-200">{user?.displayName || "Guest"}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">Email:</span> 
                      <span className="text-slate-250 truncate max-w-[150px]">{user?.email}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500">User ID:</span> 
                      <span className="font-mono text-slate-400 truncate max-w-[150px]">{user?.uid}</span>
                    </p>
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-2">
                  <Link to="/process-checkout" className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green shadow-lg shadow-green/20 hover:shadow-green/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer">
                    <CreditCard className="h-4.5 w-4.5" /> Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* Empty State */
          <div className="glass-card rounded-[2.5rem] p-12 md:p-20 text-center max-w-2xl mx-auto space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
            
            <div className="w-20 h-20 bg-slate-900 border border-slate-850 rounded-full flex items-center justify-center mx-auto text-green shadow-lg animate-pulse relative z-10">
              <ShoppingBag className="h-10 w-10" />
            </div>

            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black text-slate-100">Your Cart is Empty</h3>
              <p className="text-slate-450 text-sm max-w-sm mx-auto leading-relaxed">
                Add delicious culinary treats from our catalog list to stage them here for a secure checkout process!
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
};

export default Cartpage;
