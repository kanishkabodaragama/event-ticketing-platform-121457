import React, { useState } from "react";

// PUBLIC_INTERFACE
export function LoginForm({ onLogin, loading }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return setErr("Both fields are required");
    onLogin(email, password).catch(() => setErr("Login failed, check credentials"));
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={titleStyle}>Login</h2>
      {err && <div style={errStyle}>{err}</div>}
      <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="username" />
      <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="current-password" />
      <button style={buttonStyle} type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
    </form>
  );
}

// PUBLIC_INTERFACE
export function RegisterForm({ onRegister, loading }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) return setErr("All fields required");
    onRegister(name, email, password).catch(() => setErr("Registration failed"));
  }

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={titleStyle}>Sign Up</h2>
      {err && <div style={errStyle}>{err}</div>}
      <input style={inputStyle} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" autoComplete="name" />
      <input style={inputStyle} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" autoComplete="username" />
      <input style={inputStyle} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" autoComplete="new-password" />
      <button style={buttonStyle} type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</button>
    </form>
  );
}

// styling helpers
const formStyle = {
  maxWidth: 340,
  margin: "2.5rem auto",
  padding: "2rem",
  background: "var(--color-bg-secondary)",
  borderRadius: "var(--border-radius)",
  display: "flex",
  flexDirection: "column",
  gap: "1em"
};
const inputStyle = { padding: "12px", fontSize: 16, borderRadius: 7, border: "1px solid var(--color-border)", outline: "none" };
const buttonStyle = { padding: "10px", background: "var(--color-primary)", color: "#fff", border: 0, borderRadius: 6, fontWeight: 700, fontSize: 16, cursor: "pointer" };
const titleStyle = { color: "var(--color-primary)", marginBottom: 11, textAlign: "center" };
const errStyle = { color: "red", fontSize: 15, marginBottom: "0.6em" };

