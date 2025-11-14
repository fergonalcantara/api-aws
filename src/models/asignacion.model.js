const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Asignacion = sequelize.define('Asignacion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  seccion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  nombre_asignacion: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  tipo_asignacion: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '1:Tarea, 2:Examen, 3:Proyecto, 4:Quiz'
  },
  ponderacion: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    },
    comment: 'Porcentaje'
  },
  fecha_entrega: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Activa, 2:Cerrada, 3:Cancelada'
  }
}, {
  tableName: 'asignaciones',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

module.exports = Asignacion;