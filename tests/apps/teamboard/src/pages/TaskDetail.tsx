import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function TaskDetail() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [assignee, setAssignee] = useState("");
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    supabase.from("tasks").select("*").eq("id", id).single().then(({ data }) => { setTask(data); setAssignee(data?.assignee_email ?? ""); });
  }, [id]);

  async function save() {
    await supabase.from("tasks").update({ assignee_email: assignee }).eq("id", id);
    setEditing(false);
  }

  if (!task) return <p>Loading…</p>;
  return (
    <main>
      <h1>{task.title}</h1>
      <p>Status: {task.status}</p>
      {!editing ? (
        <button onClick={() => setEditing(true)}>Edit</button>
      ) : (
        <div>
          <button onClick={() => setAdvanced(!advanced)}>Advanced</button>
          {advanced && (
            <div>
              <label htmlFor="assignee">Assignee email</label>
              <input id="assignee" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </div>
          )}
          <button onClick={save}>Save</button>
        </div>
      )}
    </main>
  );
}
