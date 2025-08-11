import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "./theme.css";
import NavigationBar from "./components/NavigationBar";
import EventCard from "./components/EventCard";
import TicketDetailModal from "./components/TicketDetailModal";
import UserDashboard from "./components/UserDashboard";
import { LoginForm, RegisterForm } from "./components/AuthForms";
import TicketCheckout from "./components/TicketCheckout";
import OrderHistory from "./components/OrderHistory";
import {
  fetchEvents,
  fetchEventDetails,
  userLogin,
  userRegister,
  purchaseTickets,
} from "./utils/api";

function EventList({ events, onSelect }) {
  if (!events.length)
    return (
      <div style={{ margin: "2rem auto", color: "#888", textAlign: "center" }}>
        No events found.
      </div>
    );
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))",
        gap: "2rem",
        padding: "2.4rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {events.map((e) => (
        <EventCard key={e.id} event={e} onSelect={onSelect} />
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [events, setEvents] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutQ, setCheckoutQ] = useState(1);
  const [checkoutEvent, setCheckoutEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [theme] = useState("light"); // lock light theme as per requirements

  // Effect: load events
  useEffect(() => {
    fetchEvents(searchTerm).then(setEvents);
  }, [searchTerm]);

  // lock theme to light per requirements
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  // Route helper for modals
  function handleShowDetails(event) {
    setSelected(event);
    setShowModal(true);
  }
  function handlePurchase(event, qty) {
    setShowModal(false);
    setCheckoutEvent(event);
    setCheckoutQ(qty);
    setShowCheckout(true);
  }
  function handleConfirmPurchase() {
    setLoading(true);
    purchaseTickets({
      userId: user?.id,
      eventId: checkoutEvent.id,
      qty: checkoutQ,
    }).then(() => {
      setShowCheckout(false);
      setLoading(false);
      alert("Purchase successful!");
    });
  }

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("auth");
  }

  function handleLogin(email, password) {
    setLoading(true);
    return userLogin(email, password).then((userObj) => {
      setLoading(false);
      setUser(userObj);
      window.localStorage.setItem("auth", JSON.stringify(userObj));
    });
  }
  function handleRegister(name, email, password) {
    setLoading(true);
    return userRegister(name, email, password).then((userObj) => {
      setLoading(false);
      setUser(userObj);
      window.localStorage.setItem("auth", JSON.stringify(userObj));
    });
  }
  // On mount, try auto-login from localStorage
  useEffect(() => {
    const auth = window.localStorage.getItem("auth");
    if (auth) setUser(JSON.parse(auth));
  }, []);

  return (
    <Router>
      <div className="App">
        <NavigationBar onSearch={setSearchTerm} user={user} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <EventList events={events} onSelect={handleShowDetails} />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm onLogin={handleLogin} loading={loading} />
            }
          />
          <Route
            path="/register"
            element={
              <RegisterForm onRegister={handleRegister} loading={loading} />
            }
          />
          <Route
            path="/dashboard"
            element={
              user ? <UserDashboard user={user} /> : <LoginForm onLogin={handleLogin} />
            }
          />
          <Route
            path="/orders"
            element={<OrderHistory user={user} />}
          />
        </Routes>
        <TicketDetailModal
          event={selected}
          open={showModal}
          onClose={() => setShowModal(false)}
          onPurchase={handlePurchase}
        />
        {showCheckout && checkoutEvent && (
          <TicketCheckout
            event={checkoutEvent}
            qty={checkoutQ}
            onConfirm={handleConfirmPurchase}
            onCancel={() => setShowCheckout(false)}
            loading={loading}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
