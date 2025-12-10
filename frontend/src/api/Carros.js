// api/carrosApi.js
const API_URL = "http://localhost:4000/api";  // Ajusta a tu backend

export const getCarros = async (filter = {}) => {
  const token = localStorage.getItem("token");
  const query = new URLSearchParams(filter).toString();
  const res = await fetch(`${API_URL}/carros?${query}`, {
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo carros");
  return data;
};

export const createCarro = async (carroData) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/carros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(carroData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando carro");
  return data;
};

export const updateCarro = async (id, changes) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/carros/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(changes)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando carro");
  return data;
};

export const deleteCarro = async (id) => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/carros/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error eliminando carro");
  }
  return { message: "Carro eliminado" };
};