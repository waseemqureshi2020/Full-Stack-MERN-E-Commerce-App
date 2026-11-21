import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  // If cart is empty and not successful, redirect to shop
  if (cartItems.length === 0 && !isSuccess) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="btn">Go to Shop</button>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const customerName = e.target.name.value;

    // Format the items exactly how our backend expects them
    const orderData = {
      customerName: customerName,
      items: cartItems.map(item => ({
        productId: item._id,
        quantity: 1
      })),
      totalPrice: total
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        setIsSuccess(true);
        clearCart(); // Empty the cart on success
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Network error. Is the backend running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-success">
        <div className="success-icon">✓</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with MERN Store. Your order has been saved to the database.</p>
        <button onClick={() => navigate('/')} className="btn">Continue Shopping</button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      <div className="checkout-form-section">
        <h2>Checkout Details</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="name" required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Shipping Address</label>
            <input type="text" required placeholder="123 Main St, City" />
          </div>
          <div className="form-group">
            <label>Card Number (Mock)</label>
            <input type="text" required placeholder="0000 0000 0000 0000" maxLength="19" />
          </div>
          <button type="submit" className="pay-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Processing...' : `Pay $${total.toFixed(2)}`}
          </button>
        </form>
      </div>

      <div className="checkout-summary">
        <h3>Order Summary</h3>
        {cartItems.map((item, index) => (
          <div key={index} className="summary-item">
            <span>{item.image} {item.name}</span>
            <span>${item.price.toFixed(2)}</span>
          </div>
        ))}
        <div className="summary-total">
          <h3>Total</h3>
          <h3>${total.toFixed(2)}</h3>
        </div>
      </div>
    </div>
  );
}

export default Checkout;