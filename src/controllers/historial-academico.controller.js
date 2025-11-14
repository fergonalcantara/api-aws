const { HistorialAcademico, Estudiante, Carrera } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const historiales = await HistorialAcademico.findAll({
      include: [
        {
          model: Estudiante,
          as: 'estudiante',
          attributes: ['id', 'nombres', 'apellidos', 'codigo_estudiante'],
          include: [
            {
              model: Carrera,
              as: 'carrera',
              attributes: ['id', 'nombre_carrera']
            }
          ]
        }
      ]
    });

    res.json({
      success: true,
      data: historiales
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener historiales académicos',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const historial = await HistorialAcademico.findByPk(id, {
      include: [
        {
          model: Estudiante,
          as: 'estudiante'
        }
      ]
    });

    if (!historial) {
      return res.status(404).json({
        success: false,
        message: 'Historial académico no encontrado'
      });
    }

    res.json({
      success: true,
      data: historial
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener historial académico',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      estudiante_id,
      ciclo_academico,
      cursos_inscritos,
      cursos_aprobados,
      cursos_reprobados,
      promedio_ciclo,
      promedio_acumulado,
      creditos_acumulados
    } = req.body;

    if (!estudiante_id || !ciclo_academico) {
      return res.status(400).json({
        success: false,
        message: 'Estudiante y ciclo académico son requeridos'
      });
    }

    const nuevoHistorial = await HistorialAcademico.create({
      estudiante_id,
      ciclo_academico,
      cursos_inscritos: cursos_inscritos || 0,
      cursos_aprobados: cursos_aprobados || 0,
      cursos_reprobados: cursos_reprobados || 0,
      promedio_ciclo,
      promedio_acumulado,
      creditos_acumulados: creditos_acumulados || 0,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Historial académico creado exitosamente',
      data: nuevoHistorial
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear historial académico',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      cursos_inscritos,
      cursos_aprobados,
      cursos_reprobados,
      promedio_ciclo,
      promedio_acumulado,
      creditos_acumulados,
      estado
    } = req.body;

    const historial = await HistorialAcademico.findByPk(id);

    if (!historial) {
      return res.status(404).json({
        success: false,
        message: 'Historial académico no encontrado'
      });
    }

    await historial.update({
      cursos_inscritos: cursos_inscritos !== undefined ? cursos_inscritos : historial.cursos_inscritos,
      cursos_aprobados: cursos_aprobados !== undefined ? cursos_aprobados : historial.cursos_aprobados,
      cursos_reprobados: cursos_reprobados !== undefined ? cursos_reprobados : historial.cursos_reprobados,
      promedio_ciclo: promedio_ciclo !== undefined ? promedio_ciclo : historial.promedio_ciclo,
      promedio_acumulado: promedio_acumulado !== undefined ? promedio_acumulado : historial.promedio_acumulado,
      creditos_acumulados: creditos_acumulados !== undefined ? creditos_acumulados : historial.creditos_acumulados,
      estado: estado !== undefined ? estado : historial.estado
    });

    res.json({
      success: true,
      message: 'Historial académico actualizado exitosamente',
      data: historial
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar historial académico',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const historial = await HistorialAcademico.findByPk(id);

    if (!historial) {
      return res.status(404).json({
        success: false,
        message: 'Historial académico no encontrado'
      });
    }

    await historial.destroy();

    res.json({
      success: true,
      message: 'Historial académico eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar historial académico',
      error: error.message
    });
  }
};