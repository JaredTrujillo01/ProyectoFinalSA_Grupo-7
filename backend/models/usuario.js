const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  usuario_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  email: { type: DataTypes.STRING(120), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(255), allowNull: false },
  rol: { type: DataTypes.ENUM('admin','empleado','cliente'), defaultValue: 'cliente', allowNull: false },
  fecha_registro: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;
