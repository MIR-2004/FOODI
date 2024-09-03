const express = require('express')
const carts = require('../Models/carts')
const router = express.Router();

const cartController = require('../Controller/cartController')
const verifyToken = require('../Middleware/verifyToken')

router.get('/',verifyToken, cartController.getCartByEmail)
router.post('/', cartController.addToCart)
router.delete('/:id', cartController.deleteCart)
router.put('/:id', cartController.updateCart)
router.get('/:id', cartController.getSingleCart)

module.exports = router;