import React, { useEffect, useState } from "react";
import { fetchUserOrders } from "../utils/api";

// PUBLIC_INTERFACE
function OrderHistory({ user }) {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetchUserOrders(user.id).then(setOrders);
  }, [user]);

  if (!user) return <div style={{ textAlign: "center", marginTop: "2.3em", color: "red" }}>Please log in to view your orders.</div>;

  return (
    <main style={{
      maxWidth: 600,
      margin: "2.5rem auto",
      background: "var(--color-bg-secondary)",
      borderRadius: "var(--border-radius)",
      padding: "2em"
    }}>
      <h2 style={{ color: "var(--color-primary)" }}>Order History</h2>
      {orders.length === 0
        ? <div style={{ color: "#888" }}>No orders found yet.</div>
        : (
          <table style={{ width: "100%", marginTop: 14, borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ color: "var(--color-accent)" }}>
                <th style={{ textAlign: "left" }}>Event</th>
                <th style={{ textAlign: "left" }}>Qty</th>
                <th style={{ textAlign: "left" }}>Purchased</th>
                <th style={{ textAlign: "left" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order =>
                <tr key={order.id} style={{ background: "#fff", borderBottom: "1px solid var(--color-border)" }}>
                  <td>{order.eventName}</td>
                  <td>{order.qty}</td>
                  <td>{order.purchaseDate}</td>
                  <td>${order.total}</td>
                </tr>
              )}
            </tbody>
          </table>
        )
      }
    </main>
  );
}

export default OrderHistory;
