/**
 * API utility for interacting with backend.
 * Uses mock data for now, switch to real fetch with REACT_APP_API_BASE_URL for production.
 */
const API_BASE = process.env.REACT_APP_API_BASE_URL;

// PUBLIC_INTERFACE
export async function fetchEvents(searchTerm = "") {
  // TODO: replace this with actual fetch(`${API_BASE}/events?...`)
  // Sample mock events
  return [
    {
      id: "1",
      title: "Jazz Festival 2024",
      date: "2024-07-15",
      location: "Madison Square Garden",
      price: 45,
      image: "https://source.unsplash.com/random/400x200?jazz,concert",
      available: 100,
      tags: ["music", "jazz", "live"]
    },
    {
      id: "2",
      title: "Tech Summit",
      date: "2024-08-15",
      location: "Convention Center",
      price: 180,
      image: "https://source.unsplash.com/random/400x200?conference,technology",
      available: 350,
      tags: ["conference", "technology"]
    }
  ].filter(e => e.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// PUBLIC_INTERFACE
export async function fetchEventDetails(eventId) {
  return (await fetchEvents("")).find(ev => ev.id === eventId);
}

// PUBLIC_INTERFACE
export async function userLogin(email, password) {
  // Mock: always successful and returns dummy user
  return { id: "u1", email, name: "Demo User", token: "mock_token" };
}

// PUBLIC_INTERFACE
export async function userRegister(name, email, password) {
  return { id: "u2", name, email, token: "mock_token2" };
}

// PUBLIC_INTERFACE
export async function fetchUserOrders(userId) {
  // Mock order data
  return [
    { id: "o1", eventId: "1", eventName: "Jazz Festival 2024", purchaseDate: "2024-03-10", qty: 2, total: 90 },
    { id: "o2", eventId: "2", eventName: "Tech Summit", purchaseDate: "2024-04-08", qty: 1, total: 180 }
  ];
}

// PUBLIC_INTERFACE
export async function purchaseTickets({ userId, eventId, qty }) {
  // Mock always returns a success order
  return {
    orderId: "ord"+Math.floor(Math.random()*9999),
    success: true,
    qty,
    eventId
  };
}
