const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Categoria = sequelize.define('Categoria', {
  categoria_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(50), allowNull: false },
  costo_por_dia: { type: DataTypes.DECIMAL(10,2), allowNull: false }
}, {
  tableName: 'Categoria',
  timestamps: false
});

module.exports = Categoria;