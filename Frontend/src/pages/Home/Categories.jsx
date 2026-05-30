import React from 'react'

const categoryItems = [
    {id: 1,title: "Main Dish", des:"(86 Dishes)", image: "/images/home/category/img1.png"},
    {id: 2,title: "Break Fast", des:"(12 Break Fast)", image: "/images/home/category/img2.png"},
    {id: 3,title: "Dessert", des:"(48 Dessert)", image: "/images/home/category/img3.png"},
    {id: 4,title: "Browse All", des:"(255 Items)", image: "/images/home/category/img4.png"},
]

const Categories = () => {
  return (
    <div className='section-container py-20 relative'>
      <div className='text-center space-y-2'>
        <p className='subtitle'>Customer Favorites</p>
        <h1 className='title'>Popular Categories</h1>
      </div>

      {/*cards*/}
      <div className='flex flex-col sm:flex-row flex-wrap gap-8 justify-around items-center mt-16 relative z-10'>
        {
            categoryItems.map((item, i) => (
                <div key={i} className='glass-card rounded-[2.5rem] py-8 px-6 w-72 mx-auto text-center cursor-pointer hover:-translate-y-3 hover:border-green/40 hover:shadow-xl hover:shadow-green/5 duration-500 transition-all group relative overflow-hidden'>
                  {/* Subtle inner background glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className='flex w-full mx-auto justify-center items-center relative z-10'>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className='bg-slate-950/60 p-4 border border-slate-800 rounded-full w-32 h-32 object-cover transform duration-700 group-hover:scale-110 group-hover:rotate-6 shadow-inner'
                      />
                  </div>
                  <div className='mt-6 space-y-1 relative z-10'>
                      <h5 className='font-bold text-slate-100 text-lg group-hover:text-green transition-colors duration-300'>{item.title}</h5>
                      <p className='text-slate-400 text-sm'>{item.des}</p>
                  </div>
                </div>
            ))
        }
      </div>
    </div>
  )
}

export default Categories
