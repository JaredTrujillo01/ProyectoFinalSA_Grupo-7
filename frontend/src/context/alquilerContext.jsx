import { createContext, useState } from "react";
import { createAlquiler, getAlquileres, getAlquilerById, updateAlquiler } from "../api/alquiler";

export const AlquilerContext = createContext();

export const AlquilerProvider = ({ children }) => {
  const [alquileres, setAlquileres] = useState([]);
  const [currentAlquiler, setCurrentAlquiler] = useState(null);

  const addAlquiler = async (alquilerData) => {
    try {
      const newAlquiler = await createAlquiler(alquilerData);
      setCurrentAlquiler(newAlquiler);
      return newAlquiler;
    } catch (error) {
      console.error("Error creando alquiler:", error);
      throw error;
    }
  };

  const loadAlquileres = async () => {
    try {
      const data = await getAlquileres();
      setAlquileres(data);
    } catch (error) {
      console.error("Error cargando alquileres:", error);
    }
  };

  const getAlquiler = async (id) => {
    try {
      const data = await getAlquilerById(id);
      return data;
    } catch (error) {
      console.error("Error obteniendo alquiler:", error);
      throw error;
    }
  };

  const editAlquiler = async (id, changes) => {
    try {
      const updated = await updateAlquiler(id, changes);
      setCurrentAlquiler(updated);
      return updated;
    } catch (error) {
      console.error("Error actualizando alquiler:", error);
      throw error;
    }
  };

  return (
    <AlquilerContext.Provider value={{ alquileres, currentAlquiler, addAlquiler, loadAlquileres, getAlquiler, editAlquiler }}>
      {children}
    </AlquilerContext.Provider>
  );
};
