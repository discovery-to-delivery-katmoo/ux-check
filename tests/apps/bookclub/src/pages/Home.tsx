import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function Home() {
  const [cohorts, setCohorts] = useState<any[] | null>(null);

  useEffect(() => {
    supabase.from("cohorts").select("id, title, next_meeting").then(({ data }) => setCohorts(data ?? []));
  }, []);

  if (cohorts === null) return <p>Loading…</p>;
  return (
    <main>
      <header><Link to="/settings">⚙</Link></header>
      <h1>Your cohorts</h1>
      {cohorts.length === 0 ? (
        <p>Create your first cohort to get started.</p>
      ) : (
        cohorts.map((c) => <div key={c.id}>{c.title} · next meeting {c.next_meeting}</div>)
      )}
    </main>
  );
}
