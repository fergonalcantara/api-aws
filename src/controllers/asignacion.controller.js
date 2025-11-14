const { Asignacion, Seccion, Curso } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll({
      include: [
        {
          model: Seccion,
          as: 'seccion',
          include: [
            {
              model: Curso,
              as: 'curso',
              attributes: ['id', 'nombre_curso', 'codigo_curso']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: asignaciones
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignaciones',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const asignacion = await Asignacion.findByPk(id, {
      include: [
        {
          model: Seccion,
          as: 'seccion'
        }
      ]
    });

    if (!asignacion) {
      return res.status(404).json({
        success: false,
        message: 'Asignación no encontrada'
      });
    }

    res.json({
      success: true,
      data: asignacion
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener asignación',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      seccion_id,
      nombre_asignacion,
      tipo_asignacion,
      ponderacion,
      fecha_entrega,
      descripcion
    } = req.body;

    if (!seccion_id || !nombre_asignacion || !tipo_asignacion || !ponderacion || !fecha_entrega) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevaAsignacion = await Asignacion.create({
      seccion_id,
      nombre_asignacion,
      tipo_asignacion,
      ponderacion,
      fecha_entrega,
      descripcion,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Asignación creada exitosamente',
      data: nuevaAsignacion
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear asignación',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombre_asignacion,
      tipo_asignacion,
      ponderacion,
      fecha_entrega,
      descripcion,
      estado
    } = req.body;

    const asignacion = await Asignacion.findByPk(id);

    if (!asignacion) {
      return res.status(404).json({
        success: false,
        message: 'Asignación no encontrada'
      });
    }

    await asignacion.update({
      nombre_asignacion: nombre_asignacion || asignacion.nombre_asignacion,
      tipo_asignacion: tipo_asignacion || asignacion.tipo_asignacion,
      ponderacion: ponderacion || asignacion.ponderacion,
      fecha_entrega: fecha_entrega || asignacion.fecha_entrega,
      descripcion: descripcion !== undefined ? descripcion : asignacion.descripcion,
      estado: estado !== undefined ? estado : asignacion.estado
    });

    res.json({
      success: true,
      message: 'Asignación actualizada exitosamente',
      data: asignacion
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar asignación',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const asignacion = await Asignacion.findByPk(id);

    if (!asignacion) {
      return res.status(404).json({
        success: false,
        message: 'Asignación no encontrada'
      });
    }

    await asignacion.destroy();

    res.json({
      success: true,
      message: 'Asignación eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar asignación',
      error: error.message
    });
  }
};