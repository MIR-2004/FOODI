import React, { useContext, useState } from "react";
import useCart from "../../Hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import axios from "axios";
import { Link } from "react-router-dom";

const Cartpage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  //calculate price
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  //handle increase
  const handleIncrease = (item) => {
    fetch(`https://foodi-o6pu.onrender.com/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
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
      fetch(`https://foodi-o6pu.onrender.com/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
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

      refetch();
    } else {
      alert("Item quantity can't be Zero");
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
      confirmButtonColor: "#39D84A",
      cancelButtonColor: "#d33",     
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`https://foodi-o6pu.onrender.com/carts/${item._id}`).then((response) => {
          if(response) {
            refetch();
             Swal.fire("Deleted!", "Your file has been deleted.", "success",);
           }
        })
        .catch((error) => {
          console.error(error);
        });
      }
    });
  };
  return (
    <div className="section-container max-w-screen-2xl mx-auto xl:px-24 px-4 ">
      <div className=" bg-gradient-to-r from-[#FAFAFA} from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          <div className=" space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Items Added to The <span className="text-green ">Cart</span>
            </h2>
          </div>
        </div>
      </div>

      {/**table */}

      {
        (cart.length > 0) ? <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Food</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={item.image} alt="" />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-medium">{item.name}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className="w-10 mx-2 text-center overflow-hidden appearance-none"
                  />
                  <button
                    className="btn btn-xs"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>${calculatePrice(item).toFixed(2)}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs bg-orange text-white"
                    onClick={() => handleDelete(item)}
                  >
                    <FaTrash />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div className="text-center m-20">
        <p>Cart is empty. Please add Products</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
      </div>
      }

      <hr />

      {/**customer details */}
      <div className="my-12 flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Customer Details</h3>
          <p>Name: {user?.displayName}</p>
          <p>Email: {user?.email}</p>
          <p>User_id: {user?.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <h3 className="font-medium">Shopping Details</h3>
          <p>Total Items: {cart.length}</p>
          <p>Total Price : ${orderTotal.toFixed(2)}</p>
          <Link to="/process-checkout"><button className="btn bg-green text-white mt-5">Procceed Checkout</button></Link>
        </div>
      </div>
    </div>
  );
};

export default Cartpage;
