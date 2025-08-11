import React, { useState } from "react";

// PUBLIC_INTERFACE
function TicketDetailModal({ event, open, onClose, onPurchase }) {
  const [qty, setQty] = useState(1);

  if (!open || !event) return null;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(30,44,62,.17)",
      zIndex: 2000
    }}>
      <div style={{
        width: 380,
        maxWidth: "95vw",
        background: "#fff",
        borderRadius: "var(--border-radius)",
        boxShadow: "var(--box-shadow)",
        padding: "2rem 1.5rem",
        position: "relative"
      }}>
        <button
          aria-label="Close modal"
          onClick={onClose}
          style={{
            position: "absolute", top: 12, right: 12,
            background: "transparent", border: "none", fontSize: 21, color: "var(--color-primary)", cursor: "pointer"
          }}
        >✖</button>

        <img src={event.image} alt={event.title} style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
        <h2 style={{ marginTop: 14, color: "var(--color-primary)" }}>{event.title}</h2>
        <div><b>Date:</b> {event.date}</div>
        <div><b>Location:</b> {event.location}</div>
        <div style={{ margin: "0.7rem 0", color: "var(--color-accent)" }}><b>${event.price}</b> per ticket</div>
        <div>
          <label htmlFor="ticketQty">Qty:</label>
          <input
            id="ticketQty"
            type="number"
            min="1"
            max={event.available}
            value={qty}
            onChange={e => setQty(+e.target.value)}
            style={{ width: 50, marginLeft: 8, padding: "3px 5px", border: "1px solid var(--color-border)", borderRadius: 4 }}
          /><span style={{ marginLeft: 6, color: "#777", fontSize: "0.93em" }}>of {event.available} left</span>
        </div>
        <button
          onClick={() => onPurchase(event, qty)}
          style={{
            marginTop: "1.2rem", width: "100%",
            background: "var(--color-primary)", color: "#fff",
            border: 0, borderRadius: 7, padding: "9px 0",
            fontWeight: 700, fontSize: 16, cursor: "pointer"
          }}>
          Purchase (${event.price * qty})
        </button>
      </div>
    </div>
  );
}

export default TicketDetailModal;
