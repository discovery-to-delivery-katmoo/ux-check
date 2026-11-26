import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

type YogaClass = { id: string; name: string; starts_at: string; places_left: number };

export default function Timetable() {
  const [classes, setClasses] = useState<YogaClass[]>([]);

  useEffect(() => {
    supabase.from("classes").select("id, name, starts_at, places_left").order("starts_at")
      .then(({ data }) => setClasses(data ?? []));
  }, []);

  if (classes.length === 0) return <p>No sessions this week.</p>;

  return (
    <main>
      <h1>This week</h1>
      <ul>
        {classes.map((c) => (
          <li key={c.id}>
            <Link to={`/class/${c.id}`}>{c.name}</Link> · {new Date(c.starts_at).toLocaleString()} ·{" "}
            <span style={{ color: c.places_left === 0 ? "red" : "green" }}>●</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
