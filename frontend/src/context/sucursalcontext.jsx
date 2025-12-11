import { createContext, useState, useEffect } from "react";
import { getSucursales, createSucursal, updateSucursal, deleteSucursal } from "../api/sucursale";

export const SucursalesContext = createContext();

export const SucursalesProvider = ({ children }) => {
  const [sucursales, setSucursales] = useState([]);

  useEffect(() => {
    loadSucursales();
  }, []);

  const loadSucursales = async () => {
    try {
      const data = await getSucursales();
      setSucursales(data);
    } catch (error) {
      console.error("Error cargando sucursales:", error);
    }
  };

  const addSucursal = async (sucursalData) => {
    try {
      const newSuc = await createSucursal(sucursalData);
      setSucursales((prev) => [...prev, newSuc]);
      return newSuc;
    } catch (error) {
      throw error;
    }
  };

  const editSucursal = async (id, changes) => {
    try {
      const updated = await updateSucursal(id, changes);
      setSucursales(sucursales.map(s => s.sucuersal_id === id ? updated : s));
      return updated;
    } catch (error) {
      throw error;
    }
  };

  const removeSucursal = async (id) => {
    try {
      await deleteSucursal(id);
      setSucursales(sucursales.filter(s => s.sucuersal_id !== id));
    } catch (error) {
      throw error;
    }
  };

  return (
    <SucursalesContext.Provider value={{ sucursales, loadSucursales, addSucursal, editSucursal, removeSucursal }}>
      {children}
    </SucursalesContext.Provider>
  );
};