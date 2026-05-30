import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    menuItemId: String,
    name: {
        type: String,
        trim: true,
        required: true,
        minlength: 3
    },
    recipe: String,
    image: String,
    price: Number,
    quantity: Number,
    email:{
        type: String,
        trim: true,
        required: true
    }
});

const carts = mongoose.models.Carts || mongoose.model("Carts", cartSchema);
export default carts;
