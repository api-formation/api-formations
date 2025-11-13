import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

async function seedRoles() {
  const roles = [
    { idrole: 1, nom: "admin" },
    { idrole: 2, nom: "author" },
    { idrole: 3, nom: "user" },
  ];

for (const role of roles) {
    await pool.query(
      "INSERT INTO roles (idrole, nom) VALUES ($1, $2) ON CONFLICT (idrole) DO NOTHING",
      [role.idrole, role.nom]
    );
}

  console.log("✅ Rôles par défaut insérés avec succès.");
  await pool.end();
}

seedRoles().catch(console.error);