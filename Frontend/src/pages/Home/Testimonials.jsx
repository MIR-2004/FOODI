import React from "react";
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container py-20 relative">
      <div className="flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left collage image */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-r from-green to-emerald-600 rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <img 
              src="/images/home/testimonials/testimonials.png" 
              alt="Testimonials" 
              className="rounded-[2.5rem] shadow-2xl relative max-w-full md:h-[450px] object-cover transform hover:scale-[1.01] transition duration-500 border border-slate-900" 
            />
          </div>
        </div>

        {/* Right testimonial content */}
        <div className="md:w-1/2 text-left">
          <div className="space-y-6 md:w-11/12">
            <p className="subtitle">Testimonials</p>
            <h1 className="title leading-tight">What Our Customers Say About Us</h1>
            
            <blockquote className="text-slate-300 text-lg md:text-xl font-light italic leading-relaxed border-l-4 border-green pl-6 py-1 my-6 bg-slate-900/30 rounded-r-2xl pr-4">
              "I had the pleasure of dining at infood last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable."
            </blockquote>

            {/*avatar feedback block*/}
            <div className="flex items-center gap-6 flex-wrap pt-4">
              <div className="avatar-group -space-x-5 rtl:space-x-reverse">
                <div className="avatar border-slate-950">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" alt="customer" />
                  </div>
                </div>
                <div className="avatar border-slate-950">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png" alt="customer" />
                  </div>
                </div>
                <div className="avatar border-slate-950">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" alt="customer" />
                  </div>
                </div>
                <div className="avatar placeholder border-slate-950">
                  <div className="bg-slate-800 text-slate-200 w-12 font-bold">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h5 className="text-slate-100 font-bold text-lg">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                    <FaStar className='text-amber-400 h-5 w-5 drop-shadow-[0_0_5px_rgba(251,191,36,0.3)]'/>
                    <span className="font-semibold text-slate-200 text-md">4.9</span>
                    <span className="text-slate-400 text-sm">(18.6k Reviews)</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
