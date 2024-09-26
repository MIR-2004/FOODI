import React, { useEffect, useState } from "react";
import Cards from "../../Components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {

    const [menu, setMenu] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(9);

    useEffect(() =>{
        const fetchData = async () => {
            try{
                const response = await fetch("http://localhost:6001/menu");
                const data = await response.json();
                //console.log(data)
                setMenu(data);
                setFilteredItems(data);
            } catch(error){
                console.log("Error fetching data", error)
            }
        };
        fetchData()
    },[])


    const filterItems = (category) => {
        const filtered = category === "all" ? menu : menu.filter((item) => item.category === category);

        setFilteredItems(filtered);
        setSelectedCategory(category);
        setCurrentPage(1)
    };

    const showAll = () => {
        setFilteredItems(menu);
        selectedCategory("all");
        setCurrentPage(1)
    };

    const handleSortChange = (option) => {
        setSortOption(option);

        let sortedItem = [...filteredItems];

        switch(option) {
            case "A-Z":
              sortedItem.sort((a,b) => a.name.localeCompare(b.name));
              break;
            case "Z-A":
                sortedItem.sort((a,b) => b.name.localeCompare(a.name));
              break;
              case "low-to-high":
                sortedItem.sort((a,b) => a.price - b.price);
              break;
              case "high-to-low":
                sortedItem.sort((a,b) => b.price - a.price);
              break;
            default:
              break;
          }

        setFilteredItems(sortedItem);
        setCurrentPage(1)
    }

    const indexOfLastItem =currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem,indexOfLastItem);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
        {/**menu Banner */}
        
      <div className="section-container bg-gradient-to-r from-[#FAFAFA} from-0% to-[#FCFCFC] to-100%">


        <div className="py-48 flex flex-col justify-center items-center gap-8">
          <div className=" text-center space-y-7 px-4">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              For the Love of Delicious {" "}
              <span className="text-green ">Food</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] md:w-4/5 mx-auto">
              Come with family & feel the joy of mouthwatering food such as Greek Salad, Lasagne, Butternut, Pumpkin, Tokusen Wagyu, Olivas Rellenas and more for a moderate cost
            </p>
            <button className="bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>

        {/**menu shop section */}

        <div className="section-container ">

            {/**filletering and sorting buttons */}
            <div className="flex flex-row md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8">

                <div className="flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap">
                    <button onClick={showAll} className={selectedCategory === "all" ? "active" : ""}>All</button>
                    <button onClick={() => filterItems("salad")} className={selectedCategory === "salad" ? "active" : ""}>Salad</button>
                    <button onClick={() => filterItems("pizza")} className={selectedCategory === "pizza" ? "active" : ""}>Pizza</button>
                    <button onClick={() => filterItems("soup")} className={selectedCategory === "soup" ? "active" : ""}>Soups</button>
                    <button onClick={() => filterItems("dessert")} className={selectedCategory === "dessert" ? "active" : ""}>Desserts</button>
                    <button onClick={() => filterItems("drinks")} className={selectedCategory === "drinks" ? "active" : ""}>Drinks</button>
                </div>

                <div className="flex justify-end mb-4 rounded-sm">
                    <div className=" bg-black p-2">
                        <FaFilter className="h-4 w-4 text-white"/>
                    </div>

                    <select name="sort" id="sort" onChange={(e) => handleSortChange(e.target.value)} value={sortOption} className="bg-black text-white px-2 py-2 rounded-sm">
                        <option value="default">Default</option>
                        <option value="A-Z">A-Z</option>
                        <option value="Z-A">Z-A</option>
                        <option value="low-to-high">Low to High Price</option>
                        <option value="high-to-low"> High to Low Price</option>
                    </select>
                </div>
            </div>


             {/**products and cards */}
            <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                {
                    currentItems.map((item) => (
                        <Cards key={item._id} item={item}/>
                    ))
                }

            </div>
        </div>

        {/**pagination section */}
        <div className="flex justify-center my8">
          {
            Array.from({length: Math.ceil(filteredItems.length /itemsPerPage)}).map((_, index) =>(
              <button key={index+1} onClick={() => paginate(index+1)} className={`mx-1 px-3 py-1 rounded-full ${currentPage === index+1 ? "bg-green text-white":"bg-gray-200"}`}>{index+1}</button>
            ))
          }
        </div>

    </div>
  );
};

export default Menu;
