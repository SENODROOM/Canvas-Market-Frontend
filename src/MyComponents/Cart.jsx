

import { useState } from "react";
import im from "../Images/i7.jpeg";

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

      <button className="continue-top">← Continue Shopping</button>

      <h1 className="cart-title">Your Cart</h1>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'rgba(0, 230, 255, 0.6)' }}>
          <p style={{ fontSize: '18px' }}>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map(item => (
              <div className="cart-item" id={`cart-${item.id}`} key={item.id}>
                <div className="img-wrap">
                  <img src={item.image} alt={item.title} />
                </div>
                <div className="cart-info">
                  <h3>{item.title}</h3>
                  <p>${item.price}</p>
                </div>
                <button className="delete-btn" onClick={() => removeItem(item.id)}>✕</button>
              </div>
            ))}
          </div>

          <div style={{
            maxWidth: '1000px',
            padding: '25px',
            background: 'linear-gradient(135deg, rgba(0, 230, 255, 0.05), rgba(0, 180, 255, 0.03))',
            border: '2px solid rgba(0, 230, 255, 0.18)',
            borderRadius: '22px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backdropFilter: 'blur(18px)',
            fontSize: '18px',
            fontWeight: '600',
            margin:'20px auto '
          }}>
            <span>Total:</span>
            <span style={{ fontSize: '24px', background: 'linear-gradient(135deg, var(--orb-2-color), var(--glow-cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              ${totalPrice}
            </span>
          </div>

          <h2 className="section-title">Payment Method</h2>

          <div className="payment-nav">
            {[
              { id: "card", label: "Credit Card" },
              { id: "paypal", label: "PayPal" },
              { id: "cod", label: "Cash on Delivery" }
            ].map(method => (
              <button
                key={method.id}
                className={`payment-btn ${payment === method.id ? "active" : ""}`}
                onClick={() => setPayment(method.id)}
              >
                {method.label}
              </button>
            ))}
          </div>

          {/* CREDIT CARD SECTION */}
          <div className={`payment-details ${payment === "card" ? "show" : ""}`}>
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="Card Holder Name" />
            <div className="row">
              <input type="text" placeholder="MM/YY" />
              <input type="text" placeholder="CVV" />
            </div>
          </div>

          {/* PAYPAL SECTION */}
          <div className={`payment-details paypal ${payment === "paypal" ? "show" : ""}`} >
            <input type="email" placeholder="PayPal Email" />
            <input type="password" placeholder="Password" />
            <div style={{
              padding: '20px',
              background: 'rgba(0, 230, 255, 0.08)',
              border: '1px solid rgba(0, 230, 255, 0.18)',
              borderRadius: '14px',
              textAlign: 'center',
              color: 'rgba(0, 230, 255, 0.7)',
              fontSize: '18px',
              lineHeight: '1.5',
              height:'90px',
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}>
              You will be redirected to PayPal to complete your purchase securely.
            </div>
          </div>

          {/* CASH ON DELIVERY SECTION */}
          <div className={`payment-details ${payment === "cod" ? "show" : ""}`} >
            <div style={{
              padding: '60px ',
              background: 'rgba(0, 230, 255, 0.08)',
              border: '1px solid rgba(0, 230, 255, 0.18)',
              borderRadius: '14px',
              textAlign: 'center',
              color: 'rgba(0, 230, 255, 0.8)',
              fontSize: '18px',
              lineHeight: '1.6',
              height:'200px',
            }}>
              <p style={{ margin: '0 0 10px 0' }}>💵 Cash on Delivery</p>
              <p style={{ margin: 0, opacity: 0.7 }}>Pay when your order arrives at your doorstep</p>
            </div>
          </div>

          <h2 className="section-title">Delivery Address</h2>
          <textarea 
            className="address-box" 
            placeholder="Enter your full delivery address..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <button className="confirm-btn" onClick={handleConfirmOrder}>Confirm Order</button>
        </>
      )}
    </div>
  );
}