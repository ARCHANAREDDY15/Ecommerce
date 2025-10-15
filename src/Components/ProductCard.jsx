import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { addToCart } from '../utils/cartUtils';
import './ProductCard.css';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    // Dispatch custom event to update navbar cart count
    window.dispatchEvent(new Event('cartUpdated'));
    // You could add a toast notification here
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} className="star filled" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStar key="half" className="star half" />);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="star empty" />);
    }

    return stars;
  };

  return (
    <Card
      className="product-card shadow-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <Link to={`/Product/${product.id}`}>
          <Card.Img
            variant="top"
            src={product.thumbnail}
            alt={product.title}
            className="product-image"
          />
        </Link>

        <button
          className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlist}
        >
          <FaHeart />
        </button>

        <div className={`product-overlay ${isHovered ? 'visible' : ''}`}>
          <Button
            variant="primary"
            size="sm"
            className="add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <FaShoppingCart className="me-2" />
            Add to Cart
          </Button>
        </div>
      </div>

      <Card.Body className="product-body">
        <Link to={`/Product/${product.id}`} className="product-link">
          <Card.Title className="product-title">{product.title}</Card.Title>
        </Link>

        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-text">({product.rating})</span>
        </div>

        <Card.Text className="product-category">
          {product.category}
        </Card.Text>

        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.discountPercentage > 0 && (
            <span className="original-price">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="discount-badge">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
        </div>

        {product.stock < 10 && (
          <div className="stock-warning">
            Only {product.stock} left in stock!
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
