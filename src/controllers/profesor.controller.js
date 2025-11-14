const { Profesor, Usuario } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const profesores = await Profesor.findAll({
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre_usuario', 'email']
        }
      ]
    });

    res.json({
      success: true,
      data: profesores
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener profesores',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const profesor = await Profesor.findByPk(id, {
      include: [
        {
          model: Usuario,
          as: 'usuario',
          attributes: ['id', 'nombre_usuario', 'email']
        }
      ]
    });

    if (!profesor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    res.json({
      success: true,
      data: profesor
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener profesor',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      usuario_id,
      codigo_profesor,
      nombres,
      apellidos,
      especialidad,
      telefono,
      email_institucional
    } = req.body;

    if (!usuario_id || !codigo_profesor || !nombres || !apellidos) {
      return res.status(400).json({
        success: false,
        message: 'Faltan campos requeridos'
      });
    }

    const nuevoProfesor = await Profesor.create({
      usuario_id,
      codigo_profesor,
      nombres,
      apellidos,
      especialidad,
      telefono,
      email_institucional,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Profesor creado exitosamente',
      data: nuevoProfesor
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear profesor',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nombres,
      apellidos,
      especialidad,
      telefono,
      email_institucional,
      estado
    } = req.body;

    const profesor = await Profesor.findByPk(id);

    if (!profesor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    await profesor.update({
      nombres: nombres || profesor.nombres,
      apellidos: apellidos || profesor.apellidos,
      especialidad: especialidad !== undefined ? especialidad : profesor.especialidad,
      telefono: telefono !== undefined ? telefono : profesor.telefono,
      email_institucional: email_institucional !== undefined ? email_institucional : profesor.email_institucional,
      estado: estado !== undefined ? estado : profesor.estado
    });

    res.json({
      success: true,
      message: 'Profesor actualizado exitosamente',
      data: profesor
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar profesor',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const profesor = await Profesor.findByPk(id);

    if (!profesor) {
      return res.status(404).json({
        success: false,
        message: 'Profesor no encontrado'
      });
    }

    await profesor.destroy();

    res.json({
      success: true,
      message: 'Profesor eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar profesor',
      error: error.message
    });
  }
};