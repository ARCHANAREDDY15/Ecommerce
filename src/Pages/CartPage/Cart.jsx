import './Cart.css';
import { useEffect, useState } from 'react';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { getCartItems, removeFromCart, updateCartItemQuantity, clearCart } from '../../utils/cartUtils';

function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCartItems();

        // Listen for cart updates
        const handleCartUpdate = () => {
            loadCartItems();
        };

        window.addEventListener('cartUpdated', handleCartUpdate);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
        };
    }, []);

    const loadCartItems = () => {
        const items = getCartItems();
        setCartItems(items);
        setLoading(false);
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
        loadCartItems();
    };

    const handleUpdateQuantity = (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        updateCartItemQuantity(itemId, newQuantity);
        loadCartItems();
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            loadCartItems();
        }
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.08; // 8% tax
    };

    const calculateShipping = () => {
        const subtotal = calculateSubtotal();
        return subtotal > 50 ? 0 : 9.99; // Free shipping over $50
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax() + calculateShipping();
    };

    if (loading) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="loading-container">
                        <div className="spinner"></div>
                        <p>Loading your cart...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="cart-page">
                <div className="container">
                    <div className="empty-cart">
                        <FaShoppingBag className="empty-cart-icon" />
                        <h2>Your cart is empty</h2>
                        <p>Looks like you haven't added any items to your cart yet.</p>
                        <Link to="/" className="btn btn-primary btn-lg">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="cart-page">
            <div className="container">
                <div className="cart-header">
                    <h1>Shopping Cart</h1>
                    <p>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
                </div>

                <div className="cart-content">
                    {/* Cart Items */}
                    <div className="cart-items">
                        <div className="cart-items-header">
                            <h2>Cart Items</h2>
                            <button
                                className="btn btn-outline-danger clear-cart-btn"
                                onClick={handleClearCart}
                            >
                                Clear Cart
                            </button>
                        </div>

                        <div className="items-list">
                            {cartItems.map((item, index) => (
                                <div key={`${item.id}-${index}`} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.thumbnail} alt={item.title} />
                                    </div>

                                    <div className="item-details">
                                        <Link to={`/Product/${item.id}`} className="item-title">
                                            {item.title}
                                        </Link>
                                        <p className="item-category">{item.category}</p>
                                        <p className="item-price">${item.price}</p>
                                    </div>

                                    <div className="item-quantity">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <FaMinus />
                                            </button>
                                            <span className="quantity-value">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <FaPlus />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="item-total">
                                        <p>${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>

                                    <div className="item-actions">
                                        <button
                                            className="btn btn-outline-danger remove-btn"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="order-summary">
                        <h2>Order Summary</h2>

                        <div className="summary-details">
                            <div className="summary-row">
                                <span>Subtotal ({cartItems.length} items)</span>
                                <span>${calculateSubtotal().toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Tax</span>
                                <span>${calculateTax().toFixed(2)}</span>
                            </div>

                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}</span>
                            </div>

                            {calculateShipping() > 0 && (
                                <p className="free-shipping-note">
                                    Add ${(50 - calculateSubtotal()).toFixed(2)} more for free shipping
                                </p>
                            )}
                        </div>

                        <div className="summary-total">
                            <div className="total-row">
                                <span>Total</span>
                                <span>${calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <button className="btn btn-primary btn-lg checkout-btn">
                            Proceed to Checkout
                        </button>

                        <Link to="/" className="continue-shopping-link">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
