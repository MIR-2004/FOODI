import mongoose from 'mongoose';
const { Schema } = mongoose;

//create schema objects for menu items
const menuSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String,
    category: String,
    price: Number,
    isVeg: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// create model
const Menu = mongoose.model("Menu", menuSchema);
export default Menu;
