const { Rol, Permiso, RolPermiso } = require('../models');

exports.getAll = async (req, res) => {
  try {
    const roles = await Rol.findAll({
      include: [
        {
          model: Permiso,
          as: 'permisos',
          through: { attributes: [] }
        }
      ]
    });

    res.json({
      success: true,
      data: roles
    });

  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener roles',
      error: error.message
    });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id, {
      include: [
        {
          model: Permiso,
          as: 'permisos',
          through: { attributes: [] }
        }
      ]
    });

    if (!rol) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    res.json({
      success: true,
      data: rol
    });

  } catch (error) {
    console.error('Error en getById:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener rol',
      error: error.message
    });
  }
};

exports.create = async (req, res) => {
  try {
    const { nombre_rol, descripcion, permisos } = req.body;

    if (!nombre_rol) {
      return res.status(400).json({
        success: false,
        message: 'El nombre del rol es requerido'
      });
    }

    const nuevoRol = await Rol.create({
      nombre_rol,
      descripcion,
      estado: 1
    });

    // Asignar permisos si se proporcionan
    if (permisos && Array.isArray(permisos)) {
      const permisoRecords = permisos.map(permiso_id => ({
        rol_id: nuevoRol.id,
        permiso_id,
        estado: 1
      }));
      await RolPermiso.bulkCreate(permisoRecords);
    }

    res.status(201).json({
      success: true,
      message: 'Rol creado exitosamente',
      data: nuevoRol
    });

  } catch (error) {
    console.error('Error en create:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear rol',
      error: error.message
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_rol, descripcion, estado } = req.body;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    await rol.update({
      nombre_rol: nombre_rol || rol.nombre_rol,
      descripcion: descripcion !== undefined ? descripcion : rol.descripcion,
      estado: estado !== undefined ? estado : rol.estado
    });

    res.json({
      success: true,
      message: 'Rol actualizado exitosamente',
      data: rol
    });

  } catch (error) {
    console.error('Error en update:', error);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar rol',
      error: error.message
    });
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    await rol.destroy();

    res.json({
      success: true,
      message: 'Rol eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error en delete:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar rol',
      error: error.message
    });
  }
};

// Asignar permisos a un rol
exports.asignarPermisos = async (req, res) => {
  try {
    const { id } = req.params;
    const { permisos } = req.body;

    if (!permisos || !Array.isArray(permisos)) {
      return res.status(400).json({
        success: false,
        message: 'Se requiere un array de permisos'
      });
    }

    const rol = await Rol.findByPk(id);

    if (!rol) {
      return res.status(404).json({
        success: false,
        message: 'Rol no encontrado'
      });
    }

    // Eliminar permisos anteriores
    await RolPermiso.destroy({ where: { rol_id: id } });

    // Crear nuevas relaciones
    const permisoRecords = permisos.map(permiso_id => ({
      rol_id: id,
      permiso_id,
      estado: 1
    }));
    await RolPermiso.bulkCreate(permisoRecords);

    res.json({
      success: true,
      message: 'Permisos asignados exitosamente'
    });

  } catch (error) {
    console.error('Error en asignarPermisos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al asignar permisos',
      error: error.message
    });
  }
};