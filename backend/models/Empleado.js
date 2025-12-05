const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Empleado = sequelize.define('Empleado', {
  empleado_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  cargo: { type: DataTypes.ENUM('administrativo','gerente','vendedor'), allowNull: false },
  sucursal_id: { type: DataTypes.INTEGER },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'Empleado',
  timestamps: false
});

module.exports = Empleado;
