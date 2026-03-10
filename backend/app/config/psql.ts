import pg from "../../node_modules/@types/pg";

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

const initDatabase = async () => {
  await pool.query("SELECT NOW()");
};

await initDatabase();

export default pool;
