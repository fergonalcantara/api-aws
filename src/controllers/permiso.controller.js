const { Permiso } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const permisos = await Permiso.findAll({
      where: { estado: 1 }
    });

    res.json({
      success: true,
      data: permisos
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener permisos',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const permiso = await Permiso.findByPk(id);

    if (!permiso) {
      return res.status(404).json({
        success: false,
        message: 'Permiso no encontrado'
      });
    }

    res.json({
      success: true,
      data: permiso
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener permiso',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre_permiso, modulo, accion } = req.body;

    if (!nombre_permiso || !modulo || !accion) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const nuevoPermiso = await Permiso.create({
      nombre_permiso,
      modulo,
      accion,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Permiso creado exitosamente',
      data: nuevoPermiso
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear permiso',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_permiso, modulo, accion, estado } = req.body;

    const permiso = await Permiso.findByPk(id);

    if (!permiso) {
      return res.status(404).json({
        success: false,
        message: 'Permiso no encontrado'
      });
    }

    await permiso.update({
      nombre_permiso: nombre_permiso || permiso.nombre_permiso,
      modulo: modulo || permiso.modulo,
      accion: accion || permiso.accion,
      estado: estado !== undefined ? estado : permiso.estado
    });

    res.json({
      success: true,
      message: 'Permiso actualizado exitosamente',
      data: permiso
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar permiso',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const permiso = await Permiso.findByPk(id);

    if (!permiso) {
      return res.status(404).json({
        success: false,
        message: 'Permiso no encontrado'
      });
    }

    await permiso.destroy();

    res.json({
      success: true,
      message: 'Permiso eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar permiso',
      error: error.message
    });
  }
};