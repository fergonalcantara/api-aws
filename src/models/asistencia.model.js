const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Asistencia = sequelize.define('Asistencia', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  inscripcion_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_asistencia: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  tipo_asistencia: {
    type: DataTypes.TINYINT,
    allowNull: false,
    comment: '1:Presente, 2:Ausente, 3:Tardanza, 4:Justificado'
  },
  observaciones: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Activo, 2:Modificado'
  }
}, {
  tableName: 'asistencias',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

module.exports = Asistencia;