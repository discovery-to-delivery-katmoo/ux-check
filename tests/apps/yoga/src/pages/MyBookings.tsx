import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";

type Booking = { id: string; class_name: string; starts_at: string };

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[] | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.from("my_bookings").select("*").then(({ data }) => setBookings(data ?? []));
  }, []);

  // The server refuses cancellations less than 12 hours before the class
  async function cancel(bookingId: string) {
    const { error } = await supabase.rpc("cancel_booking", { booking_id: bookingId });
    if (error) setMessage("Cancellation failed (P0001)");
    else setBookings((bookings ?? []).filter((b) => b.id !== bookingId));
  }

  if (bookings === null) return <p>Loading…</p>;
  return (
    <main>
      <h1>My bookings</h1>
      <ul>
        {bookings.map((b) => (
          <li key={b.id}>
            {b.class_name} · {new Date(b.starts_at).toLocaleString()}
            <button onClick={() => cancel(b.id)}><Trash2 size={16} /></button>
          </li>
        ))}
      </ul>
      {message && <p className="error">{message}</p>}
    </main>
  );
}
