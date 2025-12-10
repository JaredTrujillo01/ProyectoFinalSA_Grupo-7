const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Carro = sequelize.define('Carro', {
  carro_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  placa: { type: DataTypes.STRING(20), allowNull: false, unique: true },
  marca: { type: DataTypes.STRING(50), allowNull: false },
  modelo: { type: DataTypes.STRING(50), allowNull: false },
  anio: { type: DataTypes.INTEGER, allowNull: true },
  estado: { type: DataTypes.ENUM('disponible','alquilado','mantenimiento'), defaultValue: 'disponible' },
  categoria_id: { type: DataTypes.INTEGER, allowNull: true },
  
}, {
  tableName: 'Carros',
  timestamps: false
});

module.exports = Carro;
