import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartHeader } from "../MyComponents/CartHeader";
import { CartItemsList } from "../MyComponents/CartItemsList";
import { CartTotal } from "../MyComponents/CartTotal";
import { PaymentMethodSelector } from "../MyComponents/PaymentMethodSelector";
import { PaymentDetails } from "../MyComponents/PaymentDetails";
import { DeliveryAddress } from "../MyComponents/DeliveryAddress";
import { useCart } from "../ContextProviders/CartContext";

const API_BASE = 'http://localhost:5001';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, userId, removeFromCart, getTotalPrice, clearCart, fetchCart } = useCart();
  const [payment, setPayment] = useState("card");
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const removeItem = (id) => {
    const el = document.getElementById(`cart-${id}`);
    if (el) {
      el.classList.add("removing");
      setTimeout(() => {
        removeFromCart(id);
      }, 500);
    }
  };

  const handleConfirmOrder = async () => {
    if (!userId) {
      alert("Please login to place an order");
      navigate('/login');
      return;
    }

    if (!address.trim()) {
      alert("Please enter a delivery address");
      return;
    }

    if (items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/order/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          paymentMethod: payment,
          deliveryAddress: address,
          totalPrice: getTotalPrice()
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`Order placed successfully! Order ID: ${data.order.id}`);
        setAddress("");
        setPayment("card");
        // The cart is already cleared on the backend, just update local state
        await fetchCart();
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = getTotalPrice();

  return (
    <div className="cart-page">
      <div className="floating-orbs"></div>

      <CartHeader />

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(0, 230, 255, 0.6)' }}>
          <p style={{ fontSize: '18px' }}>Your cart is empty</p>
        </div>
      ) : (
        <>
          <CartItemsList items={items} onRemoveItem={removeItem} />

          <CartTotal totalPrice={totalPrice} />

          <PaymentMethodSelector 
            selectedPayment={payment}
            onSelectPayment={setPayment}
          />

          <PaymentDetails selectedPayment={payment} />

          <DeliveryAddress 
            address={address}
            onAddressChange={setAddress}
          />

          <button 
            className="confirm-btn" 
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.6 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Placing Order...' : 'Confirm Order'}
          </button>
        </>
      )}
    </div>
  );
}