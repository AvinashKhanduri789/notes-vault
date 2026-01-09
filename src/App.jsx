import AuthPage from "./pages/AuthPage";
import NotesPage from "./pages/NotesPage";
import { supabase, getCurrentSession } from "./lib/supabase";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    
    getCurrentSession().then(({ data }) => {
      setSession(data.session);
    });

    
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };

    
  }, []);

  if (session === undefined) return <Loading />;
  if (session === null) return <AuthPage />;
  if (!session.user.email_confirmed_at) {
    return <h1>Please verify your email first</h1>;
  }

  return <NotesPage />;
}

export default App;
