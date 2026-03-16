import pg from "pg";

const { Client } = pg;

async function main() {
  const host = process.env.PGHOST || "localhost";
  const port = Number(process.env.PGPORT || 5432);
  const user = process.env.PGUSER || "postgres";
  const password = process.env.PGPASSWORD || "postgres";
  const dbName = "kaal_portfolio";

  const admin = new Client({ host, port, user, password, database: "postgres" });
  await admin.connect();

  const dbExists = await admin.query(
    "SELECT 1 FROM pg_database WHERE datname = $1",
    [dbName]
  );

  if (dbExists.rowCount === 0) {
    await admin.query(`CREATE DATABASE ${dbName}`);
    console.log("Created database:", dbName);
  } else {
    console.log("Database already exists:", dbName);
  }

  await admin.end();

  const appDb = new Client({ host, port, user, password, database: dbName });
  await appDb.connect();

  await appDb.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id BIGSERIAL PRIMARY KEY,
      name VARCHAR(120) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255),
      message TEXT NOT NULL,
      ip_address VARCHAR(128),
      user_agent TEXT,
      is_read BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_contacts_created_at
    ON contacts (created_at DESC);
  `);

  const countRes = await appDb.query("SELECT COUNT(*)::int AS count FROM contacts");
  console.log("contacts table ready; row count:", countRes.rows[0].count);

  await appDb.end();
}

main().catch((error) => {
  console.error("Failed to initialize PostgreSQL:", error.message);
  process.exit(1);
});
