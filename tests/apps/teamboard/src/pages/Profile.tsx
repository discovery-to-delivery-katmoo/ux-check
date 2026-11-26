import { useState } from "react";
export default function Profile() {
  const [notify, setNotify] = useState(true);
  return (
    <main>
      <h1>Profile</h1>
      <label><input type="checkbox" checked={notify} onChange={() => setNotify(!notify)} /> Email me when a task is assigned to me</label>
    </main>
  );
}
