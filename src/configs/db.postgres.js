import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let pool;

export const connectPostgreSQL = async () => {
  try {
    const dbPassword = process.env.DB_PASSWORD;
    const dbPort = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432;

    pool = new Pool({
      host: process.env.DB_HOST || 'localhost',
      port: dbPort,
      database: process.env.DB_NAME || 'api_formations',
      user: process.env.DB_USER || 'postgres',
      password: dbPassword ? String(dbPassword) : undefined,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    pool.on('error', (err, client) => {
      console.error('Erreur inattendue sur le client PostgreSQL inactif', err);
      process.exit(-1);
    });

    const client = await pool.connect();
    console.log(`PostgreSQL connecté : ${process.env.DB_NAME || 'bookly_sql'}`);
    client.release();
  } catch (error) {
    console.error('Erreur de connexion à PostgreSQL:', error.message);
    process.exit(1);
  }
};

export function getPool() {
  if (!pool) {
    throw new Error('Pool PostgreSQL non initialisé. Appelez connectPostgreSQL() d\'abord.');
  }
  return pool;
}
