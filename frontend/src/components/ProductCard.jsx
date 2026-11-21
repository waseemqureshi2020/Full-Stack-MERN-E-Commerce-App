import React, { useState } from 'react';

function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = () => {
    onAddToCart(product);
    setIsAdded(true);
    
    // Revert button text after 1.5 seconds
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="product-card">
      <div className="product-image">{product.image}</div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <p className="price">${product.price.toFixed(2)}</p>
        <button 
          onClick={handleClick} 
          className={isAdded ? 'added' : ''}
          disabled={isAdded}
        >
          {isAdded ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;