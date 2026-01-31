// CartPage.jsx
import { useState } from "react";
import { CartHeader } from "../MyComponents/CartHeader";
import { CartItemsList } from "../MyComponents/CartItemsList";
import { CartTotal } from "../MyComponents/CartTotal";
import { PaymentMethodSelector } from "../MyComponents/PaymentMethodSelector";
import { PaymentDetails } from "../MyComponents/PaymentDetails";
import { DeliveryAddress } from "../MyComponents/DeliveryAddress";
import { useCart } from "../ContextProviders/CartContext";

export default function CartPage() {
  const { items, removeFromCart, getTotalPrice, clearCart } = useCart();
  const [payment, setPayment] = useState("card");
  const [address, setAddress] = useState("");

  const removeItem = (id) => {
    const el = document.getElementById(`cart-${id}`);
    if (el) {
      el.classList.add("removing");
      setTimeout(() => {
        removeFromCart(id);
      }, 500);
    }
  };

  const handleConfirmOrder = () => {
    if (!address.trim()) {
      alert("Please enter a delivery address");
      return;
    }
    console.log({
      items,
      payment,
      address,
      total: getTotalPrice()
    });
    alert("Order confirmed!");
    clearCart();
    setAddress("");
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

          <button className="confirm-btn" onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </>
      )}
    </div>
  );
}