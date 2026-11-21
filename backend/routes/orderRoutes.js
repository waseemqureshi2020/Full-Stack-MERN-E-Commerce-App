import express from 'express';
import Order from '../models/Order.js';

const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
    try {
        const { customerName, items, totalPrice } = req.body;
        const order = new Order({ customerName, items, totalPrice });
        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;