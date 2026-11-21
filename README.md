# Full-Stack MERN E-Commerce App

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

A full-stack MERN e-commerce application. Features a React frontend that fetches products from a Node/Express backend and saves user orders to MongoDB. Demonstrates API integration, global state management, and database persistence.

## 📸 Screenshots

| Storefront | Shopping Cart |
| :---: | :---: |
| <img src="frontend/screenshots/home.png" width="400" alt="Storefront"> | <img src="frontend/screenshots/cart.png" width="400" alt="Cart"> |

| Checkout Page | Order Success |
| :---: | :---: |
| <img src="frontend/screenshots/checkout.png" width="400" alt="Checkout"> | <img src="frontend/screenshots/success.png" width="400" alt="Order Success"> |

## 📖 About The Project

This project bridges the gap between frontend and backend development. It features a React frontend that fetches product data from a custom Node.js/Express API and allows users to place orders, which are then saved permanently to a MongoDB database.

It demonstrates a complete data lifecycle: from database seeding, to API serving, to React state management, and back to database persistence.

## ✨ Key Features

*   **Full-Stack Architecture:** Separated `frontend` and `backend` directories for clean code organization.
*   **Complete Shopping Flow:** Browse products, add to cart, view cart, and complete a mock checkout process.
*   **Micro-Interactions:** Custom toast notifications and button state changes to provide instant feedback when items are added to the cart.
*   **REST API:** Custom Node.js/Express API that serves product data and accepts new orders.
*   **React Router:** Seamless navigation between the Shop, Cart, and Checkout pages.
*   **Database Persistence:** Orders placed on the frontend are saved permanently to MongoDB.

## 🛠️ Tech Stack

*   **Frontend:** React, Vite, React Router, CSS3.
*   **Backend:** Node.js, Express.js.
*   **Database:** MongoDB, Mongoose.

## ⚙️ How to Run Locally

Because this is a full-stack application, you must run the backend and frontend in two separate terminals.

### 1. Setup the Backend
```bash
cd backend
npm install
# Create a .env file with MONGO_URI=your_mongodb_connection_string
node seeder.js  # Populate database with initial products
npm run dev     # Starts server on localhost:5000