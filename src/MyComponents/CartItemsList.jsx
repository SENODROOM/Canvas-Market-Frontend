// components/CartItemsList.jsx

export function CartItemsList({ items, onRemoveItem }) {
  return (
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
          <button className="delete-btn" onClick={() => onRemoveItem(item.id)}>
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
