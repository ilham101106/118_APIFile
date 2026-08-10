const { Sequelize } = require('sequelize');
const { Client } = require('pg');
require('dotenv').config();

const configEnv = require('./config')[process.env.NODE_ENV || 'development'];

let sequelizeInstance = null;

const ensureDatabaseExists = async () => {
  const passwordToUse = process.env.DB_PASS || process.env.DB_PASSWORD || configEnv.password;
  try {
    const client = new Client({
      user: configEnv.username,
      password: passwordToUse,
      host: configEnv.host,
      port: configEnv.port,
      database: 'postgres',
      connectionTimeoutMillis: 3000
    });

    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${configEnv.database}'`
    );

    if (res.rowCount === 0) {
      await client.query(`CREATE DATABASE "${configEnv.database}"`);
      console.log(`Database PostgreSQL "${configEnv.database}" berhasil dibuat.`);
    }

    await client.end();
    
    sequelizeInstance = new Sequelize(
      configEnv.database,
      configEnv.username,
      passwordToUse,
      {
        host: configEnv.host,
        port: configEnv.port,
        dialect: configEnv.dialect,
        logging: false
      }
    );
  } catch (error) {
    console.warn(`[DB Notice] PostgreSQL connection attempt (${error.message}). Using fallback connection...`);
    sequelizeInstance = new Sequelize({
      dialect: 'sqlite',
      storage: './database.sqlite',
      logging: false
    });
  }
};

const getSequelize = () => {
  if (!sequelizeInstance) {
    sequelizeInstance = new Sequelize(
      configEnv.database,
      configEnv.username,
      process.env.DB_PASS || process.env.DB_PASSWORD || configEnv.password,
      {
        host: configEnv.host,
        port: configEnv.port,
        dialect: configEnv.dialect,
        logging: false
      }
    );
  }
  return sequelizeInstance;
};

const dbProxy = new Proxy({}, {
  get(target, prop) {
    const instance = getSequelize();
    const value = instance[prop];
    return typeof value === 'function' ? value.bind(instance) : value;
  }
});

module.exports = {
  sequelize: dbProxy,
  ensureDatabaseExists
};
