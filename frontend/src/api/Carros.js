const API_URL = "http://localhost:4000/api"; // Ajusta según tu backend

// Función genérica para manejar peticiones con token
const fetchWithToken = async (url, options = {}) => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No hay token, por favor inicia sesión");

  // Aseguramos los headers y el token
  options.headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers
  };

  console.log("Token enviado:", token);
  console.log("URL:", url, "Options:", options);

  const res = await fetch(url, options);
  const data = await res.json();

  console.log("Respuesta backend:", res.status, data);

  if (!res.ok) throw new Error(data.error || "Error en la petición");
  return data;
};

// Obtener carros (opcional con filtros)
export const getCarros = async (filter = {}) => {
  const query = new URLSearchParams(filter).toString();
  const url = `${API_URL}/carros${query ? `?${query}` : ""}`;
  return await fetchWithToken(url, { method: "GET" });
};

// Crear carro
export const createCarro = async (carroData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No hay token, por favor inicia sesión");

  const res = await fetch(`${API_URL}/carros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Token válido del login
    },
    body: JSON.stringify(carroData)
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Error creando carro");
  return data;
};

// Actualizar carro
export const updateCarro = async (id, changes) => {
  return await fetchWithToken(`${API_URL}/carros/${id}`, {
    method: "PUT",
    body: JSON.stringify(changes)
  });
};

// Eliminar carro
export const deleteCarro = async (id) => {
  return await fetchWithToken(`${API_URL}/carros/${id}`, {
    method: "DELETE"
  });
};
