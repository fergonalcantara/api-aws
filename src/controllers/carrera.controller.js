const { Carrera, Facultad } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const carreras = await Carrera.findAll({
      include: [
        {
          model: Facultad,
          as: 'facultad',
          attributes: ['id', 'nombre_facultad', 'codigo_facultad']
        }
      ]
    });

    res.json({
      success: true,
      data: carreras
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener carreras',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await Carrera.findByPk(id, {
      include: [
        {
          model: Facultad,
          as: 'facultad'
        }
      ]
    });

    if (!carrera) {
      return res.status(404).json({
        success: false,
        message: 'Carrera no encontrada'
      });
    }

    res.json({
      success: true,
      data: carrera
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener carrera',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { facultad_id, nombre_carrera, codigo_carrera, duracion_semestres } = req.body;

    if (!facultad_id || !nombre_carrera || !codigo_carrera || !duracion_semestres) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const nuevaCarrera = await Carrera.create({
      facultad_id,
      nombre_carrera,
      codigo_carrera,
      duracion_semestres,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Carrera creada exitosamente',
      data: nuevaCarrera
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear carrera',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { facultad_id, nombre_carrera, codigo_carrera, duracion_semestres, estado } = req.body;

    const carrera = await Carrera.findByPk(id);

    if (!carrera) {
      return res.status(404).json({
        success: false,
        message: 'Carrera no encontrada'
      });
    }

    await carrera.update({
      facultad_id: facultad_id || carrera.facultad_id,
      nombre_carrera: nombre_carrera || carrera.nombre_carrera,
      codigo_carrera: codigo_carrera || carrera.codigo_carrera,
      duracion_semestres: duracion_semestres || carrera.duracion_semestres,
      estado: estado !== undefined ? estado : carrera.estado
    });

    res.json({
      success: true,
      message: 'Carrera actualizada exitosamente',
      data: carrera
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar carrera',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await Carrera.findByPk(id);

    if (!carrera) {
      return res.status(404).json({
        success: false,
        message: 'Carrera no encontrada'
      });
    }

    await carrera.destroy();

    res.json({
      success: true,
      message: 'Carrera eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar carrera',
      error: error.message
    });
  }
};