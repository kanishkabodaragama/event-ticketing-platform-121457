import React from "react";

// PUBLIC_INTERFACE
function TicketCheckout({ event, qty, onConfirm, onCancel, loading }) {
  return (
    <main style={{
      maxWidth: 390, margin: "2rem auto",
      background: "var(--color-bg-secondary)",
      borderRadius: "var(--border-radius)",
      padding: "2em"
    }}>
      <h2>Checkout</h2>
      <div><b>Event:</b> {event.title}</div>
      <div><b>Date:</b> {event.date}</div>
      <div><b>Tickets:</b> {qty}</div>
      <div><b>Total:</b> <span style={{ color: "var(--color-accent)" }}>${event.price * qty}</span></div>
      <button
        style={{
          width: "100%",
          background: "var(--color-primary)",
          color: "#fff",
          border: 0, borderRadius: 7,
          padding: "9px 0", fontWeight: 700, fontSize: 16, margin: "1em 0 0"
        }}
        onClick={onConfirm}
        disabled={loading}
      >{loading ? "Processing..." : "Confirm Purchase"}</button>
      <button
        style={{
          width: "100%", marginTop: 7,
          background: "transparent",
          color: "var(--color-primary)",
          border: 0, borderRadius: 7, fontSize: 15, fontWeight: 500, cursor: "pointer"
        }}
        onClick={onCancel}
      >Cancel</button>
    </main>
  );
}

export default TicketCheckout;
