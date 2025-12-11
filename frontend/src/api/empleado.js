const API_URL = "http://localhost:4000/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Token no encontrado. Inicia sesión.");
  return { 
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  };
};

export const getEmpleados = async () => {
  console.log('Haciendo petición a:', `${API_URL}/empleados`);
  const res = await fetch(`${API_URL}/empleados`, {
    headers: getAuthHeaders()
  });
  console.log('Respuesta del servidor:', res.status, res.statusText);
  const data = await res.json();
  console.log('Datos parseados:', data);
  if (!res.ok) throw new Error(data.error || "Error obteniendo empleados");
  return data;
};

export const createEmpleado = async (empleadoData) => {
  const res = await fetch(`${API_URL}/empleados`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(empleadoData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando empleado");
  return data;
};

export const updateEmpleado = async (id, empleadoData) => {
  const res = await fetch(`${API_URL}/empleados/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(empleadoData)
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error actualizando empleado");
  return data;
};

export const deleteEmpleado = async (id) => {
  const res = await fetch(`${API_URL}/empleados/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders()
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error eliminando empleado");
  }
  return { message: "Empleado eliminado" };
};
