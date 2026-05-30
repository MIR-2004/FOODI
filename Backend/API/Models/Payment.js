import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
    transictionId: String,
    email: String,
    price: Number,
    quantity: Number,
    status: String,
    itemName: Array,
    cartItem: Array,
    cartItems: Array,
    menuItem: Array,
    menuItems: Array,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;