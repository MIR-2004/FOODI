import React, { useEffect, useState } from "react";
import Cards from "../../Components/Cards";
import { Filter, Sparkles, Utensils, Award, ChefHat } from "lucide-react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get("/menu");
        const data = response.data;
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const filterItems = (category) => {
    const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItem = [...filteredItems];

    switch (option) {
      case "A-Z":
        sortedItem.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItem.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItem.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItem.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItem);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-slate-950 pb-20 relative overflow-hidden">
      {/* Background Glow Halos */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-green/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[30rem] h-[30rem] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Menu Banner */}
      <div className="section-container relative z-10 pt-40 pb-20 flex flex-col items-center">
        <div className="max-w-4xl w-full glass-card rounded-[2.5rem] p-10 md:p-16 text-center space-y-6 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition duration-500"></div>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green/10 border border-green/20 rounded-full text-xs font-bold tracking-wider text-green uppercase mb-2 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" /> Culinary Masterpieces
          </div>

          <h2 className="text-4xl md:text-6xl font-black md:leading-tight leading-tight text-white">
            For the Love of Delicious <span className="text-transparent bg-clip-text bg-gradient-to-r from-green to-emerald-400">Food</span>
          </h2>
          
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Savor carefully crafted recipes prepared by master chefs using premium locally-sourced ingredients. Experience Greek Salads, custom Lasagnes, and Wagyu Beef masterpieces.
          </p>

          <div className="pt-4 flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
              <ChefHat className="h-4.5 w-4.5 text-green" /> Master Chef Prepared
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
              <Award className="h-4.5 w-4.5 text-brand-gold" /> Michelin Quality
            </div>
            <div className="flex items-center gap-2 text-slate-300 text-sm font-semibold">
              <Utensils className="h-4.5 w-4.5 text-green" /> Clean & Fresh
            </div>
          </div>
        </div>
      </div>

      {/* Shop Catalog Section */}
      <div className="section-container relative z-10 space-y-10">
        
        {/* Filtering and Sorting Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/40 backdrop-blur-md border border-slate-850 p-4 rounded-[2rem] shadow-xl">
          
          {/* Category Capsules */}
          <div className="flex flex-wrap items-center gap-2 md:gap-3">
            {[
              { id: "all", label: "All Items" },
              { id: "salad", label: "Salads" },
              { id: "pizza", label: "Pizzas" },
              { id: "soup", label: "Soups" },
              { id: "dessert", label: "Desserts" },
              { id: "drinks", label: "Drinks" }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={cat.id === "all" ? showAll : () => filterItems(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition duration-300 cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-green text-white shadow-lg shadow-green/20 border border-transparent"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort Menu */}
          <div className="flex items-center gap-2.5 bg-slate-950/80 border border-slate-850 pl-3.5 pr-2.5 py-1.5 rounded-xl shadow-inner w-full md:w-auto">
            <Filter className="h-4 w-4 text-green" />
            <select
              name="sort"
              id="sort"
              onChange={(e) => handleSortChange(e.target.value)}
              value={sortOption}
              className="bg-transparent text-slate-200 border-0 focus:outline-none focus:ring-0 text-xs font-semibold cursor-pointer py-1 w-full md:w-44"
            >
              <option value="default" className="bg-slate-900 text-slate-100">Default Sorting</option>
              <option value="A-Z" className="bg-slate-900 text-slate-100">Alphabetical (A-Z)</option>
              <option value="Z-A" className="bg-slate-900 text-slate-100">Alphabetical (Z-A)</option>
              <option value="low-to-high" className="bg-slate-900 text-slate-100">Price (Low to High)</option>
              <option value="high-to-low" className="bg-slate-900 text-slate-100">Price (High to Low)</option>
            </select>
          </div>

        </div>

        {/* Cards Catalog Grid */}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 md:gap-8 pt-2">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>

        {/* Pagination Section */}
        {filteredItems.length > itemsPerPage && (
          <div className="flex justify-center items-center gap-2 pt-10">
            {Array.from({ length: Math.ceil(filteredItems.length / itemsPerPage) }).map((_, index) => {
              const pageNum = index + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  className={`w-10 h-10 flex items-center justify-center font-bold text-sm transition-all duration-300 cursor-pointer rounded-xl ${
                    currentPage === pageNum
                      ? "bg-green text-white shadow-lg shadow-green/20 border border-transparent scale-105"
                      : "bg-slate-900 border border-slate-850 text-slate-400 hover:text-white hover:border-slate-700 hover:scale-105 active:scale-95"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
};

export default Menu;
