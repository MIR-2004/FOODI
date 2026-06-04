import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PlusCircle, UtensilsCrossed, DollarSign, FileText, Image, Tag, Sparkles, Leaf } from "lucide-react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddMenu = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: { isVeg: "true" }
  });
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: { "content-type": "multipart/form-data" },
    });

    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: hostingImg.data.data.display_url,
        isVeg: data.isVeg === "true",
      };

      const postMenuItem = await axiosSecure.post("/menu", menuItem);
      if (postMenuItem) {
        reset();
        toast.success("Menu item added successfully!");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-green/10 border border-green/20 rounded-full text-[10px] font-bold tracking-wider text-green uppercase mb-2">
          <Sparkles className="h-2.5 w-2.5" /> Menu Management
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Add New <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-400">Menu Item</span>
        </h1>
        <p className="text-slate-400 text-sm mt-1">Create a new gourmet dish for your restaurant catalog</p>
      </div>

      {/* Form Card */}
      <div className="bg-[#0d1221]/80 border border-slate-800/60 rounded-2xl p-6 md:p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Recipe Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <UtensilsCrossed className="h-3.5 w-3.5 text-green" /> Recipe Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="e.g. Truffle Risotto"
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-green/50 focus:border-green/50 transition-all duration-200"
            />
          </div>

          {/* Category + Price Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-brand-gold" /> Category
              </label>
              <select
                {...register("category", { required: true })}
                defaultValue="default"
                className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:ring-1 focus:ring-green/50 focus:border-green/50 transition-all duration-200 appearance-none cursor-pointer"
              >
                <option disabled value="default" className="text-slate-600">Select a category</option>
                <option value="fast food">Fast Food</option>
                <option value="meal">Meal</option>
                <option value="dessert">Dessert</option>
                <option value="starter">Starter</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-emerald-400" /> Price
              </label>
              <input
                type="number"
                step="0.01"
                {...register("price", { required: true })}
                placeholder="0.00"
                className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-green/50 focus:border-green/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Veg / Non-Veg Toggle */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Leaf className="h-3.5 w-3.5 text-green" /> Food Type
            </label>
            <div className="flex items-center gap-4">
              <label className={`flex items-center gap-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                watch("isVeg") === "true"
                  ? "bg-green/15 border-green/50 shadow-lg shadow-green/10"
                  : "bg-slate-900/60 border-slate-800/80 hover:border-slate-700"
              }`}>
                <input
                  type="radio"
                  value="true"
                  {...register("isVeg", { required: true })}
                  className="sr-only"
                />
                <span className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                  watch("isVeg") === "true" ? "bg-green border-green" : "border-green/40"
                }`}>
                  <span className={`w-2 h-2 rounded-sm transition-all duration-200 ${
                    watch("isVeg") === "true" ? "bg-white" : "bg-green/60"
                  }`}></span>
                </span>
                <span className={`text-sm font-semibold transition-colors ${
                  watch("isVeg") === "true" ? "text-green" : "text-slate-400"
                }`}>Veg</span>
              </label>
              <label className={`flex items-center gap-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                watch("isVeg") === "false"
                  ? "bg-red/15 border-red/50 shadow-lg shadow-red/10"
                  : "bg-slate-900/60 border-red/20 hover:border-red/40"
              }`}>
                <input
                  type="radio"
                  value="false"
                  {...register("isVeg", { required: true })}
                  className="sr-only"
                />
                <span className="w-4 h-4 rounded border-2 border-red flex items-center justify-center">
                  <span className="w-2 h-2 rounded-sm bg-red"></span>
                </span>
                <span className={`text-sm font-semibold transition-colors ${
                  watch("isVeg") === "false" ? "text-red" : "text-red/70"
                }`}>Non-Veg</span>
              </label>
            </div>
          </div>

          {/* Recipe Details */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="h-3.5 w-3.5 text-cyan-400" /> Recipe Details
            </label>
            <textarea
              {...register("recipe", { required: true })}
              rows="4"
              placeholder="Describe the dish ingredients, preparation method, and presentation..."
              className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-green/50 focus:border-green/50 transition-all duration-200 resize-none"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Image className="h-3.5 w-3.5 text-purple-400" /> Dish Photo
            </label>
            <div className="relative">
              <input
                {...register("image", { required: true })}
                type="file"
                accept="image/*"
                className="w-full bg-slate-900/60 border border-slate-800/80 border-dashed rounded-xl px-4 py-4 text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-green/10 file:text-green hover:file:bg-green/20 file:cursor-pointer file:transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-green/50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-8 text-sm font-bold text-white bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green rounded-xl shadow-lg shadow-green/15 hover:shadow-green/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
          >
            <PlusCircle className="h-4.5 w-4.5" /> Add to Menu
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
