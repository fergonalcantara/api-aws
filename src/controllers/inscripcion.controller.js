const { Inscripcion, Estudiante, Seccion, Curso } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const inscripciones = await Inscripcion.findAll({
      include: [
        {
          model: Estudiante,
          as: 'estudiante',
          attributes: ['id', 'nombres', 'apellidos', 'codigo_estudiante']
        },
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
      data: inscripciones
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener inscripciones',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const inscripcion = await Inscripcion.findByPk(id, {
      include: [
        {
          model: Estudiante,
          as: 'estudiante'
        },
        {
          model: Seccion,
          as: 'seccion',
          include: [
            {
              model: Curso,
              as: 'curso'
            }
          ]
        }
      ]
    });

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    res.json({
      success: true,
      data: inscripcion
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener inscripción',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      estudiante_id,
      seccion_id,
      fecha_inscripcion,
      tipo_inscripcion
    } = req.body;

    if (!estudiante_id || !seccion_id || !fecha_inscripcion) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    // Verificar cupo disponible
    const seccion = await Seccion.findByPk(seccion_id);
    
    if (!seccion) {
      return res.status(404).json({
        success: false,
        message: 'Sección no encontrada'
      });
    }

    if (seccion.cupo_actual >= seccion.cupo_maximo) {
      return res.status(400).json({
        success: false,
        message: 'No hay cupos disponibles en esta sección'
      });
    }

    const nuevaInscripcion = await Inscripcion.create({
      estudiante_id,
      seccion_id,
      fecha_inscripcion,
      tipo_inscripcion: tipo_inscripcion || 1,
      estado: 1
    });

    // Actualizar cupo actual de la sección
    await seccion.update({ cupo_actual: seccion.cupo_actual + 1 });

    res.status(201).json({
      success: true,
      message: 'Inscripción creada exitosamente',
      data: nuevaInscripcion
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear inscripción',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota_final, estado } = req.body;

    const inscripcion = await Inscripcion.findByPk(id);

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    await inscripcion.update({
      nota_final: nota_final !== undefined ? nota_final : inscripcion.nota_final,
      estado: estado !== undefined ? estado : inscripcion.estado
    });

    res.json({
      success: true,
      message: 'Inscripción actualizada exitosamente',
      data: inscripcion
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar inscripción',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const inscripcion = await Inscripcion.findByPk(id);

    if (!inscripcion) {
      return res.status(404).json({
        success: false,
        message: 'Inscripción no encontrada'
      });
    }

    // Reducir cupo actual de la sección
    const seccion = await Seccion.findByPk(inscripcion.seccion_id);
    if (seccion && seccion.cupo_actual > 0) {
      await seccion.update({ cupo_actual: seccion.cupo_actual - 1 });
    }

    await inscripcion.destroy();

    res.json({
      success: true,
      message: 'Inscripción eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar inscripción',
      error: error.message
    });
  }
};