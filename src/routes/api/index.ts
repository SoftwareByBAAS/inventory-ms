import express from "express";
const router = express.Router();
import products from './products'
import categories from './categories'
import suppliers from './suppliers'
import inventory from './inventory'
import orders from './orders'
import payments from './payments'

router.use('/products', products);

router.use('/categories', categories);

router.use('/suppliers', suppliers);

router.use('/inventory', inventory);

router.use('/orders', orders);

router.use('/payments', payments);

export default router;