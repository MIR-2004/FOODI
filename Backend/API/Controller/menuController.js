import Menu from "../Models/Menu.js";

export const getAllMenuItenms = async(req, res) =>{
    try{
        const menus = await Menu.find({}).sort({createdAt: -1});
        res.status(200).json(menus)
    }catch(error){
        res.status(500).json({message:error.message})
    }
}

// post a new menu item
export const postMenuItem = async(req, res) => {
    const newItem = req.body;
    try {
        const result = await Menu.create(newItem);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }

}

//delete a menu item
export const deleteMenuItem = async(req, res) => {
    const menuId = req.params.id;
    try {
        const deletedItem = await Menu.findByIdAndDelete(menuId)
        if(!deletedItem){
            return res.status(404).json({message: 'Menu Not Found'})
        }
        res.status(200).json({message: 'Menu Deleted Succefully'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// get single menu item
export const singleMenuItem = async (req, res) => {
    const menuId = req.params.id;
    try {
        const menu = await Menu.findById(menuId)
        res.status(200).json(menu)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

//update single menu item 
export const updateMenuItem = async (req, res) => {
    const menuId = req.params.id;
    const { name, recipe, image, price, category, isVeg} = req.body;
    try {
        const updateMenu = await Menu.findByIdAndUpdate(menuId, {name, recipe, image, price, category, isVeg}, {new: true, runValidators: true});
        if(!updateMenu){
            return res.status(404).json({message: 'Menu Not Found'})
        }
        res.status(200).json(updateMenu)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}