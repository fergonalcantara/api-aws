const { Seccion, Curso, Profesor } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const secciones = await Seccion.findAll({
      include: [
        {
          model: Curso,
          as: 'curso',
          attributes: ['id', 'nombre_curso', 'codigo_curso']
        },
        {
          model: Profesor,
          as: 'profesor',
          attributes: ['id', 'nombres', 'apellidos']
        }
      ]
    });

    res.json({
      success: true,
      data: secciones
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener secciones',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const seccion = await Seccion.findByPk(id, {
      include: [
        {
          model: Curso,
          as: 'curso'
        },
        {
          model: Profesor,
          as: 'profesor'
        }
      ]
    });

    if (!seccion) {
      return res.status(404).json({
        success: false,
        message: 'Sección no encontrada'
      });
    }

    res.json({
      success: true,
      data: seccion
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener sección',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      curso_id,
      profesor_id,
      codigo_seccion,
      ciclo_academico,
      cupo_maximo,
      horario,
      aula
    } = req.body;

    if (!curso_id || !profesor_id || !codigo_seccion || !ciclo_academico || !cupo_maximo) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevaSeccion = await Seccion.create({
      curso_id,
      profesor_id,
      codigo_seccion,
      ciclo_academico,
      cupo_maximo,
      cupo_actual: 0,
      horario,
      aula,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Sección creada exitosamente',
      data: nuevaSeccion
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear sección',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      profesor_id,
      codigo_seccion,
      ciclo_academico,
      cupo_maximo,
      cupo_actual,
      horario,
      aula,
      estado
    } = req.body;

    const seccion = await Seccion.findByPk(id);

    if (!seccion) {
      return res.status(404).json({
        success: false,
        message: 'Sección no encontrada'
      });
    }

    await seccion.update({
      profesor_id: profesor_id || seccion.profesor_id,
      codigo_seccion: codigo_seccion || seccion.codigo_seccion,
      ciclo_academico: ciclo_academico || seccion.ciclo_academico,
      cupo_maximo: cupo_maximo || seccion.cupo_maximo,
      cupo_actual: cupo_actual !== undefined ? cupo_actual : seccion.cupo_actual,
      horario: horario !== undefined ? horario : seccion.horario,
      aula: aula !== undefined ? aula : seccion.aula,
      estado: estado !== undefined ? estado : seccion.estado
    });

    res.json({
      success: true,
      message: 'Sección actualizada exitosamente',
      data: seccion
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar sección',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const seccion = await Seccion.findByPk(id);

    if (!seccion) {
      return res.status(404).json({
        success: false,
        message: 'Sección no encontrada'
      });
    }

    await seccion.destroy();

    res.json({
      success: true,
      message: 'Sección eliminada exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar sección',
      error: error.message
    });
  }
};