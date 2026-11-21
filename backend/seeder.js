import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const products = [
    { name: "Wireless Headphones", price: 99.99, description: "Noise-cancelling over-ear headphones.", image: "🎧", category: "Electronics" },
    { name: "Mechanical Keyboard", price: 129.50, description: "RGB mechanical keyboard with blue switches.", image: "⌨️", category: "Electronics" },
    { name: "Cotton T-Shirt", price: 19.99, description: "100% organic cotton t-shirt.", image: "👕", category: "Clothing" },
    { name: "Coffee Maker", price: 59.99, description: "12-cup programmable coffee maker.", image: "☕", category: "Home" }
];

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        await Product.deleteMany(); // Clear existing
        await Product.insertMany(products);
        console.log("✅ Database Seeded with Products!");
        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });