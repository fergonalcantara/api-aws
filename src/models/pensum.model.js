const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Pensum = sequelize.define('Pensum', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  carrera_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  semestre: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  tipo_curso: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '1:Obligatorio, 2:Electivo, 3:Opcional'
  },
  orden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Activo, 2:Inactivo'
  }
}, {
  tableName: 'pensum',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

module.exports = Pensum;