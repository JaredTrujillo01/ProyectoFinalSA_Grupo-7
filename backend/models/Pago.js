const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pago = sequelize.define('Pago', {
  pago_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  monto: { type: DataTypes.DECIMAL(10,2), allowNull: false },
  metodo_pago: { type: DataTypes.ENUM('efectivo','tarjeta','transferencia','pendiente'), allowNull: false },
  estado: { type: DataTypes.ENUM('pendiente','completado','cancelado'), allowNull: false },
  alquiler_id: { type: DataTypes.INTEGER }
}, {
  tableName: 'Pago',
  timestamps: false
});

module.exports = Pago;
