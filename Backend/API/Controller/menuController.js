const Menu = require("../Models/Menu");

const getAllMenuItenms = async(req, res) =>{
    try{
        const menus = await Menu.find({}).sort({createdAt: -1});
        res.status(200).json(menus)
    }catch(error){
        res.status(500).json({massage:error.massage})
    }
}

// post a new menu item
const postMenuItem = async(req, res) => {
    const newItem = req.body;
    try {
        const result = await Menu.create(newItem);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({massage:error.massage})
    }

}

//delete a menu item
const deleteMenuItem = async(req, res) => {
    const menuId = req.params.id;
    try {
        const deletedItem = await Menu.findByIdAndDelete(menuId)
        if(!deletedItem){
            return res.status(404).json({message: 'Menu Not Found'})
        }
        res.status(200).json({message: 'Menu Deleted Succefully'})
    } catch (error) {
        res.status(500).json({massage:error.massage})
    }
}

// get single menu itrem

const singleMenuItem =async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId)
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({massage:error.massage})
    }
}

//update single menu item 

const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { name, recipe, image, price, category} = req.body;
    try {
        const updateMenu = await Menu.findByIdAndUpdate(menuId, {name, recipe, image, price, category}, {new: true, runValidators: true});
        if(!updateMenu){
            return res.status(404).json({message: 'Menu Not Found'})
        }
        res.status(200).json(updateMenu)
    } catch (error) {
        res.status(500).json({massage:error.massage})
    }
}

module.exports = {
    getAllMenuItenms,
    postMenuItem,
    deleteMenuItem,
    singleMenuItem,
    updateMenuItem
}