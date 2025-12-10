const API_URL = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado. Inicia sesión.");
  return { "Authorization": `Bearer ${token}` };
};

export const getSucursales = async () => {
  const res = await fetch(`${API_URL}/sucursales`, { headers: getAuthHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo sucursales");
  return data;
};

export const createSucursal = async (sucursalData) => {
  const res = await fetch(`${API_URL}/sucursales`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(sucursalData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando sucursal");
  return data;
};

export const updateSucursal = async (id, sucursalData) => {
  const res = await fetch(`${API_URL}/sucursales/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(sucursalData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando sucursal");
  return data;
};

export const deleteSucursal = async (id) => {
  const res = await fetch(`${API_URL}/sucursales/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error eliminando sucursal");
  }
  return { message: "Sucursal eliminada" };
};