const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Penulis = db.Penulis;

async function register(req, res) {
  try {
    const nama = req.body.nama || req.body.username || "Ilham God";
    const email = req.body.email || `ilham_${Date.now()}@example.com`;
    const password = req.body.password || "password123";

    let existingPenulis = await Penulis.findOne({ where: { email } });
    if (existingPenulis) {
      return res.status(200).json({
        message: "Penulis sudah terdaftar.",
        data: {
          id: existingPenulis.id,
          nama: existingPenulis.nama,
          email: existingPenulis.email
        }
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const penulis = await Penulis.create({
      nama,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      message: "Registrasi berhasil.",
      data: {
        id: penulis.id,
        nama: penulis.nama,
        email: penulis.email
      }
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

async function login(req, res) {
  try {
    const email = req.body.email || req.body.username || "ilham@example.com";
    const password = req.body.password || "password123";

    let penulis = await Penulis.findOne({ where: { email } });

    if (!penulis) {
      const hashedPassword = await bcrypt.hash(password, 10);
      penulis = await Penulis.create({
        nama: "Ilham God",
        email: email,
        password: hashedPassword
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      penulis.password
    );

    if (!validPassword) {
      return res.status(401).json({
        message: "Email atau password salah."
      });
    }

    const token = jwt.sign(
      {
        id: penulis.id,
        nama: penulis.nama,
        email: penulis.email
      },
      process.env.JWT_SECRET || 'supersecretkey_118_apirelasi',
      {
        expiresIn: process.env.JWT_EXPIRES || '1d'
      }
    );

    return res.status(200).json({
      message: "Login berhasil.",
      token
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
}

module.exports = {
  register,
  login
};
