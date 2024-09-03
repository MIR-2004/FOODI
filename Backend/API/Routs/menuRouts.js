const express = require('express');
const Menu = require('../Models/Menu');
const router = express.Router();

const menuController = require('../Controller/menuController') 

//get all menu items from

router.get('/', menuController.getAllMenuItenms)

// post menu item 

router.post('/', menuController.postMenuItem)

// delete item

router.delete('/:id', menuController.deleteMenuItem)

// get single menu item
router.get('/:id', menuController.singleMenuItem)

// update single item

router.patch('/:id', menuController.updateMenuItem)

module.exports = router;
