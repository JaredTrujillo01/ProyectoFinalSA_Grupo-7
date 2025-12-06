const Usuario = require('../models/usuario');

const createUsuario = async (data, options = {}) => await Usuario.create(data, options);
const findUsuarioByEmail = async (email) => {
  return await Usuario.findOne({
    where: { email },
    attributes: ['usuario_id', 'nombre', 'email', 'password', 'rol', 'fecha_registro']
  });
};

module.exports = { createUsuario, findUsuarioByEmail };
