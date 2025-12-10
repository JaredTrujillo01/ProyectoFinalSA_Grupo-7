// context/ClientesContext.js
import { createContext, useState, useEffect } from "react";
import { getClientes, updateCliente, deleteCliente } from "../api/cliente";

export const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    loadClientes();
  }, []);

  const loadClientes = async () => {
    try {
      const data = await getClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes:", error);
    }
  };

  const editCliente = async (id, changes) => {
    try {
      const updated = await updateCliente(id, changes);
      setClientes(clientes.map(c => c.id === id ? updated : c));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const removeCliente = async (id) => {
    try {
      await deleteCliente(id);
      setClientes(clientes.filter(c => c.id !== id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <ClientesContext.Provider value={{ clientes, loadClientes, editCliente, removeCliente }}>
      {children}
    </ClientesContext.Provider>
  );
};