const API_URL = "http://localhost:4000/api/auth";

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en login");
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.usuario));
  return data.usuario;
};

export const register = async (formData) => {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error en registro");
  return data.usuario;
};

export const getUsuarios = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:3000/api/usuarios", {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo usuarios");
  return data;
};
