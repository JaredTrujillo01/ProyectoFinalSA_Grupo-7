const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Entrega = sequelize.define('Entrega', {
  entrega_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  alquiler_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha_entrega: { type: DataTypes.DATEONLY },
  sucursal_id: { type: DataTypes.INTEGER },
  empleado_id: { type: DataTypes.INTEGER },
  estado_vehiculo: { type: DataTypes.ENUM('limpio','dañado','revisado'), allowNull: false }
}, {
  tableName: 'Entrega',
  timestamps: false
});

module.exports = Entrega;
