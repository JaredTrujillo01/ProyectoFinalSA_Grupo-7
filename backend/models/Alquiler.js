const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Alquiler = sequelize.define('Alquiler', {
  alquiler_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  cliente_id: { type: DataTypes.INTEGER, allowNull: false },
  carro_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha_inicio: { type: DataTypes.DATEONLY, allowNull: false },
  fecha_fin: { type: DataTypes.DATEONLY, allowNull: false },
  estado: {
    type: DataTypes.ENUM('reservado', 'activo', 'finalizado', 'cancelado'),
    defaultValue: 'reservado'
  },
  costo_total: { type: DataTypes.DECIMAL(10,2), allowNull: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE }
}, {
  tableName: 'alquiler',
  timestamps: false
});

module.exports = Alquiler;
