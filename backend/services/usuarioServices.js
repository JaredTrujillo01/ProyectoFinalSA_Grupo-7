const { createUsuario, findUsuarioByEmail } = require('../repositories/usuarioRepository');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/token');

const registerUsuario = async (data) => {
  const existing = await findUsuarioByEmail(data.email);
  if (existing) throw new Error('Usuario ya existe');

  data.password = await hashPassword(data.password);
  const usuario = await createUsuario(data);
  return usuario;
};

const loginUsuario = async (email, password) => {
  const usuario = await findUsuarioByEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');

  const valid = await comparePassword(password, usuario.password);
  if (!valid) throw new Error('Contraseña incorrecta');

  return generateToken({ id: usuario.usuario_id, rol: usuario.rol });
};

module.exports = { registerUsuario, loginUsuario };
