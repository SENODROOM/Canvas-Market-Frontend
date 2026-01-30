// components/PaymentDetails.jsx

export function PaymentDetails({ selectedPayment }) {
  return (
    <>
      {/* CREDIT CARD SECTION */}
      <div className={`payment-details ${selectedPayment === "card" ? "show" : ""}`}>
        <input type="text" placeholder="Card Number" />
        <input type="text" placeholder="Card Holder Name" />
        <div className="row">
          <input type="text" placeholder="MM/YY" />
          <input type="text" placeholder="CVV" />
        </div>
      </div>

      {/* PAYPAL SECTION */}
      <div className={`payment-details paypal ${selectedPayment === "paypal" ? "show" : ""}`}>
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
          height: '90px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          You will be redirected to PayPal to complete your purchase securely.
        </div>
      </div>

      {/* CASH ON DELIVERY SECTION */}
      <div className={`payment-details ${selectedPayment === "cod" ? "show" : ""}`}>
        <div style={{
          padding: '60px',
          background: 'rgba(0, 230, 255, 0.08)',
          border: '1px solid rgba(0, 230, 255, 0.18)',
          borderRadius: '14px',
          textAlign: 'center',
          color: 'rgba(0, 230, 255, 0.8)',
          fontSize: '18px',
          lineHeight: '1.6',
          height: '200px'
        }}>
          <p style={{ margin: '0 0 10px 0' }}>💵 Cash on Delivery</p>
          <p style={{ margin: 0, opacity: 0.7 }}>
            Pay when your order arrives at your doorstep
          </p>
        </div>
      </div>
    </>
  );
}
