// components/CartHeader.jsx
import { Link } from "react-router-dom";
export function CartHeader() {
  return (
    <>
      <Link to="/Get"><button className="continue-top">← Continue Shopping</button></Link>
      <h1 className="cart-title">Your Cart</h1>
    </>
  );
}
