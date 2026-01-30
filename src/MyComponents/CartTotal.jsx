// components/CartTotal.jsx

export function CartTotal({ totalPrice }) {
  return (
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
      margin: '20px auto'
    }}>
      <span>Total:</span>
      <span style={{
        fontSize: '24px',
        background: 'linear-gradient(135deg, var(--orb-2-color), var(--glow-cyan))',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        ${totalPrice}
      </span>
    </div>
  );
}
