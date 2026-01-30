// CartPage.jsx
import { useState } from "react";
import im from "../Images/i7.jpeg";
import { CartHeader } from "../MyComponents/CartHeader";
import { CartItemsList } from "../MyComponents/CartItemsList";
import { CartTotal } from "../MyComponents/CartTotal";
import { PaymentMethodSelector } from "../MyComponents/PaymentMethodSelector";
import { PaymentDetails } from "../MyComponents/PaymentDetails";
import { DeliveryAddress } from "../MyComponents/DeliveryAddress";

const initialItems = [
  {
    id: 1,
    title: "Abstract Canvas",
    price: 120,
    image: im
  },
  {
    id: 2,
    title: "Modern Art Frame",
    price: 180,
    image: "https://images.unsplash.com/photo-1526318472351-c75fcf070305"
  }
];

export default function CartPage() {
  const [items, setItems] = useState(initialItems);
  const [payment, setPayment] = useState("card");
  const [address, setAddress] = useState("");

  const removeItem = (id) => {
    const el = document.getElementById(`cart-${id}`);
    if (el) {
      el.classList.add("removing");
      setTimeout(() => {
        setItems(items.filter(item => item.id !== id));
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
      address
    });
    alert("Order confirmed!");
  };

  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

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
