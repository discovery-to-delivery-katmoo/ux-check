import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [yogaClass, setYogaClass] = useState<any>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.from("classes").select("*").eq("id", id).single().then(({ data }) => setYogaClass(data));
  }, [id]);

  async function book() {
    const { error } = await supabase.rpc("book_class", { class_id: id });
    if (error) return setMessage("Error: " + error.code);
    navigate(`/booked/${id}`);
  }

  if (!yogaClass) return <p>Loading…</p>;
  return (
    <main>
      <h1>{yogaClass.name}</h1>
      <p>{new Date(yogaClass.starts_at).toLocaleString()} with {yogaClass.teacher}</p>
      <p>{yogaClass.places_left} places left</p>
      <button onClick={book}>Reserve</button>
      {message && <p className="error">{message}</p>}
    </main>
  );
}
