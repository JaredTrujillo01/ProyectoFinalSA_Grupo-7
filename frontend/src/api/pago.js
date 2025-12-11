const API_URL = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado. Inicia sesión.");
  return { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  };
};

export const createPago = async (pagoData) => {
  const res = await fetch(`${API_URL}/pagos`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(pagoData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando pago");
  return data;
};

export const getPagos = async () => {
  const res = await fetch(`${API_URL}/pagos`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo pagos");
  return data;
};

export const getPagoById = async (id) => {
  const res = await fetch(`${API_URL}/pagos/${id}`, {
    headers: getAuthHeaders()
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error obteniendo pago");
  return data;
};

export const updatePago = async (id, pagoData) => {
  const res = await fetch(`${API_URL}/pagos/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(pagoData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando pago");
  return data;
};
