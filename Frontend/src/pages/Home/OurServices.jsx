import React from "react";


const serviceLists = [
    {id: 1, title:"Catering", des:"Delight your guests with our flavors and presentation", image:"/images/home/services/icon1.png"},
    {id: 2, title:"Fast delivery", des:"We deliver your order promptly to your door", image:"/images/home/services/icon2.png"},
    {id: 3, title:"Online Ordering", des:"Explore menu & order with ease using our Online Ordering", image:"/images/home/services/icon3.png"},
    {id: 4, title:"Gift Cards", des:"Give the gift of exceptional dining with Infood Gift Cards", image:"/images/home/services/icon4.png"}

]

const OurServices = () => {
  return (
    <div className="section-container py-24 relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left story block */}
        <div className="md:w-1/2 text-left">
          <div className="space-y-4 md:w-11/12">
            <p className="subtitle">Our Story & Services</p>
            <h1 className="title leading-tight">Our Culinary Journey And Services</h1>
            <p className="my-6 text-slate-400 leading-relaxed font-light text-lg">
              "Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with warm
              hospitality."
            </p>
            <button className="bg-gradient-to-r from-green to-emerald-600 hover:from-emerald-500 hover:to-green text-white font-bold px-8 py-4 rounded-full shadow-lg shadow-green/20 hover:shadow-green/30 hover:scale-105 active:scale-95 transition-all duration-300">
              Explore Our Story
            </button>
          </div>
        </div>

        {/* Right services grid */}
        <div className="md:w-1/2 w-full">
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 items-center">
          {
            serviceLists.map((service) => (
                <div key={service.id} className="glass-card border border-slate-800/40 rounded-[2rem] py-8 px-6 text-center space-y-3 cursor-pointer hover:-translate-y-2 hover:border-green/30 transition-all duration-500 group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="w-20 h-20 mx-auto flex items-center justify-center bg-slate-950/40 border border-slate-800 rounded-full shadow-inner transform duration-500 group-hover:scale-110">
                      <img src={service.image} alt={service.title} className="w-10 h-10 object-contain"/>
                    </div>
                    <h5 className="pt-2 font-bold text-slate-100 text-lg group-hover:text-green transition-colors duration-300">{service.title}</h5>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.des}</p>
                </div>
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
