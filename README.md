# Progressive Overload Tracker (API)

A simple Node.js + TypeScript + Express API backed by PostgreSQL, built to experiment with tracking gym exercise progress (top/working set per exercise) while staying close to a real-world backend stack.

This project intentionally starts **very simple** and will evolve incrementally.

---

## Tech Stack

- Node.js
- TypeScript (ESM)
- Express
- Sequelize
- PostgreSQL (via Docker)
- `tsx` for local development

---

## Prerequisites

- Node.js (18+ recommended)
- pnpm
- Docker Desktop (Apple Silicon / ARM64 for M1 Macs)
- Homebrew (for installing `psql` client)

---

## PostgreSQL Setup (Docker)

We run Postgres in Docker and connect to it locally.

### Docker Compose

The project includes a `docker-compose.yml` at the repo root:

```yml
services:
  db:
    image: postgres:16
    container_name: progressive_overload_db
    restart: unless-stopped
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: app
      POSTGRES_DB: progressive_overload
    ports:
      - "5433:5432"
    volumes:
      - progressive_overload_pgdata:/var/lib/postgresql/data

volumes:
  progressive_overload_pgdata:
```

> **Important**
>
> - We expose Postgres on **port 5433**, not 5432, to avoid conflicts with any local Postgres installation.
> - The database runs _inside Docker_, but the Node app runs locally.

### Start the database

```bash
docker compose up -d
```

### Stop the database (and remove data)

```bash
docker compose down -v
```

---

## `psql` Client Setup (macOS)

Install the PostgreSQL client (no server) via Homebrew:

```bash
brew install libpq
```

Add it to your PATH:

```bash
echo 'export PATH="/opt/homebrew/opt/libpq/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

Verify:

```bash
psql --version
```

### Connect to the Docker database

```bash
psql "postgres://app:app@127.0.0.1:5433/progressive_overload"
```

A successful connection confirms:

- Docker Postgres is running
- Credentials are correct
- Port mapping is correct

---

## Environment Variables

Create a `.env` file in the project root:

```env
PORT=3000

DB_HOST=127.0.0.1
DB_PORT=5433
DB_NAME=progressive_overload
DB_USER=app
DB_PASSWORD=app
```

> **Why `127.0.0.1` instead of `localhost`?**
>
> This avoids IPv6 / port-collision issues on macOS where `localhost` may resolve to a locally running Postgres instance instead of Docker.

---

## Running the API

### Install dependencies

```bash
pnpm install
```

### Development (watch mode)

```bash
pnpm dev
```

Uses:

```json
"dev": "tsx watch src/server.ts"
```

- Runs TypeScript directly
- Supports ESM cleanly
- Auto-restarts on file changes

---

### Production build

```bash
pnpm build
```

Uses:

```json
"build": "tsc"
```

Compiles TypeScript to `dist/`.

---

### Run compiled server

```bash
pnpm start
```

Uses:

```json
"start": "node dist/server.js"
```

---

## Health Checks

Once running:

- `GET /health`  
  Confirms the server is up.

- `GET /db-check`  
  Confirms Sequelize can connect to Postgres.

---

## Git Hygiene

This project ignores generated files and build artifacts:

- `dist/`
- `*.js`
- `*.js.map`
- `*.d.ts`
- `*.d.ts.map`
- `.env`

Only source files (`.ts`) are committed.

---

## Status

- ✅ PostgreSQL running via Docker
- ✅ Sequelize connected
- ✅ Express server running
- ⏭️ Next: migrations and first tables (`users`, `exercises`, `exercise_logs`)
