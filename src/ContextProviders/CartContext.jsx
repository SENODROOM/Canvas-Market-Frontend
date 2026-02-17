// contexts/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();
const API_BASE = 'http://localhost:5001';

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load userId from localStorage on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
      setUserId(user.id);
      fetchCart(user.id);
    }
  }, []);

  // Fetch cart from backend
  const fetchCart = async (uid = userId) => {
    if (!uid) return;
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/cart/${uid}`);
      const data = await response.json();
      
      if (response.ok) {
        setItems(data.cart.items || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    // Check if item already exists
    const existingItem = items.find(item => item.id === product.id);
    
    if (existingItem) {
      alert('Item already in cart!');
      return;
    }

    // Prepare cart item
    const cartItem = {
      id: product.id,
      title: product.name || product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    };

    // If user is logged in, save to backend
    if (userId) {
      try {
        const response = await fetch(`${API_BASE}/cart/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem)
        });

        const data = await response.json();

        if (response.ok) {
          setItems(data.cart.items);
          console.log('Item added to cart (saved to database)');
        } else {
          console.error('Failed to add item:', data.message);
          alert(data.message || 'Failed to add item to cart');
        }
      } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart');
      }
    } else {
      // If not logged in, add to local state only
      setItems([...items, cartItem]);
      console.log('Item added to local cart (not logged in)');
    }
  };

  const removeFromCart = async (id) => {
    // If user is logged in, remove from backend
    if (userId) {
      try {
        const response = await fetch(`${API_BASE}/cart/${userId}/${id}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
          setItems(data.cart.items);
        } else {
          alert(data.message || 'Failed to remove item');
        }
      } catch (error) {
        console.error('Error removing from cart:', error);
        alert('Failed to remove item');
      }
    } else {
      // If not logged in, remove from local state
      setItems(items.filter(item => item.id !== id));
    }
  };

  const clearCart = async () => {
    // If user is logged in, clear from backend
    if (userId) {
      try {
        const response = await fetch(`${API_BASE}/cart/${userId}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (response.ok) {
          setItems([]);
        } else {
          alert(data.message || 'Failed to clear cart');
        }
      } catch (error) {
        console.error('Error clearing cart:', error);
        alert('Failed to clear cart');
      }
    } else {
      // If not logged in, clear local state
      setItems([]);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  };

  const getItemCount = () => {
    return items.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        items,
        userId,
        setUserId,
        loading,
        addToCart, 
        removeFromCart, 
        clearCart,
        getTotalPrice,
        getItemCount,
        fetchCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};