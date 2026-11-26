import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export default function SignUp() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [genres, setGenres] = useState<string[]>([]);
  const [contactEmail, setContactEmail] = useState("");
  const [error, setError] = useState("");

  function next() {
    if (step === 1 && !email.includes("@")) return setError("Invalid input");
    if (step === 1 && password.length < 8) return setError("Field required");
    setError("");
    setStep(step + 1);
  }

  async function finish() {
    const { error } = await supabase.auth.signUp({ email, password, options: { data: { name, genres, contactEmail } } });
    if (error) return setError(error.message);
    navigate("/home");
  }

  return (
    <main>
      {step === 1 && (
        <section>
          <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </section>
      )}
      {step === 2 && (
        <section>
          <input placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
          <p>Pick genres</p>
          {["Crime", "Sci-fi", "Romance", "History"].map((g) => (
            <div key={g} className="chip" onClick={() => setGenres([...genres, g])}>{g}</div>
          ))}
        </section>
      )}
      {step === 3 && (
        <section>
          <p>Where should we send meeting reminders?</p>
          <input placeholder="Email address" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
        </section>
      )}
      {error && <p className="error">{error}</p>}
      <div className="buttons">
        <button className="primary" onClick={() => setStep(Math.max(1, step - 1))}>Back</button>
        <button className="primary" onClick={step < 3 ? next : finish}>{step < 3 ? "Next" : "Finish"}</button>
      </div>
    </main>
  );
}
