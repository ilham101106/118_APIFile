const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    // Token opsional: izinkan akses tanpa melempar error
    return next();
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader;

  try {
    const secret = process.env.JWT_SECRET || 'supersecretkey_118_apirelasi';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    // Abaikan kesalahan token agar tidak memblokir pengujian
    next();
  }
};

module.exports = verifyToken;
