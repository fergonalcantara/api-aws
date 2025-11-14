const { Curso, Carrera } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const cursos = await Curso.findAll({
      include: [
        {
          model: Carrera,
          as: 'carrera',
          attributes: ['id', 'nombre_carrera', 'codigo_carrera']
        }
      ]
    });

    res.json({
      success: true,
      data: cursos
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener cursos',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const curso = await Curso.findByPk(id, {
      include: [
        {
          model: Carrera,
          as: 'carrera'
        }
      ]
    });

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    res.json({
      success: true,
      data: curso
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener curso',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      carrera_id,
      codigo_curso,
      nombre_curso,
      creditos,
      semestre_sugerido,
      descripcion
    } = req.body;

    if (!carrera_id || !codigo_curso || !nombre_curso || !creditos || !semestre_sugerido) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevoCurso = await Curso.create({
      carrera_id,
      codigo_curso,
      nombre_curso,
      creditos,
      semestre_sugerido,
      descripcion,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Curso creado exitosamente',
      data: nuevoCurso
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear curso',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carrera_id,
      codigo_curso,
      nombre_curso,
      creditos,
      semestre_sugerido,
      descripcion,
      estado
    } = req.body;

    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    await curso.update({
      carrera_id: carrera_id || curso.carrera_id,
      codigo_curso: codigo_curso || curso.codigo_curso,
      nombre_curso: nombre_curso || curso.nombre_curso,
      creditos: creditos || curso.creditos,
      semestre_sugerido: semestre_sugerido || curso.semestre_sugerido,
      descripcion: descripcion !== undefined ? descripcion : curso.descripcion,
      estado: estado !== undefined ? estado : curso.estado
    });

    res.json({
      success: true,
      message: 'Curso actualizado exitosamente',
      data: curso
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar curso',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const curso = await Curso.findByPk(id);

    if (!curso) {
      return res.status(404).json({
        success: false,
        message: 'Curso no encontrado'
      });
    }

    await curso.destroy();

    res.json({
      success: true,
      message: 'Curso eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar curso',
      error: error.message
    });
  }
};