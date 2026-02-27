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

<<<<<<< HEAD
# Backend Basics Cheat Sheet (Node.js + Express.js)

Quick reference notes for Express.js setup, security, data handling, and common concepts.

## 1. SSL / TLS
- **Correct name**: Secure Sockets Layer (SSL) → now mostly **TLS** (Transport Layer Security)
- **Purpose**: "Lock the connection so no one can read the data in between."
- Encrypts data between client ↔ server → keeps data safe in transit
- Enables **HTTPS** (instead of plain HTTP)

**Key point**: Protects data **while it is traveling** over the internet.

## 2. Async / Await – Very Important Point
```js
When an async function resolves → it returns a **Promise**
Most APIs (fetch, database, file system, etc.) return Promises.
We use async/await to handle them cleanly.
3. How Data Comes in Express Requests
PartLocationHow to accessExampleRoute paramsIn the URL pathreq.params/users/:id → req.params.idQuery paramsAfter ? in URLreq.query?search=john&age=25 → req.query.searchBody dataIn the request body (POST/PUT)req.bodyJSON → req.body.email
VIP points:

req.params = dynamic parts of the URL path
req.body = data sent inside the request (usually JSON)

4. Body Parsing Middleware (very important)
Express does not parse body automatically.
JavaScript// Parse JSON bodies (most common for APIs)
app.use(express.json({ limit: '16kb' }));

// Parse form data (application/x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

limit: protects from very large payloads
extended: true → allows nested objects & arrays

5. CORS (Cross-Origin Resource Sharing)
Origin = protocol + domain + port
Examples:

https://example.com
http://localhost:3000
https://api.example.com:8080 ← different origin!

Same-Origin Policy (browser rule):
Blocks requests if origins don't match exactly → protects users.
CORS lets server say: "It's okay if this origin calls me."
JavaScript// Allow specific frontend
app.use(cors({
  origin: 'https://your-frontend.com'
}));

// Allow all (development only – less secure)
app.use(cors({ origin: '*' }));
Important examples:

www.example.com vs api.example.com → different
http://example.com vs https://example.com → different
example.com:3000 vs example.com:5173 → different

6. Middleware – What & Why
Middleware = functions that run between request and final handler
textClient → Middleware 1 → Middleware 2 → Route → Response
Common middleware tasks:

Parse JSON / form data
Handle CORS
Authentication / authorization
Logging
Add headers
Error handling

Register with app.use():
JavaScriptapp.use(express.json());
app.use(cors());
app.use(cookieParser());
Custom example:
JavaScriptapp.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date()}`);
  next(); // ← must call next() or request hangs
});
7. Serving Static Files
JavaScript// Serve everything inside 'public' folder
app.use(express.static('public'));

// With virtual path
app.use('/assets', express.static('public/assets'));
→ Browser can directly access:
http://localhost:8000/images/logo.png
8. cookie-parser
Lets server read & set cookies easily.
JavaScript// Install: npm install cookie-parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Later in routes:
console.log(req.cookies);               // read all cookies
res.cookie('theme', 'dark', { httpOnly: true, maxAge: 900000 });
9. Typical Express App Setup (copy-paste ready)
JavaScriptconst express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

// Security & parsing
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Static files (optional)
app.use('/public', express.static('public'));

// Your routes here
app.get('/', (req, res) => {
  res.json({ message: 'Backend is live 🚀' });
});

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

now we deal withe the higher order function 
what is the higher order function in the js
example?
const asyncthakder=(hanlderfunction)=>{
(req,res,next)=>{

promoise.resolvehanlderfunction()
promoise.resolve()

what is the success flag in the js 
it use for the deling with the api in the try and promises 
like in the error or suucess   

what is the 500 error?
500 is a server error in which it make that the someting is want wrong in the server but not know where   

This code snippet is a Higher-Order Function (HOF). In Node.js/Express development, its job is to act as a "wrapper" that automatically catches errors in your asynchronous routes so your server doesn't crash.

Think of it as a safety net for your API calls.
3. The "Stop Condition" (Ending the Request)
Once res.json() is called, the "cycle" is complete. The server sends the data back to the user's browser and stops right there. It doesn't need to go to next() because the job is done.

very importne?
we cannot use the this before the super because we call to the paranet constructor  in from the child 
what is the stack trace in error handling?
it save what is the  error which function is caling and in which file it has  

capturestacktrcer make the reaport of the errors of the  error stack by the server 


erroer class has the statuscode and message stack 
and response has the statuscode  message  data and also has the successive flagS