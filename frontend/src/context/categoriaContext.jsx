// context/CategoriasContext.js
import { createContext, useState, useEffect } from "react";
import { getCategorias, createCategoria, updateCategoria, deleteCategoria } from "../api/categoria";

export const CategoriasContext = createContext();

export const CategoriasProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  // Carga inicial de categorías al montar
  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error cargando categorías:", error);
    }
  };

  const addCategoria = async (categoriaData) => {
    try {
      const newCat = await createCategoria(categoriaData);
      setCategorias((prev) => [...prev, newCat]);
      return newCat;
    } catch (error) {
      console.error("Error creando categoría:", error);
      throw error;
    }
  };

  const editCategoria = async (id, changes) => {
    try {
      const updated = await updateCategoria(id, changes);
      setCategorias((prev) => prev.map(c => c.categoria_id === id ? updated : c));
      return updated;
    } catch (error) {
      console.error("Error actualizando categoría:", error);
      throw error;
    }
  };

  const removeCategoria = async (id) => {
    try {
      await deleteCategoria(id);
      setCategorias((prev) => prev.filter(c => c.categoria_id !== id));
    } catch (error) {
      console.error("Error eliminando categoría:", error);
      throw error;
    }
  };

  return (
    <CategoriasContext.Provider value={{ categorias, loadCategorias, addCategoria, editCategoria, removeCategoria }}>
      {children}
    </CategoriasContext.Provider>
  );
};