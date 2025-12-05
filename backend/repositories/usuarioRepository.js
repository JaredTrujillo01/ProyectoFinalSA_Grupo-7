const Usuario = require('../models/usuario');

const createUsuario = async (data, options = {}) => await Usuario.create(data, options);
const findUsuarioByEmail = async (email) => await Usuario.findOne({ where: { email } });

module.exports = { createUsuario, findUsuarioByEmail };
