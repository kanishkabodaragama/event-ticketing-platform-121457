import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavigationBar({ onSearch, user, onLogout }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(search);
    navigate("/");
  };

  return (
    <nav style={{
      width: "100%",
      background: "var(--color-bg-secondary)",
      padding: "0.5rem 2rem",
      borderBottom: "1px solid var(--color-border)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      position: "sticky", top: 0, zIndex: 1000
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <Link to="/" style={{ color: "var(--color-primary)", fontWeight: 700, fontSize: "1.3rem" }}>
          🎟️ Eventify
        </Link>
        <form onSubmit={handleSearch} style={{ marginLeft: "1rem" }}>
          <input
            aria-label="Search events"
            type="search"
            placeholder="Search events..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              padding: "6px 14px",
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              outline: "none"
            }}
          />
        </form>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        {user
          ? (
            <>
              <Link to="/dashboard" style={{ color: "var(--color-accent)", fontWeight: 500 }}>Dashboard</Link>
              <Link to="/orders" style={{ color: "var(--color-primary)" }}>My Orders</Link>
              <button
                onClick={onLogout}
                style={{ background: "var(--color-secondary)", color: "var(--color-text)", border: 0, borderRadius: 7, padding: "6px 14px", fontWeight: 700, cursor: "pointer" }}
                >Logout</button>
            </>
          )
          : (
            <>
              <Link to="/login" style={{ color: "var(--color-primary)", fontWeight: 500 }}>Login</Link>
              <Link to="/register" style={{ color: "var(--color-secondary)", fontWeight: 500 }}>Signup</Link>
            </>
          )
        }
      </div>
    </nav>
  );
}

export default NavigationBar;
