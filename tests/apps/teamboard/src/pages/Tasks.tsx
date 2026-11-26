import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { StatusDot } from "../components/StatusDot";

export default function Tasks() {
  const [view, setView] = useState<"board" | "list" | "archived">("list");
  const [tasks, setTasks] = useState<any[] | null>(null);

  useEffect(() => {
    let q = supabase.from("tasks").select("id, title, status, due_date");
    q = view === "archived" ? q.eq("archived", true) : q.eq("archived", false);
    q.then(({ data }) => setTasks(data ?? []));
  }, [view]);

  async function markDone(id: string) {
    await supabase.from("tasks").update({ status: "done" }).eq("id", id);
    setTasks((tasks ?? []).map((t) => (t.id === id ? { ...t, status: "done" } : t)));
  }

  if (tasks === null) return <p>Loading…</p>;
  return (
    <main>
      <h1>Project tasks</h1>
      <div className="tabs">
        <button onClick={() => setView("board")}>Board</button>
        <button onClick={() => setView("list")}>List</button>
        <button onClick={() => setView("archived")}>Archived</button>
      </div>
      {tasks.length === 0 && <p>Nothing here.</p>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>
            <StatusDot status={t.status} /> <Link to={`/tasks/${t.id}`}>{t.title}</Link> · due {t.due_date}
            <button onClick={() => markDone(t.id)}>Mark done</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
