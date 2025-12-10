const API_URL = "http://localhost:4000/api";  // Ajusta a tu backend
export const getCategorias = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/categorias`, {
    headers: token ? { "Authorization": `Bearer ${token}` } : {}
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo categorías");
  return data;  // Retorna lista de categorías
};
