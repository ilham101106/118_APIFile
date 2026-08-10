require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || process.env.DB_PASSWORD || 'is101106',
    database: process.env.DB_DATABASE || process.env.DB_NAME || 'perpustakaan',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  test: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || process.env.DB_PASSWORD || 'is101106',
    database: process.env.DB_DATABASE || process.env.DB_NAME || 'perpustakaan',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres'
  },
  production: {
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || process.env.DB_PASSWORD || 'is101106',
    database: process.env.DB_DATABASE || process.env.DB_NAME || 'perpustakaan',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    dialect: process.env.DB_DIALECT || 'postgres'
  }
};
