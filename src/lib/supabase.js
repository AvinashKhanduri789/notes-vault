import { createClient } from "@supabase/supabase-js";


export const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY);


export const getCurrentSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    return { data, error }
}


export const socialSignIn = async (provider) => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider
    });
    return { data, error };
}

export const createAccount = async (email, passowrd) => {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: passowrd,
    });
    return { data, error }
}


export const signInWithEmailAndPassword = async (email, passowrd) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: passowrd,
    });
    return {data,error}
}

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getNotes = async () => {
  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  return { data, error };
};

export const createNote = async (title, content) => {
  const { data, error } = await supabase.from("notes").insert({
    title,
    content
  }).select().single();

  return { data, error };
};

export const updateNote = async (id, title, content) => {
  const { data, error } = await supabase
    .from("notes")
    .update({ title, content })
    .eq("id", id)
    .select()
    .single();

  return { data, error };
};

export const deleteNote = async (id) => {
  const { error } = await supabase
    .from("notes")
    .delete()
    .eq("id", id);

  return { error };
};