const { Calificacion, Inscripcion, Asignacion } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const calificaciones = await Calificacion.findAll({
      include: [
        {
          model: Inscripcion,
          as: 'inscripcion'
        },
        {
          model: Asignacion,
          as: 'asignacion'
        }
      ]
    });

    res.json({
      success: true,
      data: calificaciones
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener calificaciones',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const calificacion = await Calificacion.findByPk(id, {
      include: [
        {
          model: Inscripcion,
          as: 'inscripcion'
        },
        {
          model: Asignacion,
          as: 'asignacion'
        }
      ]
    });

    if (!calificacion) {
      return res.status(404).json({
        success: false,
        message: 'Calificación no encontrada'
      });
    }

    res.json({
      success: true,
      data: calificacion
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener calificación',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      inscripcion_id,
      asignacion_id,
      nota,
      comentarios
    } = req.body;

    if (!inscripcion_id || !asignacion_id) {
      return res.status(400).json({
        success: false,
        message: 'inscripcion_id y asignacion_id son requeridos'
      });
    }

    const nuevaCalificacion = await Calificacion.create({
      inscripcion_id,
      asignacion_id,
      nota,
      comentarios,
      estado: nota ? 3 : 2 // 3:Revisada si tiene nota, 2:Pendiente si no
    });

    res.status(201).json({
      success: true,
      message: 'Calificación creada exitosamente',
      data: nuevaCalificacion
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear calificación',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, comentarios, estado } = req.body;

    const calificacion = await Calificacion.findByPk(id);

    if (!calificacion) {
      return res.status(404).json({
        success: false,
        message: 'Calificación no encontrada'
      });
    }

    await calificacion.update({
      nota: nota !== undefined ? nota : calificacion.nota,
      comentarios: comentarios !== undefined ? comentarios : calificacion.comentarios,
      estado: estado !== undefined ? estado : calificacion.estado
    });

    res.json({
      success: true,
      message: 'Calificación actualizada exitosamente',
      data: calificacion
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar calificación',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const calificacion = await Calificacion.findByPk(id);

    if (!calificacion) {
      return res.status(404).json({
        success: false,
        message: 'Calificación no encontrada'
      });
    }

    await calificacion.destroy();

    res.json({
      success: true,
      message: 'Calificación eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar calificación',
      error: error.message
    });
  }
};