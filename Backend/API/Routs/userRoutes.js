const express = require('express')
const router = express.Router();
const userController = require('../Controller/userController');
const verifyToken = require('../Middleware/verifyToken')
const verifyAdmin = require('../Middleware/verifyAdmin')

router.get('/',verifyToken,verifyAdmin, userController.getAllUsers);
router.post('/', userController.createUser);
router.delete('/:id',verifyToken,verifyAdmin, userController.deleteUser);
router.get('/admin/:email',verifyToken, userController.getAdmin);
router.patch('/admin/:id',verifyToken,verifyAdmin, userController.makeAdmin);

module.exports = router;