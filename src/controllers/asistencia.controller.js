const { Asistencia, Inscripcion, Estudiante } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const asistencias = await Asistencia.findAll({
      include: [
        {
          model: Inscripcion,
          as: 'inscripcion',
          include: [
            {
              model: Estudiante,
              as: 'estudiante',
              attributes: ['id', 'nombres', 'apellidos']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: asistencias
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asistencias',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const asistencia = await Asistencia.findByPk(id, {
      include: [
        {
          model: Inscripcion,
          as: 'inscripcion'
        }
      ]
    });

    if (!asistencia) {
      return res.status(404).json({
        success: false,
        message: 'Asistencia no encontrada'
      });
    }

    res.json({
      success: true,
      data: asistencia
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asistencia',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      inscripcion_id,
      fecha_asistencia,
      tipo_asistencia,
      observaciones
    } = req.body;

    if (!inscripcion_id || !fecha_asistencia || !tipo_asistencia) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevaAsistencia = await Asistencia.create({
      inscripcion_id,
      fecha_asistencia,
      tipo_asistencia,
      observaciones,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Asistencia registrada exitosamente',
      data: nuevaAsistencia
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al registrar asistencia',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo_asistencia, observaciones, estado } = req.body;

    const asistencia = await Asistencia.findByPk(id);

    if (!asistencia) {
      return res.status(404).json({
        success: false,
        message: 'Asistencia no encontrada'
      });
    }

    await asistencia.update({
      tipo_asistencia: tipo_asistencia || asistencia.tipo_asistencia,
      observaciones: observaciones !== undefined ? observaciones : asistencia.observaciones,
      estado: estado !== undefined ? estado : asistencia.estado
    });

    res.json({
      success: true,
      message: 'Asistencia actualizada exitosamente',
      data: asistencia
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar asistencia',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const asistencia = await Asistencia.findByPk(id);

    if (!asistencia) {
      return res.status(404).json({
        success: false,
        message: 'Asistencia no encontrada'
      });
    }

    await asistencia.destroy();

    res.json({
      success: true,
      message: 'Asistencia eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar asistencia',
      error: error.message
    });
  }
};