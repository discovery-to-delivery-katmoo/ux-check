import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function OwnerClasses() {
  const [name, setName] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [places, setPlaces] = useState(12);
  const [saved, setSaved] = useState("");

  async function addClass(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from("classes").insert({ name, starts_at: startsAt, places_left: places });
    setSaved(error ? "We couldn't save the class. Check the time and try again." : `${name} is on the timetable.`);
  }

  return (
    <main>
      <h1>Your classes</h1>
      <p>Add a class and it appears on the members' timetable straight away.</p>
      <form onSubmit={addClass}>
        <label htmlFor="name">Class name</label>
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
        <label htmlFor="starts">Date and time</label>
        <input id="starts" type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
        <label htmlFor="places">Places</label>
        <input id="places" type="number" value={places} onChange={(e) => setPlaces(Number(e.target.value))} />
        <button type="submit">Add class</button>
      </form>
      {saved && <p role="status">{saved}</p>}
    </main>
  );
}
