# 🚀 Backend Development Notes (Node.js + Express + Supabase)

My personal cheat-sheet & learning path for building modern backend applications  
(updated: Feb 2026)

---

## 📋 Project Initialization

```bash
npm init -y
Creates package.json – the heart of your Node.js project
🗂 Folder Structure Basics
project/
├── public/             # ← static files (images, etc) – temporary storage
├── src/
│   ├── controllers/    # business logic
│   ├── db/             # database connection & queries
│   ├── middlewares/    # auth, validation, error handling
│   ├── routes/         # express routes
│   ├── utils/          # helpers, constants, formatters
│   └── index.js        # main server file
├── .env                # secrets (never commit!)
├── .gitignore
└── package.json

Why public/ folder?
→ Temporary place to store uploaded images/files
→ Prevents loss if server restarts / crashes (but not permanent storage)
Keeping empty folders in Git 💡
Git ignores empty folders.
Common workaround → create .gitkeep file inside

mkdir public/uploads
touch public/uploads/.gitkeep

🔒 .gitignore (Protect Sensitive Files)
Use: https://www.toptal.com/developers/gitignore
or https://gitignore.io
Common important entries:
node_modules/
.env
.env.local
.env.development
.env.production
.DS_Store
npm-debug.log
dist/
build/

🌍 Environment Variables (.env)
PORT=3000
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.project-ref.supabase.co:5432/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJh...

PORT=3000
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.project-ref.supabase.co:5432/postgres
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJh...
Never commit .env to GitHub!
🛠 Development Tools
npm install --save-dev nodemon
Add to package.json scripts
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}



Modern ESM + dotenv way (recommended 2025+):

🎨 Code Formatting (Prettier)
Keeps code style consistent across team
npm install --save-dev prettier


Create .prettierrc.json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2
}

"format": "prettier --write \"src/**/*.js\""
🗄 Database – Supabase (PostgreSQL)
Important Supabase Concepts

Concept,Emoji,What it does
Row Level Security,🔐,Invisible WHERE clause — controls row-by-row access
RLS Policies,📜,True/False conditions — who can see/update which rows
Triggers,⚡,Auto-run function on INSERT/UPDATE/DELETE
Edge Functions,🌍,Serverless functions running at edge (like Cloudflare Workers)


Enabling RLS

Go to Authentication → Policies
Enable RLS on table
Create policy (example):

SQL
-- Allow authenticated users to read their own data
create policy "Users can see their own tasks"
on public.tasks
for select
using (auth.uid() = user_id);

Trigger Example

create or replace function public.handle_new_user()
returns trigger as $$    
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
    $$ language plpgsql security definer;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

NEW → holds the new row data in trigger functions

🛠 Connecting to Supabase (PostgreSQL)

npm install express pg dotenv

Best connection practice (Pool)

// src/db/index.js
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },     // needed for Supabase
  // Very important for Pakistan / many home networks
  family: 4,                              // force IPv4 (prevents ETIMEDOUT)
});


Common Error Fix
Error: connect ETIMEDOUT ...:5432
address: '2406:da14:...'   ← IPv6 address
→ Add family: 4 to force IPv4

Important Backend Rules

Always use async/await with database calls
Wrap DB operations in try/catch
Use IIFE when needed

(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Database connected");
    client.release();
  } catch (err) {
    console.error("❌ Database connection failed", err);
  }
})();

ESM vs CommonJS:
→ No more require() if using import
→ Use "type": "module" in package.json
🌟 Final Folder Structure (Recommended)

├── public/
│   └── uploads/
│       └── .gitkeep
├── src/
│   ├── controllers/
│   ├── db/
│   │   └── index.js
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   │   └── constants.js
│   └── index.js
├── .env
├── .gitignore
├── .prettierrc.json
└── package.json

Thats by the Rehman Ali
