import { createContext, useState, useEffect } from "react";
import { getCarros, createCarro, updateCarro, deleteCarro } from "../api/Carros";

export const CarrosContext = createContext();

export const CarrosProvider = ({ children }) => {
  const [carros, setCarros] = useState([]);

  useEffect(() => {
    const loadInitialCarros = async () => {
      try {
        const data = await getCarros();
        setCarros(data);
      } catch (error) {
        console.error("Error cargando carros iniciales:", error);
      }
    };
    loadInitialCarros();
  }, []);

  const loadCarros = async (filter = {}) => {
    try {
      const data = await getCarros(filter);
      setCarros(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error cargando carros:", error);
      setCarros([]); // Fallback: array vacío en lugar de error
    }
  };

  const addCarro = async (carroData) => {
    try {
      const newCarro = await createCarro(carroData);
      setCarros((prev) => [...prev, newCarro]);
      return newCarro;
    } catch (error) {
      console.error("Error creando carro:", error);
      throw error;
    }
  };

  const editCarro = async (id, changes) => {
    try {
      const updatedCarro = await updateCarro(id, changes);
      setCarros((prev) => prev.map(c => c.carro_id === id ? updatedCarro : c));
      return updatedCarro;
    } catch (error) {
      console.error("Error actualizando carro:", error);
      throw error;
    }
  };

  const removeCarro = async (id) => {
    try {
      await deleteCarro(id);
      setCarros((prev) => prev.filter(c => c.carro_id !== id));
    } catch (error) {
      console.error("Error eliminando carro:", error);
      throw error;
    }
  };

  return (
    <CarrosContext.Provider value={{ carros, loadCarros, addCarro, editCarro, removeCarro }}>
      {children}
    </CarrosContext.Provider>
  );
};