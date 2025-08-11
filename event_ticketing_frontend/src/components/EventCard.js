import React from "react";

// PUBLIC_INTERFACE
function EventCard({ event, onSelect }) {
  return (
    <div
      onClick={() => onSelect(event)}
      style={{
        border: "1px solid var(--color-border)",
        borderRadius: "var(--border-radius)",
        background: "#fff",
        cursor: "pointer",
        boxShadow: "var(--box-shadow)",
        transition: "transform 0.14s",
        display: "flex",
        flexDirection: "column"
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${event.title}`}
      onKeyDown={e => { if (e.key === "Enter") onSelect(event); }}
    >
      <img
        src={event.image}
        alt={event.title}
        style={{
          width: "100%",
          height: 140,
          objectFit: "cover",
          borderTopLeftRadius: "var(--border-radius)",
          borderTopRightRadius: "var(--border-radius)"
        }}
      />
      <div style={{ padding: "1rem" }}>
        <div style={{ fontWeight: 700, fontSize: "1.08rem", color: "var(--color-primary)" }}>
          {event.title}
        </div>
        <div style={{ fontSize: "0.97rem", margin: "0.3rem 0", color: "#333" }}>
          <strong>Date:</strong> {event.date}
        </div>
        <div style={{ fontSize: "0.95rem", color: "#666" }}>
          <strong>Venue:</strong> {event.location}
        </div>
        <div style={{ margin: "0.35rem 0", color: "var(--color-accent)" }}>
          <b>${event.price}</b> per ticket
        </div>
        <button
          style={{
            marginTop: "0.5rem",
            width: "100%",
            background: "var(--color-primary)",
            color: "#fff",
            border: 0,
            borderRadius: 6,
            padding: "7px 0",
            fontWeight: "bold",
            cursor: "pointer"
          }}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default EventCard;
