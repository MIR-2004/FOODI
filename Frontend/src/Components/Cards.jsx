import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../Context/AuthProvider";
import Swal from 'sweetalert2';
import useCart from "../Hooks/useCart";
import useAxiosSecure from "../Hooks/useAxiosSecure";


const Cards = ({ item }) => {
  const { name, image, price, recipe, _id } = item;

  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();
  const location = useLocation();

  // add to cart
  const handleAddToCart = (item) => {
    // console.log(item);
    if(user && user.email){
        const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

        axiosSecure.post('/carts', cartItem)
        .then((response) => {
          //console.log(response);
          if(response){
            refetch(); // refetch cart
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Food added on the cart.',
                  showConfirmButton: true,
                  confirmButtonColor: "#39D84A"
                })
          }
        })
        .catch( (error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
        Swal.fire({
            title: 'Please login to order the food',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
    }
}


  return (
    <div className="card glass-card relative w-96 overflow-hidden rounded-[2rem] p-4 transition-all duration-500 hover:-translate-y-2 group">
      {/* Heart rate absolute float */}
      <div
        className={`absolute right-4 top-4 p-3 rounded-full cursor-pointer z-10 bg-slate-900/80 border border-slate-800/80 backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-300 ${
          isHeartFilled ? "text-rose-500" : "text-slate-400 hover:text-rose-400"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-4.5 w-4.5 transition-transform duration-300" />
      </div>

      <Link to={`/menu/${item._id}`} className="overflow-hidden rounded-2xl block relative">
        <figure className="overflow-hidden rounded-2xl bg-slate-950/40">
          <img
            src={item.image}
            alt={item.name}
            className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 md:h-64"
          />
        </figure>
        {/* Veg / Non-Veg Badge */}
        {item.isVeg !== undefined && (
          <span className={`absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold tracking-wide backdrop-blur-md border ${
            item.isVeg
              ? "bg-green/15 border-green/30 text-green"
              : "bg-red/15 border-red/30 text-red"
          }`}>
            <span className={`w-2 h-2 rounded-full ${item.isVeg ? "bg-green" : "bg-red"}`}></span>
            {item.isVeg ? "Veg" : "Non-Veg"}
          </span>
        )}
      </Link>
      <div className="card-body px-1 py-4 space-y-2">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title text-xl font-bold text-slate-100 hover:text-green transition-colors duration-300">{item.name}</h2>
        </Link>
        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{item.recipe}</p>
        <div className="card-actions justify-between items-center pt-3 border-t border-slate-900/50">
          <h5 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-400">
            <span className="text-sm font-semibold mr-0.5">$</span>
            {item.price}
          </h5>
          <button
            className="btn bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green text-white font-bold border-0 rounded-xl px-5 shadow-lg shadow-green/10 hover:shadow-green/20 hover:scale-105 active:scale-95 transition-all duration-300"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
