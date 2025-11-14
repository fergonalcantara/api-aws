const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Inscripcion = sequelize.define('Inscripcion', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estudiante_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seccion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_inscripcion: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tipo_inscripcion: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Normal, 2:Extraordinaria'
  },
  nota_final: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: true,
    validate: {
      min: 0,
      max: 100
    }
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Inscrito, 2:Retirado, 3:Aprobado, 4:Reprobado'
  }
}, {
  tableName: 'inscripciones',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

module.exports = Inscripcion;