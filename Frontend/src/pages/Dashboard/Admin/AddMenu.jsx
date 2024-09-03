import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from '../../../Hooks/useAxiosPublic'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import Swal from 'sweetalert2';

const AddMenu = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure()
  //image hosting key
  const image_hosting_key =import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api =`https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  
  
  const onSubmit = async (data) => {
    const imageFile ={image: data.image[0] }
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers:{
        'content-type' : 'multipart/form-data'
      }
    }) 

    if(hostingImg.data.success){
      const menuItem ={
        name : data.name,
        category: data.category,
        price: data.price,
        recipe: data.recipe,
        image: hostingImg.data.data.display_url
      }

      //console.log(menuItem)
      const postMenuItem = axiosSecure.post('/menu',menuItem);
      if(postMenuItem){
        reset()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Item Is Added",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Upload A New Menu <span className="text-green">Item</span>
      </h2>

      {/**from here */}
      <div>
        {/**1st row */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>
          {/**2nd row */}
          <div className="flex items-center  gap-4">
            {/**categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select {...register("category", { required: true })}  className="select select-bordered" defaultValue="default">
                <option disabled value="default">
                  Select A Category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option>
              </select>
            </div>

            {/**prices */}

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">price*</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full "
              />
            </div>
          </div>

          {/**3rd row */}
          <div className="form-control ">
            <div className="label">
              <span className="label-text">Recipe Details</span>
            </div>
            <textarea
            {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell Words About Your Recipe"
            ></textarea>
          </div>

          {/** row 4 */}
          <div className="form-control w-full my-6">
            <input {...register("image", { required: true })} type="file" className="file-input  w-full max-w-xs" />
          </div>

          <button className="btn bg-green text-white px-6">
            Add Item
            <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
