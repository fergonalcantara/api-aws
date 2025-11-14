const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const PagoColegiatura = sequelize.define('PagoColegiatura', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estudiante_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ciclo_academico: {
    type: DataTypes.STRING(20),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  monto: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0
    }
  },
  fecha_vencimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fecha_pago: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  metodo_pago: {
    type: DataTypes.TINYINT,
    allowNull: true,
    comment: '1:Efectivo, 2:Tarjeta, 3:Transferencia, 4:Cheque'
  },
  numero_recibo: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  estado: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    comment: '1:Pendiente, 2:Pagado, 3:Vencido, 4:Parcial'
  }
}, {
  tableName: 'pagos_colegiatura',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  paranoid: true
});

module.exports = PagoColegiatura;