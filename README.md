Here is a clean, professional `README.md` template tailored for your technical lead, Ibrahim Garba, covering your stack, repository architecture, and setup instructions. You can copy this directly and commit it to your GitHub repository.

---

# Mint by OMNI - Technical Handover & README

Welcome to the **Mint by OMNI** repository. This document outlines the core architecture, database schemas, and setup procedures for our digital product passport and trade bulk processing platform.

## 🚀 Tech Stack

* **Frontend:** React, Vite
* **Database & Auth:** Supabase (`trade_bulk_pos`, `tokens`)
* **Hosting & Serverless:** Netlify (Hosting + Functions)

---

## 📂 Repository Architecture

* `src/` - Frontend components and client application code
* `src/utils/supabaseClient.js` - Initialized Supabase database client connection


* `netlify/functions/` - Server-side backend functions (handling background token generation and hash routines)

---

## 🛠️ Getting Started Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Lonleyperson1014/mintbyomniio.git
cd mintbyomniio

```

### 2. Install Dependencies

```bash
npm install

```

### 3. Configure Environment Variables

Create a `.env` file in the root directory and add your credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key

```

### 4. Run the Development Server

```bash
npm run dev

```

---

## 🗄️ Database Schema (`trade_bulk_pos`)

The core data pipeline interacts with the `trade_bulk_pos` table in Supabase. Columns include:

* `contract_ref`
* `hs_code`
* `commodity`
* `quantity`
* `load_port`
* `discharge_port`
* `trade_corridor`
* `afcfta_status`
* `pipeline_stage`

---

## 🔒 Access & Collaborators

* **GitHub:** Repository management and code contributions.
* **Supabase:** Database administration and RLS policy configurations.
* **Netlify:** Deployment previews, build logs, and environment variable management.

---
