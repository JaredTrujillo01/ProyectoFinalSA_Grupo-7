const API_URL = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado. Inicia sesión.");
  return { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  };
};

export const getCategorias = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/categorias`, {
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo categorías");
  return data;
};

export const createCategoria = async (categoriaData) => {
  const res = await fetch(`${API_URL}/categorias`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(categoriaData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando categoría");
  return data;
};

export const updateCategoria = async (id, categoriaData) => {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(categoriaData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando categoría");
  return data;
};

export const deleteCategoria = async (id) => {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error eliminando categoría");
  }
  return { message: "Categoría eliminada" };
};
