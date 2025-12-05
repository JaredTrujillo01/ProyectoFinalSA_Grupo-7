const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Devolucion = sequelize.define('Devolucion', {
  devolucion_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  alquiler_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha_devolucion: { type: DataTypes.DATEONLY },
  sucursal_id: { type: DataTypes.INTEGER },
  empleado_id: { type: DataTypes.INTEGER },
  estado_carro: { type: DataTypes.ENUM('limpio','dañado','revisado'), allowNull: false }
}, {
  tableName: 'Devolucion',
  timestamps: false
});

module.exports = Devolucion;
