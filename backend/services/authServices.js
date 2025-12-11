const { createUsuario, findUsuarioByEmail } = require('../repositories/usuarioRepository');
const { createCliente } = require('../repositories/clienteRepository');
const { createEmpleado } = require('../repositories/empleadoRepository');
const { hashPassword, comparePassword } = require('../utils/password'); // comparePassword para login
const { generateToken } = require('../utils/token');
const { sequelize } = require('../config/db');

// Registro de usuarios
const registerUsuario = async (data) => {
  // Validaciones según rol
  if (!data.nombre || !data.email || !data.password) {
    throw new Error('Faltan campos obligatorios');
  }

  if (data.rol === 'cliente' && (!data.licencia || !data.telefono)) {
    throw new Error('Clientes necesitan licencia y teléfono');
  }

  if (data.rol === 'empleado' && !data.cargo) {
    throw new Error('Empleado necesita cargo');
  }

  const existing = await findUsuarioByEmail(data.email);
  if (existing) throw new Error('Usuario ya existe');

  const passwordHashed = await hashPassword(data.password);

  return await sequelize.transaction(async (t) => {
    const usuario = await createUsuario(
      { nombre: data.nombre, email: data.email, password: passwordHashed, rol: data.rol },
      { transaction: t }
    );

    if (data.rol === 'cliente') {
      await createCliente(
        { nombre: data.nombre, email: data.email, licencia: data.licencia, telefono: data.telefono, usuario_id: usuario.usuario_id },
        { transaction: t }
      );
    } else if (data.rol === 'empleado') {
      await createEmpleado(
        { nombre: data.nombre, cargo: data.cargo, sucursal_id: data.sucursal_id || null, usuario_id: usuario.usuario_id},
        { transaction: t }
      );
    }

    return usuario;
  });
};

// Login de usuarios
const loginUsuario = async (email, password) => {
  const usuario = await findUsuarioByEmail(email);
  if (!usuario) throw new Error('Usuario no encontrado');

  const valid = await comparePassword(password, usuario.password);
  if (!valid) throw new Error('Contraseña incorrecta');

  // Manejar tanto modelo Sequelize como objeto plano
  const usuarioObj = usuario.get ? usuario.get({ plain: true }) : usuario;

  // Asegurar que siempre tiene un rol válido
  const rol = usuarioObj.rol || 'cliente';
  
  console.log('Usuario encontrado:', { id: usuarioObj.usuario_id, email: usuarioObj.email, rol });

  // Obtener cliente_id si el rol es cliente
  let cliente_id = null;
  if (rol === 'cliente') {
    const { findClienteByUsuarioId } = require('../repositories/clienteRepository');
    const cliente = await findClienteByUsuarioId(usuarioObj.usuario_id);
    if (cliente) {
      cliente_id = cliente.cliente_id;
    }
  }

  // Devuelve token JWT con cliente_id
  const payload = { 
    id: usuarioObj.usuario_id, 
    nombre: usuarioObj.nombre, 
    rol, 
    email: usuarioObj.email,
    cliente_id: cliente_id
  };
  const token = generateToken(payload);

  return { message: 'Login exitoso', token, usuario: payload };
};

module.exports = { registerUsuario, loginUsuario }; // <--- exporta loginUsuario
