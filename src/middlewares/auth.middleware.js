const jwt = require('jsonwebtoken');
const config = require('../config/config');
const { Usuario } = require('../models');

exports.verificarToken = async (req, res, next) => {
  try {
    // Obtener token del header
    const token = req.headers['authorization'];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Token no proporcionado'
      });
    }

    // Extraer token (formato: "Bearer TOKEN")
    const tokenLimpio = token.startsWith('Bearer ') ? token.slice(7) : token;

    // Verificar token
    const decoded = jwt.verify(tokenLimpio, config.jwt.secret);

    // Buscar usuario
    const usuario = await Usuario.findByPk(decoded.id, {
      attributes: { exclude: ['password_hash'] }
    });

    if (!usuario || usuario.estado !== 1) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no válido o inactivo'
      });
    }

    // Agregar usuario al request
    req.usuario = {
      id: usuario.id,
      email: usuario.email,
      tipo_usuario: usuario.tipo_usuario
    };

    next();

  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Token inválido'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expirado'
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Error al verificar token',
      error: error.message
    });
  }
};