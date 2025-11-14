const { Pensum, Carrera, Curso } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const pensum = await Pensum.findAll({
      include: [
        {
          model: Carrera,
          as: 'carrera',
          attributes: ['id', 'nombre_carrera', 'codigo_carrera']
        },
        {
          model: Curso,
          as: 'curso',
          attributes: ['id', 'nombre_curso', 'codigo_curso', 'creditos']
        }
      ],
      order: [['semestre', 'ASC'], ['orden', 'ASC']]
    });

    res.json({
      success: true,
      data: pensum
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pensum',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const pensum = await Pensum.findByPk(id, {
      include: [
        {
          model: Carrera,
          as: 'carrera'
        },
        {
          model: Curso,
          as: 'curso'
        }
      ]
    });

    if (!pensum) {
      return res.status(404).json({
        success: false,
        message: 'Pensum no encontrado'
      });
    }

    res.json({
      success: true,
      data: pensum
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener pensum',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const {
      carrera_id,
      curso_id,
      semestre,
      tipo_curso,
      orden
    } = req.body;

    if (!carrera_id || !curso_id || !semestre || !tipo_curso || !orden) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    const nuevoPensum = await Pensum.create({
      carrera_id,
      curso_id,
      semestre,
      tipo_curso,
      orden,
      estado: 1
    });

    res.status(201).json({
      success: true,
      message: 'Pensum creado exitosamente',
      data: nuevoPensum
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear pensum',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { semestre, tipo_curso, orden, estado } = req.body;

    const pensum = await Pensum.findByPk(id);

    if (!pensum) {
      return res.status(404).json({
        success: false,
        message: 'Pensum no encontrado'
      });
    }

    await pensum.update({
      semestre: semestre || pensum.semestre,
      tipo_curso: tipo_curso || pensum.tipo_curso,
      orden: orden || pensum.orden,
      estado: estado !== undefined ? estado : pensum.estado
    });

    res.json({
      success: true,
      message: 'Pensum actualizado exitosamente',
      data: pensum
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar pensum',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const pensum = await Pensum.findByPk(id);

    if (!pensum) {
      return res.status(404).json({
        success: false,
        message: 'Pensum no encontrado'
      });
    }

    await pensum.destroy();

    res.json({
      success: true,
      message: 'Pensum eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar pensum',
      error: error.message
    });
  }
};