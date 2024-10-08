const carts = require("../Models/carts");

// get carts using email 

const getCartByEmail = async(req, res) => {
    try {
        const email = req.query.email;
        const query = {email: email}
        const result = await carts.find(query).exec();
        res.status(200).json(result)

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// post a cart when add to cart clicked
const addToCart = async(req, res) => {
    const {menuItemId, name, recipe, image, price, quantity, email} = req.body;
    try {
        const existingCartItem = await carts.findOne({email,menuItemId});
        if(existingCartItem){
            return res.status(400).json({message: "Product alredy exist in th cart"});
        }
        const cartItem = await carts.create({menuItemId, name, recipe, image, price, quantity, email})
        res.status(201).json(cartItem)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// delete a cart item
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deletedCart = await carts.findByIdAndDelete(cartId);
        if(!deletedCart){
            return res.status(401).json({message: "Cart Items Not find!"});
        }
        res.status(200).json({message: "Cart Item Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//update cart item 
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const {menuItemId, name, recipe, image, price, quantity, email} = req.body;

    try {
        const updatedCart = await carts.findByIdAndUpdate(
            cartId,{menuItemId, name, recipe, image, price, quantity, email},{
                new:true, runValidators: true
            }
        )
        if(!updatedCart){
            return res.status(404).json({message:"Cart item is not found"})
        }
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

//get single Cart
const getSingleCart = async (req, res) =>{
    const cartId = req.params.id;
    try {
        const cartItem = await carts.findById(cartId)
        res.status(200).json(cartItem)

    } catch (error) {
        res.status(500).json({message: error.message});
    }
}




module.exports = {
    getCartByEmail,
    addToCart,
    deleteCart,
    updateCart,
    getSingleCart
}                                                  