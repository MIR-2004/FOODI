import express from 'express';
import { getCartByEmail, addToCart, deleteCart, updateCart, getSingleCart } from '../Controller/cartController.js';
import verifyToken from '../Middleware/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getCartByEmail);
router.post('/', addToCart);
router.delete('/:id', deleteCart);
router.put('/:id', updateCart);
router.get('/:id', getSingleCart);

export default router;