// Cart utility functions for managing cart state in localStorage

// Get cart items from localStorage
export const getCartItems = () => {
  try {
    const cart = localStorage.getItem('cartItems');
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    console.error('Error getting cart items:', error);
    return [];
  }
};

// Add item to cart
export const addToCart = (product) => {
  try {
    const cartItems = getCartItems();
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cartItems.push({
        ...product,
        quantity: 1,
        addedAt: new Date().toISOString()
      });
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    return cartItems;
  } catch (error) {
    console.error('Error adding to cart:', error);
    return getCartItems();
  }
};

// Remove item from cart
export const removeFromCart = (productId) => {
  try {
    const cartItems = getCartItems();
    const updatedCart = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return updatedCart;
  } catch (error) {
    console.error('Error removing from cart:', error);
    return getCartItems();
  }
};

// Update item quantity in cart
export const updateCartItemQuantity = (productId, quantity) => {
  try {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.id === productId);

    if (item) {
      if (quantity <= 0) {
        return removeFromCart(productId);
      }
      item.quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }

    return cartItems;
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    return getCartItems();
  }
};

// Clear cart
export const clearCart = () => {
  try {
    localStorage.removeItem('cartItems');
    return [];
  } catch (error) {
    console.error('Error clearing cart:', error);
    return getCartItems();
  }
};

// Get cart total
export const getCartTotal = () => {
  try {
    const cartItems = getCartItems();
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  } catch (error) {
    console.error('Error calculating cart total:', error);
    return 0;
  }
};

// Get cart item count
export const getCartItemCount = () => {
  try {
    const cartItems = getCartItems();
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  } catch (error) {
    console.error('Error getting cart item count:', error);
    return 0;
  }
};

// Check if item is in cart
export const isInCart = (productId) => {
  try {
    const cartItems = getCartItems();
    return cartItems.some(item => item.id === productId);
  } catch (error) {
    console.error('Error checking if item is in cart:', error);
    return false;
  }
};
