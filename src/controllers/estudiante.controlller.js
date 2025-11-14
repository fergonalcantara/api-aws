const { Estudiante, Usuario, Carrera } = require('../models');

// Obtener todos los estudiantes
exports.getAll = async (req, res) => {
  try {
    const estudiantes = await Estudiante.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre_usuario', 'email']
        },
        {
          model: Carrera,
          as: 'carrera',
          attributes: ['id', 'nombre_carrera', 'codigo_carrera']
        }
      ]
    });

    res.json({
      success: true,
      data: estudiantes
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estudiantes',
      error: error.message
    });
  }
};

// Obtener un estudiante por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre_usuario', 'email']
        },
        {
          model: Carrera,
          as: 'carrera'
        }
      ]
    });

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    res.json({
      success: true,
      data: estudiante
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener estudiante',
      error: error.message
    });
  }
};

// Crear nuevo estudiante
exports.create = async (req, res) => {
  try {
    const {
      usuario_id,
      carrera_id,
      codigo_estudiante,
      nombres,
      apellidos,
      fecha_nacimiento,
      direccion,
      telefono,
      semestre_actual
    } = req.body;

    // Validar campos requeridos
    if (!usuario_id || !carrera_id || !codigo_estudiante || !nombres || !apellidos || !fecha_nacimiento) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevoEstudiante = await Estudiante.create({
      usuario_id,
      carrera_id,
      codigo_estudiante,
      nombres,
      apellidos,
      fecha_nacimiento,
      direccion,
      telefono,
      semestre_actual: semestre_actual || 1,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Estudiante creado exitosamente',
      data: nuevoEstudiante
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear estudiante',
      error: error.message
    });
  }
};

// Actualizar estudiante
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      carrera_id,
      nombres,
      apellidos,
      fecha_nacimiento,
      direccion,
      telefono,
      semestre_actual,
      estado
    } = req.body;

    const estudiante = await Estudiante.findByPk(id);

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    await estudiante.update({
      carrera_id: carrera_id || estudiante.carrera_id,
      nombres: nombres || estudiante.nombres,
      apellidos: apellidos || estudiante.apellidos,
      fecha_nacimiento: fecha_nacimiento || estudiante.fecha_nacimiento,
      direccion: direccion !== undefined ? direccion : estudiante.direccion,
      telefono: telefono !== undefined ? telefono : estudiante.telefono,
      semestre_actual: semestre_actual || estudiante.semestre_actual,
      estado: estado !== undefined ? estado : estudiante.estado
    });

    res.json({
      success: true,
      message: 'Estudiante actualizado exitosamente',
      data: estudiante
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar estudiante',
      error: error.message
    });
  }
};

// Eliminar estudiante (soft delete)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const estudiante = await Estudiante.findByPk(id);

    if (!estudiante) {
      return res.status(404).json({
        success: false,
        message: 'Estudiante no encontrado'
      });
    }

    await estudiante.destroy(); // Soft delete gracias a paranoid: true

    res.json({
      success: true,
      message: 'Estudiante eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar estudiante',
      error: error.message
    });
  }
};