import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Toast State
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  // Add to Cart with Animation
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
    setToastMessage(`${product.name} added to cart!`);
    setShowToast(true);
    
    // Hide toast after 2.5 seconds
    setTimeout(() => setShowToast(false), 2500);
  };

  // Remove from Cart
  const removeFromCart = (indexToRemove) => {
    setCartItems(cartItems.filter((_, index) => index !== indexToRemove));
  };

  // Clear Cart (Used after successful checkout)
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <div className="app-container">
        
        {/* Navbar */}
        <nav className="navbar">
          <Link to="/" className="logo">🛍️ MERN Store</Link>
          <Link to="/cart" className="cart-link">
            Cart <span className="cart-badge">{cartItems.length}</span>
          </Link>
        </nav>

        {/* Toast Notification */}
        <div className={`toast ${showToast ? 'show' : ''}`}>
          <span className="toast-icon">✓</span> {toastMessage}
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={
            loading ? (
              <div className="loading">Loading products...</div>
            ) : (
              <>
                <header>
                  <h1>Products</h1>
                  <p>Frontend powered by React | Backend powered by Node & MongoDB</p>
                </header>
                <div className="product-grid">
                  {products.map(product => (
                    <ProductCard 
                      key={product._id} 
                      product={product} 
                      onAddToCart={addToCart} 
                    />
                  ))}
                </div>
              </>
            )
          } />

          <Route path="/cart" element={
            <Cart 
              cartItems={cartItems} 
              removeFromCart={removeFromCart} 
            />
          } />

          <Route path="/checkout" element={
            <Checkout 
              cartItems={cartItems} 
              clearCart={clearCart} 
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;