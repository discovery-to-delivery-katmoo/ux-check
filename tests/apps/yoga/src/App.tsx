import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Timetable from "./pages/Timetable";
import ClassDetail from "./pages/ClassDetail";
import BookingConfirmed from "./pages/BookingConfirmed";
import MyBookings from "./pages/MyBookings";
import OwnerClasses from "./pages/OwnerClasses";
import Account from "./pages/Account";

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Timetable />} />
        <Route path="/class/:id" element={<ClassDetail />} />
        <Route path="/booked/:id" element={<BookingConfirmed />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner/classes" element={<OwnerClasses />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

// The confirmation page is full screen, so the menu is hidden there
function Nav() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/booked")) return null;
  return (
    <nav className="nav">
      <Link to="/">Timetable</Link>
      <Link to="/my-bookings">My bookings</Link>
      <Link to="/account">Account</Link>
    </nav>
  );
}
