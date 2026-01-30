// components/DeliveryAddress.jsx

export function DeliveryAddress({ address, onAddressChange }) {
  return (
    <>
      <h2 className="section-title">Delivery Address</h2>
      <textarea
        className="address-box"
        placeholder="Enter your full delivery address..."
        value={address}
        onChange={(e) => onAddressChange(e.target.value)}
      />
    </>
  );
}
