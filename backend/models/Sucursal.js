const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Sucursal = sequelize.define('Sucursal', {
  sucuersal_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  direccion: { type: DataTypes.STRING(200), allowNull: true }
}, {
  tableName: 'Sucursal',
  timestamps: false
});

module.exports = Sucursal;
