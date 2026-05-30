const express = require('express');
const Menu = require('../Models/Menu');
const router = express.Router();

const menuController = require('../Controller/menuController') 
const verifyToken = require('../Middleware/verifyToken')
const verifyAdmin = require('../Middleware/verifyAdmin')

//get all menu items from

router.get('/', menuController.getAllMenuItenms)

// post menu item 

router.post('/', verifyToken, verifyAdmin, menuController.postMenuItem)

// delete item

router.delete('/:id', verifyToken, verifyAdmin, menuController.deleteMenuItem)

// get single menu item
router.get('/:id', menuController.singleMenuItem)

// update single item

router.patch('/:id', verifyToken, verifyAdmin, menuController.updateMenuItem)

module.exports = router;
