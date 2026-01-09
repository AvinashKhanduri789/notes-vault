Project: Notes Vault

Notes Vault is a simple and secure personal notes application built using React with Vite and Supabase. It allows users to sign up, log in, and manage their own private notes. Each user can only access their own data because the application uses Supabase Authentication together with Row Level Security at the database level. This ensures that notes are private, isolated per user, and protected directly inside the database. The app is fast, responsive, and designed to be minimal while still following good security and architecture practices.

How to run the project locally:

Clone the repository
Run this in your terminal:

git clone https://github.com/AvinashKhanduri789/notes-vault.git

cd notes-vault

Create environment variables
In the project root, create a file named .env and add your Supabase credentials:

VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key

Make sure you use the anon public key from Supabase and not the service role key.

Install dependencies

npm install

Start the development server

npm run dev

After this, open your browser and go to:

http://localhost:5173

That’s it — the app should now be running locally.
