import React from "react";

// PUBLIC_INTERFACE
function UserDashboard({ user }) {
  return (
    <main style={{
      maxWidth: 460,
      margin: "2rem auto",
      background: "var(--color-bg-secondary)",
      borderRadius: "var(--border-radius)",
      padding: "2em"
    }}>
      <h2 style={{ color: "var(--color-primary)" }}>Welcome back{user?.name ? `, ${user.name}` : ""}!</h2>
      <div style={{ margin: "1em 0", fontSize: "1.09em" }}>
        <b>Email:</b> {user.email}
      </div>
      <div style={{ color: "var(--color-accent)" }}>You can manage your tickets and see orders here.</div>
    </main>
  );
}

export default UserDashboard;
