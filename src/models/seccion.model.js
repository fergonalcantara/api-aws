const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Seccion = sequelize.define('Seccion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  curso_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  profesor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  codigo_seccion: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  ciclo_academico: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    },
    comment: 'Ej: 2025-1'
  },
  cupo_maximo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1
    }
  },
  cupo_actual: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  horario: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  aula: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Abierta, 2:Cerrada, 3:En_Progreso, 4:Finalizada'
  }
}, {
  tableName: 'secciones',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

module.exports = Seccion;