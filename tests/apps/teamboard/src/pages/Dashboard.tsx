import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { supabase } from "../lib/supabase";
import { StatusDot } from "../components/StatusDot";

export default function Dashboard() {
  const [stats, setStats] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[] | null>(null);

  useEffect(() => {
    supabase.from("weekly_stats").select("*").then(({ data }) => setStats(data ?? []));
    supabase.from("tasks").select("id, title, status, assignee_email").order("created_at", { ascending: false }).limit(50)
      .then(({ data }) => setTasks(data ?? []));
  }, []);

  if (tasks === null) return <p>Loading…</p>;
  return (
    <main>
      <h1>Workspace overview</h1>
      <h2>Tasks completed per week</h2>
      <BarChart width={600} height={240} data={stats}><XAxis dataKey="week" /><YAxis /><Bar dataKey="done" /></BarChart>
      <h2>Time per task</h2>
      <BarChart width={600} height={240} data={stats}><XAxis dataKey="week" /><YAxis /><Bar dataKey="avg_minutes" /></BarChart>
      <h2>Recent activity</h2>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}><StatusDot status={t.status} /> {t.title} · {t.assignee_email}</li>
        ))}
      </ul>
    </main>
  );
}
