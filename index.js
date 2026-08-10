require('dotenv').config();
const express = require('express');
const { sequelize, ensureDatabaseExists, Penulis, Genre, Komik } = require('./models');
const dataConverterMiddleware = require('./middleware/dataConverterMiddleware');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Body Parsers & Data Representation Middleware (JSON, XML, YAML)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(dataConverterMiddleware);

// API Routes
app.use('/api', apiRoutes);

// Root Health Endpoint
app.get('/', (req, res) => {
  res.sendFormatted({
    status: 'success',
    message: 'Welcome to 118_APIRelation - Web Service API Komik, Genre, Penulis (Pertemuan 8)',
    materi: 'JSON, XML, YAML representation, encoding, and deserialization'
  });
});

// Database Sync & Server Start
const startServer = async () => {
  try {
    await ensureDatabaseExists();
    
    // Auto-create/migrate all required tables & columns for PostgreSQL
    try {
      await sequelize.query('CREATE TABLE IF NOT EXISTS penulis (id SERIAL PRIMARY KEY, nama VARCHAR(255), email VARCHAR(255) UNIQUE, password VARCHAR(255), "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);');
      await sequelize.query('CREATE TABLE IF NOT EXISTS genre (id SERIAL PRIMARY KEY, nama VARCHAR(255), deskripsi TEXT, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);');
      await sequelize.query('CREATE TABLE IF NOT EXISTS komik (id SERIAL PRIMARY KEY, judul VARCHAR(255), sinopsis TEXT, deskripsi TEXT, pengarang VARCHAR(255), penerbit VARCHAR(255), tahun_terbit INTEGER, gambar VARCHAR(255), genre_id INTEGER, penulis_id INTEGER, "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP);');
      await sequelize.query('ALTER TABLE komik ADD COLUMN IF NOT EXISTS gambar VARCHAR(255);');

      await sequelize.query("SELECT setval('penulis_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM penulis), false);");
      await sequelize.query("SELECT setval('genre_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM genre), false);");
      await sequelize.query("SELECT setval('komik_id_seq', (SELECT COALESCE(MAX(id), 0) + 1 FROM komik), false);");
    } catch (e) {
      // Ignore sequence reset query errors
    }

    if (Penulis && typeof Penulis.sync === 'function') await Penulis.sync();
    if (Genre && typeof Genre.sync === 'function') await Genre.sync();
    if (Komik && typeof Komik.sync === 'function') await Komik.sync();
    await sequelize.sync({ alter: true });
    console.log('Database synchronized successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
  }
};

if (require.main === module) {
  startServer();
}

module.exports = app;
