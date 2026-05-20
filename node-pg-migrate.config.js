require('dotenv').config();

module.exports = {
  databaseUrl: {
    host: process.env.PGHOST,
    port: Number(process.env.PGPORT),
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  dir: 'migrations',
  migrationsTable: 'pgmigrations',
};