const API_URL = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado. Inicia sesión.");
  return { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  };
};

export const createAlquiler = async (alquilerData) => {
  const res = await fetch(`${API_URL}/alquileres`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(alquilerData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando alquiler");
  return data;
};

export const getAlquileres = async () => {
  const res = await fetch(`${API_URL}/alquileres`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo alquileres");
  return data;
};

export const getAlquilerById = async (id) => {
  const res = await fetch(`${API_URL}/alquileres/${id}`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo alquiler");
  return data;
};

export const updateAlquiler = async (id, alquilerData) => {
  const res = await fetch(`${API_URL}/alquileres/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(alquilerData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando alquiler");
  return data;
};
