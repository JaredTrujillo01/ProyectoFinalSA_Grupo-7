// context/CategoriasContext.js
import { createContext, useState, useEffect } from "react";
import { getCategorias } from "../api/categoria";

export const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);  // Lista de categorías

  // Carga inicial de categorías al montar
  useEffect(() => {
    const loadCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    loadCategorias();
  }, []);

  return (
    <CategoriasContext.Provider value={{ categorias }}>
      {children}
    </CategoriasContext.Provider>
  );
};