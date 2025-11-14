const { Facultad } = require('../models');

// Obtener todas las facultades
exports.getAll = async (req, res) => {
  try {
    const facultades = await Facultad.findAll({
      where: { estado: 1 }
    });

    res.json({
      success: true,
      data: facultades
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener facultades',
      error: error.message
    });
  }
};

// Obtener facultad por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const facultad = await Facultad.findByPk(id);

    if (!facultad) {
      return res.status(404).json({
        success: false,
        message: 'Facultad no encontrada'
      });
    }

    res.json({
      success: true,
      data: facultad
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener facultad',
      error: error.message
    });
  }
};

// Crear facultad
exports.create = async (req, res) => {
  try {
    const { nombre_facultad, codigo_facultad, descripcion } = req.body;

    if (!nombre_facultad || !codigo_facultad) {
      return res.status(400).json({
        success: false,
        message: 'Nombre y código de facultad son requeridos'
      });
    }

    const nuevaFacultad = await Facultad.create({
      nombre_facultad,
      codigo_facultad,
      descripcion,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Facultad creada exitosamente',
      data: nuevaFacultad
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear facultad',
      error: error.message
    });
  }
};

// Actualizar facultad
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_facultad, codigo_facultad, descripcion, estado } = req.body;

    const facultad = await Facultad.findByPk(id);

    if (!facultad) {
      return res.status(404).json({
        success: false,
        message: 'Facultad no encontrada'
      });
    }

    await facultad.update({
      nombre_facultad: nombre_facultad || facultad.nombre_facultad,
      codigo_facultad: codigo_facultad || facultad.codigo_facultad,
      descripcion: descripcion !== undefined ? descripcion : facultad.descripcion,
      estado: estado !== undefined ? estado : facultad.estado
    });

    res.json({
      success: true,
      message: 'Facultad actualizada exitosamente',
      data: facultad
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar facultad',
      error: error.message
    });
  }
};

// Eliminar facultad (soft delete)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const facultad = await Facultad.findByPk(id);

    if (!facultad) {
      return res.status(404).json({
        success: false,
        message: 'Facultad no encontrada'
      });
    }

    await facultad.destroy();

    res.json({
      success: true,
      message: 'Facultad eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar facultad',
      error: error.message
    });
  }
};