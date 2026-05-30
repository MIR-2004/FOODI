import express from 'express';
import Payment from '../Models/Payment.js';
import cart from '../Models/carts.js';
import Menu from '../Models/Menu.js';
import Users from '../Models/Users.js';
import mongoose from 'mongoose';
import verifyToken from '../Middleware/verifyToken.js';
import verifyAdmin from '../Middleware/verifyAdmin.js';

const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;

//post payment inform to db
router.post('/', async(req, res) => {
    const payment = req.body;
    try {
        const paymentRequest = await Payment.create(payment)

        // delete cart after payment 
        const cartIds = payment.cartItems.map(id => new ObjectId(id))
        const deleteCartRequest = await cart.deleteMany({_id: {$in : cartIds}})

        res.status(200).json({paymentRequest, deleteCartRequest})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

router.get('/', verifyToken, async(req, res)=> {
    const email = req.query.email;
    const query = {email:email}
    try {
       const decodedEmail = req.decoded.email;
       if(email !== decodedEmail){
        return res.status(403).json({message: "Forbidden Access"})
       } 
       const  result = await Payment.find(query).sort({createdAt : -1}).exec();
       res.status(200).json(result)
    } catch (error) {
        res.status(404).json({message: error.message})
    }
})

// SaaS dashboard metrics route
router.get('/admin-stats', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const payments = await Payment.find({});
        const revenue = payments.reduce((sum, pay) => sum + pay.price, 0);
        const usersCount = await Users.countDocuments();
        const menuCount = await Menu.countDocuments();
        const ordersCount = payments.length;

        res.status(200).json({
            revenue: parseFloat(revenue.toFixed(2)),
            users: usersCount,
            menuItems: menuCount,
            orders: ordersCount
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
