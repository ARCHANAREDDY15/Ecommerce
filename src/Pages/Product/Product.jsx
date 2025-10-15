import './Product.css';
import { useState, useEffect } from 'react';
import ProductCarousel from '../../Components/ProductCarousel/ProductCarousel';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaHeart, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa';
import { addToCart } from '../../utils/cartUtils';

function Product() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isWishlisted, setIsWishlisted] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        async function productDetails() {
            try {
                setLoading(true);
                if (id) {
                    let response = await axios.get('https://dummyjson.com/products/' + id);
                    setProduct(response.data);
                    setError(null);
                }
            } catch (err) {
                setError('Failed to load product details. Please try again later.');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        }
        productDetails();
    }, [id]);

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        window.dispatchEvent(new Event('cartUpdated'));
        // You could add a toast notification here
    };

    const handleWishlist = () => {
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

    if (loading) {
        return (
            <div className="product-page loading">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-page error">
                <div className="error-container">
                    <p className="error-message">{error}</p>
                    <button
                        className="btn btn-primary"
                        onClick={() => window.location.reload()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-page">
            <div className="container">
                <div className="product-content">
                    {/* Product Images */}
                    <div className="product-images">
                        <ProductCarousel images={product.images} />
                    </div>

                    {/* Product Info */}
                    <div className="product-info">
                        <div className="product-header">
                            <h1 className="product-title">{product.title}</h1>
                            <button
                                className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                                onClick={handleWishlist}
                            >
                                <FaHeart />
                            </button>
                        </div>

                        {/* Rating */}
                        <div className="product-rating">
                            <div className="stars">
                                {renderStars(product.rating)}
                            </div>
                            <span className="rating-text">({product.rating}) • {product.reviews?.length || 0} reviews</span>
                        </div>

                        {/* Price */}
                        <div className="product-price">
                            <span className="current-price">${product.price}</span>
                            {product.discountPercentage > 0 && (
                                <>
                                    <span className="original-price">
                                        ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                                    </span>
                                    <span className="discount-badge">
                                        -{Math.round(product.discountPercentage)}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Stock Status */}
                        <div className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                            {product.stock > 0 ? (
                                <>
                                    <span className="stock-indicator in-stock"></span>
                                    In Stock ({product.stock} available)
                                </>
                            ) : (
                                <>
                                    <span className="stock-indicator out-of-stock"></span>
                                    Out of Stock
                                </>
                            )}
                        </div>

                        {/* Category */}
                        <div className="product-category">
                            <span className="category-label">Category:</span>
                            <span className="category-value">{product.category}</span>
                        </div>

                        {/* Brand */}
                        {product.brand && (
                            <div className="product-brand">
                                <span className="brand-label">Brand:</span>
                                <span className="brand-value">{product.brand}</span>
                            </div>
                        )}

                        {/* Description */}
                        <div className="product-description">
                            <h3>Description</h3>
                            <p>{product.description}</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="quantity-selector">
                            <label htmlFor="quantity">Quantity:</label>
                            <div className="quantity-controls">
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    id="quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                                    min="1"
                                    max={product.stock}
                                />
                                <button
                                    className="quantity-btn"
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    disabled={quantity >= product.stock}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="btn btn-primary btn-lg add-to-cart-btn"
                            onClick={handleAddToCart}
                            disabled={product.stock === 0}
                        >
                            <FaShoppingCart className="me-2" />
                            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                        </button>

                        {/* Features */}
                        <div className="product-features">
                            <div className="feature">
                                <FaTruck className="feature-icon" />
                                <div className="feature-text">
                                    <strong>Free Shipping</strong>
                                    <p>On orders over $50</p>
                                </div>
                            </div>
                            <div className="feature">
                                <FaShieldAlt className="feature-icon" />
                                <div className="feature-text">
                                    <strong>2 Year Warranty</strong>
                                    <p>Full coverage included</p>
                                </div>
                            </div>
                            <div className="feature">
                                <FaUndo className="feature-icon" />
                                <div className="feature-text">
                                    <strong>30-Day Returns</strong>
                                    <p>Hassle-free returns</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
