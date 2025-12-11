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

// Asociaciones
Alquiler.associate = (models) => {
  Alquiler.belongsTo(models.Cliente, { foreignKey: 'cliente_id' });
  Alquiler.belongsTo(models.Carro, { foreignKey: 'carro_id' });
  Alquiler.hasMany(models.Pago, { foreignKey: 'alquiler_id' });
};

module.exports = Alquiler;
