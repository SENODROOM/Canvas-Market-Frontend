// components/PaymentMethodSelector.jsx

export function PaymentMethodSelector({ selectedPayment, onSelectPayment }) {
  const paymentMethods = [
    { id: "card", label: "Credit Card" },
    { id: "paypal", label: "PayPal" },
    { id: "cod", label: "Cash on Delivery" }
  ];

  return (
    <>
      <h2 className="section-title">Payment Method</h2>
      <div className="payment-nav">
        {paymentMethods.map(method => (
          <button
            key={method.id}
            className={`payment-btn ${selectedPayment === method.id ? "active" : ""}`}
            onClick={() => onSelectPayment(method.id)}
          >
            {method.label}
          </button>
        ))}
      </div>
    </>
  );
}
