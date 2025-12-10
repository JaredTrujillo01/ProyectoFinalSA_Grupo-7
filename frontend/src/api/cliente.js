const API_URL = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado. Inicia sesión.");
  return { "Authorization": `Bearer ${token}` };
};

export const getClientes = async () => {
  const res = await fetch(`${API_URL}/clientes`, { headers: getAuthHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo clientes");
  return data;
};

export const updateCliente = async (id, clienteData) => {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(clienteData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando cliente");
  return data;
};

export const deleteCliente = async (id) => {
  const res = await fetch(`${API_URL}/clientes/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error eliminando cliente");
  }
  return { message: "Cliente eliminado" };
};