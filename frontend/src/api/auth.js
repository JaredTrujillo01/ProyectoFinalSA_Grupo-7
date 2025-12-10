const API_URL = "http://localhost:4000/api/auth";

// LOGIN
export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en login");

  // El backend responde { token: { message, token, usuario } }
  const payload = data.token || {};
  const token = payload.token; // JWT real
  const usuario = payload.usuario || data.usuario;

  if (!token) throw new Error("Token no recibido desde el backend");
  if (!usuario) throw new Error("No se recibió información del usuario");

  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(usuario));

  console.log('Login exitoso, usuario:', usuario);
  
  return usuario;
};

// REGISTRO (unificado: cliente, empleado, admin)
export const register = async (formData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en registro");

  return data;
};

// LISTAR USUARIOS – SOLO PARA ADMIN
export const getUsuarios = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:4000/api/usuarios", {
    headers: { "Authorization": `Bearer ${token}` }
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo usuarios");

  return data;
};
