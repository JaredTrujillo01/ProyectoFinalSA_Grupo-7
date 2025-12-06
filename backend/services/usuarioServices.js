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
  
  // Manejar tanto modelo Sequelize como objeto plano
  const usuarioObj = usuario.get ? usuario.get({ plain: true }) : usuario;
  
  const payload = {
    id: usuarioObj.usuario_id || usuarioObj.id,
    nombre: usuarioObj.nombre,
    rol: usuarioObj.rol || 'cliente', // ← VALOR POR DEFECTO
    email: usuarioObj.email
  };
  
  const token = generateToken(payload);
  
  return {
    message: 'Login exitoso',
    token,
    usuario: payload
  };
};

module.exports = { registerUsuario, loginUsuario };
