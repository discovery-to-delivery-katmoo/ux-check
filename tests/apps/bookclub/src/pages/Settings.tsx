import { supabase } from "../lib/supabase";

export default function Settings() {
  async function deleteAccount() {
    await supabase.rpc("delete_my_account");
    window.location.href = "/";
  }
  return (
    <main>
      <h1>Settings</h1>
      <button onClick={deleteAccount}>Delete account</button>
    </main>
  );
}
