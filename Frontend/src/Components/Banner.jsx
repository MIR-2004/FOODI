import React from "react";
import banner from "../../public/images/home/banner.png";

const Banner = () => {
  return (
    <div className="section-container bg-gradient-to-b from-slate-950 via-[#0e1726] to-slate-950 relative overflow-hidden pt-12">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="py-28 flex flex-col md:flex-row-reverse justify-between items-center gap-12 relative z-10">

        {/* Right side gourmet banner */}
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-green to-brand-gold rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={banner} 
              alt="Gourmet Masterpiece" 
              className="rounded-[2rem] shadow-2xl relative object-cover max-w-full md:h-[420px] w-full transform hover:scale-[1.02] transition-all duration-500" 
            />
          </div>

          {/* Floating glass recipe previews */}
          <div className="flex flex-col md:flex-row items-center justify-center mt-12 gap-6 w-full px-4">
            <div className="flex bg-slate-900/60 backdrop-blur-md border border-slate-800/80 py-3 px-4 rounded-2xl items-center gap-4 shadow-2xl w-64 transform hover:-translate-y-2 transition-all duration-300">
              <img
                src="/images/home/b-food1.png"
                alt="Dish preview"
                className="rounded-xl w-16 h-16 object-cover border border-slate-800"
              />
              <div className="space-y-1">
                <h5 className="font-semibold text-slate-100 text-sm">Spicy Noodles</h5>
                <div className="rating rating-xs">
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-amber-400" />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-amber-400" />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-amber-400" defaultChecked />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-amber-400" />
                  <input type="radio" name="rating-1" className="mask mask-star-2 bg-amber-400" />
                </div>
                <p className="text-brand-gold font-bold text-sm">$18.00</p>
              </div>
            </div>

            <div className="md:flex hidden bg-slate-900/60 backdrop-blur-md border border-slate-800/80 py-3 px-4 rounded-2xl items-center gap-4 shadow-2xl w-64 transform hover:-translate-y-2 transition-all duration-300">
              <img
                src="/images/home/b-food1.png"
                alt="Dish preview"
                className="rounded-xl w-16 h-16 object-cover border border-slate-800"
              />
              <div className="space-y-1">
                <h5 className="font-semibold text-slate-100 text-sm">Chef's Special</h5>
                <div className="rating rating-xs">
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" defaultChecked />
                  <input type="radio" name="rating-2" className="mask mask-star-2 bg-amber-400" />
                </div>
                <p className="text-brand-gold font-bold text-sm">$22.00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Left side text column */}
        <div className="md:w-1/2 space-y-8 px-4 text-left">
          <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tight text-white">
            Dive into Delights <br />
            Of Delectable{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-400 drop-shadow-[0_2px_15px_rgba(57,219,74,0.2)]">Food</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <button className="bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-green/20 hover:shadow-green/30 hover:scale-105 active:scale-95 transition-all duration-300">
              Order Now
            </button>
            <button className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-all duration-300">
              Explore Menu
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Banner;
