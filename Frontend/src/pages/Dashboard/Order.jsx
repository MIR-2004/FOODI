import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from '../../Hooks/useAuth'
import { Link } from "react-router-dom";

function Order() {

  const {user} = useAuth();
  const token = localStorage.getItem('access-token')

  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `https://foodi-o6pu.onrender.com//payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });
  //console.log(orders)

  const formatDate = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString()
  }

  return (
    <div className="section-container max-w-screen-2xl mx-auto xl:px-24 px-4 ">
      <div className=" bg-gradient-to-r from-[#FAFAFA} from-0% to-[#FCFCFC] to-100%">
        <div className="py-36 flex flex-col justify-center items-center gap-8">
          <div className=" space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your <span className="text-green ">Orders!</span>
            </h2>
          </div>
        </div>
      </div>

      {/**table */}
     <div>
     {
        (orders.length > 0) ? <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-green text-white rounded-sm">
            <tr>
              <th>#</th>
              <th>Order Date</th>
              <th>TransictionId</th>
              <th>Price</th>
              <th>Status</th>
              <th>Conatact</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {orders.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    formatDate(item.createdAt)
                  }
                </td>
                <td className="font-medium">{item.transictionId}</td>
                <td>
                 ${item.price}
                </td>
                <td>{item.status}</td>
                <th>
                  <Link to="/contact"
                    className="btn btn-ghost btn-xs bg-orange text-white"
                     
                  >
                    Contact
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div className="text-center m-20">
        <p>orders is empty. Please add Products</p>
        <Link to="/menu"><button className="btn bg-green text-white mt-3">Back to Menu</button></Link>
      </div>
      }
     </div>
    </div>
  );
}

export default Order;
