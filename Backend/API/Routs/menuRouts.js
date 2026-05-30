import express from 'express';
import { getAllMenuItenms, postMenuItem, deleteMenuItem, singleMenuItem, updateMenuItem } from '../Controller/menuController.js';
import verifyToken from '../Middleware/verifyToken.js';
import verifyAdmin from '../Middleware/verifyAdmin.js';

const router = express.Router();

router.get('/', getAllMenuItenms);
router.post('/', verifyToken, verifyAdmin, postMenuItem);
router.delete('/:id', verifyToken, verifyAdmin, deleteMenuItem);
router.get('/:id', singleMenuItem);
router.patch('/:id', verifyToken, verifyAdmin, updateMenuItem);

export default router;
