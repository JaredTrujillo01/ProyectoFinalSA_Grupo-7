const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Cliente = sequelize.define('Cliente', {
  cliente_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  licencia: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(100), allowNull: false },
  telefono: { type: DataTypes.STRING(30), allowNull: false },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false }
}, {
  tableName: 'Clientes',
  timestamps: false
});

module.exports = Cliente;
